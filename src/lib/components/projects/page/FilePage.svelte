<script lang="ts">
    import type {BaseFile, MinecraftFile} from "$lib/types/projects/FileData";
    import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
    import semver from "semver";
    import {sendToast} from "$lib/store/Toasts";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import MinecraftFileMetaData from "$lib/components/projects/minecraft/MinecraftFileMetaData.svelte";
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import Icon from "@iconify/svelte";
    import {api, userToken} from "$lib/utils/api";
    import {copyWithAlert} from "$lib/utils/CopyUtils";
    import {goto} from "$app/navigation";
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";
    import {closeModal, openModal} from "$lib/utils/Utils";
    import {resolve} from "$app/paths";
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";
    import CommonMcFeilds from "$lib/components/projects/minecraft/forms/CommonMcFeilds.svelte";
    import type {MinecraftPlatform} from "$lib/types/projects/MinecraftData";


    let { file, project }: { file: BaseFile, project: ProjectBase } = $props();

    let cleanVersion: string = $derived(semver.clean(file.version) ?? file.version)
    let changelog: string = $state(project.changeLog[cleanVersion] ?? "")
    let processing: boolean = $state(false)

    if (changelog == "") {
        sendToast({
            message: `Unable to find changelog for version: ${cleanVersion}`,
            type: "warning"
        })
    }

    function updateChangelog() {
        processing = true
        const group = api.projects.getGroup(project.group.toLowerCase())
        sendToast({
            message: `Updating changelog for version: ${cleanVersion}`
        })
        group?.updateChangelog(file.project, cleanVersion, changelog)
        closeModal("edit-changelog")
        processing = false
    }

    function resetChangelog() {
        changelog = project.changeLog[cleanVersion] ?? ""
        closeModal("edit-changelog")
    }

    function deleteVersion() {
        sendToast({
            message: `Deleting file: ${file.id}`
        })
        api.projects.deleteFie(file.id)
        goto(resolve("/downloads/[slug]", {slug: project.id}))
    }

    async function saveFile(rawVersion: BaseFile, group: string, formData: FormData): Promise<boolean> {
        switch (project.group) {
            case "MINECRAFT": {
                const versions = formData.getAll("versions") as string[]
                const platforms = formData.getAll("platforms") as MinecraftPlatform[]
                const mcFile: MinecraftFile = {
                    ...rawVersion,
                    gameVersions: versions,
                    platforms: platforms
                }

                const result = await api.projects.minecraft.editFile(project.id, mcFile)
                return result != undefined
            }
            default: return false //only minecraft is supported right now
        }
    }

    async function editFile(e: SubmitEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        processing = true

        const rawVersion: BaseFile = {
            ...file,
            name: formData.get("name") as string
        }
        const success = await saveFile(rawVersion, project.group, formData)
        if (success) {
            processing = false
            closeModal("edit-file")
        }
    }

</script>

