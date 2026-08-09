<script lang="ts">
    import type {Snippet} from "svelte";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import {closeModal, toTitleCase} from "$lib/utils/Utils";
    import CommonProjectFormInputs from "$lib/components/projects/forms/CommonProjectFormInputs.svelte";
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";
    import Icon from "@iconify/svelte";
    import {api} from "$lib/utils/api";

    type Props = {
        group: string,
        children?: Snippet,
        saveProject: (rawData: ProjectBase, formData: FormData) => Promise<boolean>,
        project: ProjectBase
    }

    let {group, children, saveProject, project}: Props = $props();

    const modalID = "edit-project-modal";

    let saving: boolean = $state(false);
    let description: string = $state(project.description);

    let iconPreview: string = $state(project.icon || "/projects/unknown.png");
    let bannerPreview: string = $state(project.banner || "/projects/unknown.png");

    let tags: string[] = $state([...project.tags]);
    let newTag: string = $state("");

    let links: {name: string, url: string}[] = $state(
        Object.entries(project.links ?? {}).map(([name, url]) => ({name, url}))
    );

    function updateImagePreview(event: Event, type: "icon" | "banner") {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        const preview = URL.createObjectURL(file);

        if (type === "icon") {
            iconPreview = preview;
        } else {
            bannerPreview = preview;
        }
    }

    function addTag() {
        const tag = newTag.trim();

        if (tag.length === 0 || tags.includes(tag)) {
            newTag = "";
            return;
        }

        tags = [...tags, tag];
        newTag = "";
    }

    function removeTag(tag: string) {
        tags = tags.filter(t => t !== tag);
    }

    function addLink() {
        links = [...links, {name: "", url: ""}];
    }

    function removeLink(index: number) {
        links = links.filter((_, i) => i !== index);
    }

    function updateLinkName(index: number, name: string) {
        links = links.map((link, i) => i === index ? {...link, name} : link);
    }

    function updateLinkUrl(index: number, url: string) {
        links = links.map((link, i) => i === index ? {...link, url} : link);
    }

    async function uploadImage(data: FormData, type: "icon" | "banner"): Promise<string | undefined> {
        const imageFile = data.get(type);
        if (imageFile instanceof File && imageFile.size > 0) {
            console.log(`Uploading new ${type}...`)
            const fileName = `project-${type}.${imageFile.name.split(".").pop()}`
            const uploadPath = `cache/${project.id}/`;
            const result = await api.cdn.uploadFile(imageFile, uploadPath, fileName);
            if (!result) return;
            console.log(`Uploaded ${type} to ${result}`)
            return result;
        }

        return;
    }

    async function handleSave(event: SubmitEvent) {
        event.preventDefault()
        console.log("Updating project...")
        saving = true

        const element = event.target as HTMLFormElement
        const data = new FormData(element)

        const creditData = data.get("credit") as string | null

        const linkData: Record<string, string> = {}
        for (const link of links) {
            const name = link.name.trim()
            const url = link.url.trim()

            if (name.length > 0 && url.length > 0) {
                linkData[name] = url
            }
        }

        //handle image uploads
        const iconUpload = await uploadImage(data, "icon")
        const bannerUpload = await uploadImage(data, "banner")
        console.log(bannerUpload, iconUpload)

        const rawProject: ProjectBase = {
            ...project,
            banner: bannerUpload ?? project.banner,
            icon: iconUpload ?? project.icon,
            created: data.get("creation_date") as string,
            credit: creditData == "" ? null : creditData,
            description: description,
            lastUpdate: new Date().toISOString(),
            links: linkData,
            name: data.get("name") as string,
            overview: data.get("overview") as string,
            tags: tags
        };

        console.log("Saving project")
        const success = await saveProject(rawProject, data)
        saving = false
        console.log("Project saved", success)

        if (success) {
            closeModal(modalID)
        }
    }
</script>

