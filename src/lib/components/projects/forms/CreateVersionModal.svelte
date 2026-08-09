<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import type {Snippet} from "svelte";
    import type {BaseFile, RawFile} from "$lib/types/projects/FileData";
    import {api} from "$lib/utils/api";
    import {closeModal} from "$lib/utils/Utils";
    import Icon from "@iconify/svelte";
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";
    import semver from "semver";

    const modalID = "create-version-modal"

    let uploading: boolean = $state(false);
    let changelog: string = $state("");

    const { project, children, createVersion}: {
        project: ProjectBase,
        children?: Snippet,
        createVersion: (raw: RawFile, formData: FormData) => Promise<BaseFile | undefined>
    } = $props();

    async function handleCreateVersion(e: SubmitEvent) {
        e.preventDefault();
        const element = e.target as HTMLFormElement;
        const formData = new FormData(element);
        console.log(`Create new version for ${project.id}`)

        uploading = true;

        //create the version entry
        const raw: RawFile = {
            name: formData.get("name") as string,
            version: formData.get("version") as string,
        }
        console.log("Submitting version information...")
        const versionFile = await createVersion(raw, formData)
        if (!versionFile) {
            uploading = false;
            console.log("Failed to create version")
            return
        }

        //upload the actual file
        console.log("Uploading version file...")
        const file = formData.get("file") as File
        const filePath = `downloads/${project.id}/${versionFile.id}/`
        api.cdn.uploadFile(file, filePath).then(result => {
            if (result) {
                console.log(`Uploaded file for ${versionFile.version} of ${project.id} successfully!`)
                //update the version file
                console.log("Publishing version file location to API...")
                api.projects.updateFileLink(project.id, versionFile.id, result)
            } else {
                console.log(`Failed to upload file for ${versionFile.version} of ${project.id}`)
            }
        })

        console.log("Publishing version changelog to API...")
        //update the changelog for the project
        if (changelog.length >= 10) {
            const cleanVersion = semver.clean(raw.version) ?? raw.version
            api.projects.getGroup(project.group)?.updateChangelog(project.id, cleanVersion, changelog)
        }

        console.log("New version created!")
        uploading = false;
        element.reset();
        changelog = "";
        closeModal(modalID);
    }
</script>

<dialog id={modalID} class="modal">
    <div class="modal-box max-h-[92vh] w-11/12 max-w-5xl overflow-y-auto">
        <div class="mb-5 flex items-start justify-between gap-4">
        <div>
            <h2 class="text-2xl font-bold">Upload new version</h2>
            <p class="mt-1 text-sm text-base-content/60">
                Create a new downloadable version of {project.name}.
            </p>
        </div>

        <button class="btn btn-circle btn-ghost" type="button" onclick={() => closeModal(modalID)}>
            <Icon icon="mdi:close" width="1.4em" height="1.4em" />
        </button>
    </div>

        <form class="flex flex-col gap-5" onsubmit={handleCreateVersion}>
            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:file-document-plus-outline" width="1.2em" height="1.2em" />
                    Version Details
                </h3>

                <div class="grid gap-4 md:grid-cols-2">
                    <fieldset class="fieldset validator">
                        <label class="floating-label validator" for={`${modalID}-name`}>
                            <span>Name</span>
                            <input id={`${modalID}-name`} class="input validator w-full" type="text" name="name"
                                   placeholder="Name" required disabled={uploading} min="3" max="32"
                            />
                        </label>
                        <p class="validator-hint hidden">Name is required</p>
                    </fieldset>

                    <fieldset class="fieldset">
                        <label class="floating-label validator" for={`${modalID}-version`}>
                            <span>Version</span>
                            <input id={`${modalID}-version`} class="input validator w-full" type="text" name="version"
                                   placeholder="Version" required disabled={uploading}
                                   pattern="(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z\-][0-9a-zA-Z\-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z\-][0-9a-zA-Z\-]*))*))?(\+([0-9a-zA-Z\-]+(\.[0-9a-zA-Z\-]+)*))?"
                            />
                        </label>
                        <p class="validator-hint hidden">Version is required<br />The version must be a semantic version</p>
                    </fieldset>
                </div>
            </section>

            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:file-upload-outline" width="1.2em" height="1.2em" />
                    Version File
                </h3>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Upload File</legend>
                    <input class="file-input file-input-bordered validator w-full" type="file" name="file" required disabled={uploading}/>
                    <p class="validator-hint hidden">A file is required</p>
                </fieldset>
            </section>

            {@render children?.()}

            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <div class="mb-4">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:text-box-edit-outline" width="1.2em" height="1.2em" />
                        Changelog
                    </h3>
                    <p class="mt-1 text-sm text-base-content/60">
                        Add release notes for this version using Markdown.
                    </p>
                </div>

                <MarkdownEditorContainer bind:value={changelog} fileUploadPath={`cache/${project.id}/changelog/`}/>
            </section>

            <div class="modal-action">
                <button class="btn btn-primary" type="submit" disabled={uploading}>
                    {#if uploading}
                        <span class="loading loading-spinner loading-sm"></span>
                        Creating...
                    {:else}
                        <Icon icon="mdi:upload" width="1.2em" height="1.2em" />
                        Create
                    {/if}
                </button>

                <button
                        class="btn btn-error"
                        type="reset"
                        onclick={() => closeModal(modalID)}
                        disabled={uploading}
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
</dialog>