<div class="w-full bg-base-300 rounded-box shadow-md p-4">
    <div class="mb-2">
        <a href={resolve("/downloads/[slug]/files", {slug: project.id})} class="btn btn-ghost btn-sm">
            ← Back
        </a>
    </div>
    <div class="flex justify-between items-start md:items-center">
        <div>
            <h1 class="text-4xl font-bold mb-2">{file.name}</h1>
            <VersionIcon version={file.version} /> {file.version}
        </div>
        <div class="flex items-center gap-2 mt-2 md:mt-0">
            <button class="btn btn-primary text-base px-6 py-2">
                <Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /> Download
            </button>

            {#if ($userToken)}
            <div class="dropdown dropdown-end">
                <button tabindex="0" class="btn btn-circle btn-ghost">
                    <Icon icon="mdi:dots-vertical" width="1.2em" height="1.2em" />
                </button>
                <ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                    <li><button onclick={() => openModal("edit-changelog")}>Edit Changelog</button></li>
                    <li><button onclick={() => openModal("edit-file")}>Edit File Info</button></li>
                    <li><button class="text-error" onclick={() => openModal("delete-file")}>Delete</button></li>
                </ul>
            </div>
            {/if}
        </div>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {#if changelog == ""}
        <div class="md:col-span-2 alert alert-warning alert-soft block justify-center">
            <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                <Icon icon="mdi:envelope-open-outline" height="4em" class="opacity-50" />
                <div>
                    <h2 class="text-xl font-semibold">No Changelog</h2>
                    <p class="text-sm opacity-70">This version does not have an attached changelog</p>
                </div>
            </div>
        </div>
    {:else}
        <div class="md:col-span-2 bg-base-300 p-4 rounded-box">
            <h1 class="text-2xl font-semibold mb-2">Changelog</h1>
            <MarkdownContainer content={changelog ?? "*Changelog not available*"} />
        </div>

    {/if}

    <div class="bg-base-300 p-4 rounded-box">
        <h1 class="text-2xl font-semibold mb-2">File Info</h1>
        <ul class="text-sm space-y-3">
            {#if (project.group === "MINECRAFT")}
                <MinecraftFileMetaData file={file}/>
            {/if}
            <li>
                <span class="flex items-center"><Icon icon="mdi:clock" width="1.2em" height="1.2em" /> <strong>Published:</strong></span>
                <FormattedDate date={file.published} />
            </li>
            <li>
                <span class="flex items-center"><Icon icon="mdi:file" width="1.2em" height="1.2em" /> <strong>File ID:</strong></span>
                <button onclick={() => copyWithAlert(file.id)} class="badge badge-sm rounded-full bg-base-100 cursor-pointer">
                    <Icon icon="mdi:content-copy" width="1.2em" height="1.2em" /> {file.id}
                </button>
            </li>
        </ul>
    </div>
</div>

<!--Edit Menus-->
{#if $userToken}
    <dialog class="modal" id="edit-changelog">
        <div class="modal-box max-w-2xl m-2">
            <div class="mb-5 flex items-start justify-between gap-4">
                <h2 class="text-2xl font-bold">Update Changelog</h2>
                <button class="btn btn-circle btn-ghost" type="button" onclick={resetChangelog}>
                    <Icon icon="mdi:close" width="1.4em" height="1.4em" />
                </button>
            </div>

            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <div class="mb-4">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:text-box-edit-outline" width="1.2em" height="1.2em" />
                        Changelog
                    </h3>
                    <p class="mt-1 text-sm text-base-content/60">
                        Edit release notes for this version using Markdown.
                    </p>
                </div>

                <MarkdownEditorContainer bind:value={changelog} fileUploadPath={`cache/${project.id}/changelog/`}/>
            </section>

            <div class="modal-action">
                <button class="btn btn-primary" type="button" onclick={updateChangelog} disabled={processing}>
                    <Icon icon="mdi:content-save-edit" width="1.2em" height="1.2em" />
                    Save
                </button>

                <button class="btn btn-error" type="reset" onclick={resetChangelog}>
                    Cancel
                </button>
            </div>
        </div>
    </dialog>
    <dialog id="edit-file" class="modal">
        <div class="modal-box max-h-[92vh] w-11/12 max-w-5xl overflow-y-auto">
            <div class="mb-5 flex items-start justify-between gap-4">
                <h2 class="text-2xl font-bold">Edit version</h2>

                <button class="btn btn-circle btn-ghost" type="button" onclick={() => closeModal("edit-file")}>
                    <Icon icon="mdi:close" width="1.4em" height="1.4em" />
                </button>
            </div>

            <form class="flex flex-col gap-5" onsubmit={editFile}>
                <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:file-document-plus-outline" width="1.2em" height="1.2em" />
                        Version Details
                    </h3>

                    <div class="grid gap-4 md:grid-cols-2">
                        <fieldset class="fieldset validator">
                            <label class="floating-label validator" for="edit-file-name">
                                <span>Name</span>
                                <input id="edit-file-name" class="input validator w-full" type="text" name="name"
                                       placeholder="Name" required disabled={processing} min="3" max="32"
                                />
                            </label>
                            <p class="validator-hint hidden">Name is required</p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <label class="floating-label" for="edit-file-version">
                                <span>Version</span>
                                <input id="edit-file-version" class="input w-full" type="text" value={file.version} disabled={true}/>
                            </label>
                        </fieldset>
                    </div>
                </section>

                {#if (project.group === "MINECRAFT")}
                    <CommonMcFeilds file={file as MinecraftFile} project={project as MinecraftProject} />
                {/if}

                <div class="modal-action">
                    <button class="btn btn-primary" type="submit" disabled={processing}>
                        <Icon icon="mdi:content-save-edit" width="1.2em" height="1.2em" />
                        Save
                    </button>

                    <button class="btn btn-error" type="reset" onclick={() => closeModal("edit-file")} disabled={processing}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </dialog>
    <dialog class="modal" id="delete-file">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Delete Version?</h3>
            <p class="py-4">This will delete this file from the project!</p>
            <div class="modal-action">
                <button class="btn btn-success" onclick={() => closeModal("delete-file")}>Keep</button>
                <button class="btn btn-warning" onclick={deleteVersion}>Delete</button>
            </div>
        </div>
    </dialog>
{/if}