<dialog id={modalID} class="modal">
    <div class="modal-box flex max-h-[92vh] w-11/12 max-w-7xl flex-col overflow-hidden p-0">
        <div class="border-b border-base-300 bg-base-200/80 px-5 py-4 sm:px-6">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold">
                        Edit {toTitleCase(group)} Project
                    </h2>
                </div>

                <button class="btn btn-circle btn-ghost" type="button" onclick={() => closeModal(modalID)} aria-label="Close">
                    <Icon icon="mdi:close" width="1.4em" height="1.4em" />
                </button>
            </div>
        </div>

        <form class="min-h-0 flex-1 overflow-y-auto" onsubmit={handleSave}>
            <div class="flex flex-col gap-5 p-5 sm:p-6">
                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:form-textbox" width="1.2em" height="1.2em" />
                        Basic Details
                    </h3>

                    <div class="grid gap-4 md:grid-cols-2">
                        <CommonProjectFormInputs {modalID} {project} />
                    </div>
                </section>

                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:image-edit-outline" width="1.2em" height="1.2em" />
                        Project Images
                    </h3>

                    <div class="grid gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Icon</legend>

                            <label
                                    class="group relative block size-48 cursor-pointer overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition hover:border-primary hover:shadow-lg"
                                    for={`${modalID}-icon`}
                            >
                                <img
                                        src={iconPreview}
                                        alt={`${project.name} icon preview`}
                                        class="h-full w-full object-cover transition duration-300"
                                />

                                <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-base-300/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Icon icon="mdi:upload" width="1.8em" height="1.8em" />
                                    <span class="text-xs font-semibold">Upload Icon</span>
                                </div>
                            </label>

                            <input id={`${modalID}-icon`} class="hidden" type="file" name="icon" accept="image/*" onchange={(event) => updateImagePreview(event, "icon")} disabled={saving}/>

                            <p class="label text-xs text-base-content/60">
                                Click the image to upload a square icon.
                            </p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Banner</legend>

                            <label
                                    class="group relative block cursor-pointer overflow-hidden h-72 w-128 rounded-3xl border border-base-300 bg-base-100 shadow-sm transition hover:border-primary hover:shadow-lg"
                                    for={`${modalID}-banner`}
                            >
                                <img src={bannerPreview}
                                     alt={`${project.name} banner preview`}
                                     class="aspect-video w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-60"
                                />

                                <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-base-300/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Icon icon="mdi:upload" width="2em" height="2em" />
                                    <span class="text-sm font-semibold">Upload Banner</span>
                                </div>
                            </label>

                            <input id={`${modalID}-banner`} class="hidden" type="file" name="banner" accept="image/*" onchange={(event) => updateImagePreview(event, "banner")} disabled={saving}/>

                            <p class="label text-xs text-base-content/60">
                                Click the image to upload a banner. (16:9 aspect ratio recommended)
                            </p>
                        </fieldset>
                    </div>
                </section>

                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:tag-multiple-outline" width="1.2em" height="1.2em" />
                        Project Tags
                    </h3>

                    <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
                        <fieldset class="fieldset shrink-0">
                            <legend class="fieldset-legend">Add Tag</legend>
                            <div class="join w-full sm:w-64">
                                <input
                                    class="input join-item w-full" type="text" placeholder="Tag name" bind:value={newTag}
                                    disabled={saving}
                                    onkeydown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            addTag();
                                        }
                                    }}
                                />
                                <button class="btn btn-primary join-item" type="button" onclick={addTag} disabled={saving}>
                                    Add
                                </button>
                            </div>
                        </fieldset>

                        <div class="min-w-0 flex-1 lg:pb-2">
                            {#if tags.length > 0}
                                <div class="flex flex-wrap gap-2">
                                    {#each tags as tag (tag)}
                                    <span class="badge badge-secondary badge-soft gap-2">
                                        {toTitleCase(tag)}
                                        <button type="button" class="cursor-pointer" onclick={() => removeTag(tag)} disabled={saving}>
                                            <Icon icon="mdi:delete-outline" height="1em" />
                                        </button>
                                    </span>
                                    {/each}
                                </div>
                            {:else}
                                <p class="rounded-2xl border border-dashed border-base-300 bg-base-100/50 px-4 py-3 text-center text-sm text-base-content/60 lg:text-left">
                                    No tags added yet.
                                </p>
                            {/if}
                        </div>
                    </div>
                </section>

                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 class="flex items-center gap-2 text-lg font-bold">
                                <Icon icon="mdi:link-variant" width="1.2em" height="1.2em" />
                                Links
                            </h3>
                            <p class="mt-1 text-sm text-base-content/60">
                                Add related external links for the project.
                            </p>
                        </div>

                        <button class="btn btn-primary btn-sm" type="button" onclick={addLink} disabled={saving}>
                            <Icon icon="mdi:plus" width="1.2em" height="1.2em" />
                            Add Link
                        </button>
                    </div>

                    {#if links.length > 0}
                        <div class="flex flex-col gap-3">
                            {#each links as link, index (index)}
                                <div class="grid gap-3 rounded-2xl border border-base-300 bg-base-100/60 p-3 md:grid-cols-[12rem_minmax(0,1fr)_auto]">
                                    <label class="floating-label">
                                        <span>Name</span>
                                        <input class="input w-full validator" type="text" placeholder="Website" value={link.name} disabled={saving}
                                               oninput={(event) => updateLinkName(index, event.currentTarget.value)} required
                                        />
                                    </label>

                                    <label class="floating-label">
                                        <span>URL</span>
                                        <input class="input w-full validator" type="url" placeholder="https://example.com" disabled={saving} required
                                               value={link.url} oninput={(event) => updateLinkUrl(index, event.currentTarget.value)}
                                        />
                                    </label>

                                    <div class="flex items-end pb-1">
                                        <button class="btn btn-error btn-outline btn-square" type="button" onclick={() => removeLink(index)} disabled={saving}>
                                            <Icon icon="mdi:delete-outline" width="1.2em" height="1.2em" />
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <p class="rounded-2xl border border-dashed border-base-300 bg-base-100/50 p-6 text-center text-sm text-base-content/60">
                            No links added yet.
                        </p>
                    {/if}
                </section>

                {@render children?.()}

                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <div class="mb-4">
                        <h3 class="flex items-center gap-2 text-lg font-bold">
                            <Icon icon="mdi:text-box-edit-outline" width="1.2em" height="1.2em" />
                            Description
                        </h3>
                        <p class="mt-1 text-sm text-base-content/60">
                            Use Markdown to format the main project description.
                        </p>
                    </div>

                    <MarkdownEditorContainer bind:value={description} fileUploadPath={`cache/${project.id}`}/>
                </section>
            </div>

            <div class="sticky bottom-0 z-10 border-t border-base-300 bg-base-200/95 px-5 py-4 backdrop-blur sm:px-6">
                <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button class="btn btn-ghost" type="button" onclick={() => closeModal(modalID)} disabled={saving}>
                        Cancel
                    </button>

                    <button class="btn btn-primary" type="submit" disabled={saving}>
                        {#if saving}
                            <span class="loading loading-spinner loading-sm"></span>
                            Saving...
                        {:else}
                            <Icon icon="mdi:content-save-outline" width="1.2em" height="1.2em" />
                            Save Project
                        {/if}
                    </button>
                </div>
            </div>
        </form>
    </div>
</dialog>