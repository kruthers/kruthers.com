<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import semver from "semver";
    import {sendToast} from "$lib/store/Toasts";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import MinecraftFileMetaData from "$lib/components/projects/minecraft/MinecraftFileMetaData.svelte";
    import Markdown from "$lib/components/Markdown.svelte";
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import Icon from "@iconify/svelte";
    import {api, userToken} from "$lib/utils/api";
    import {copyWithAlert} from "$lib/utils/CopyUtils";
    import EditMinecraftFile from "$lib/components/projects/minecraft/EditMinecraftFile.svelte";
    import {goto} from "$app/navigation";

    export var file: BaseFile
    export var project: ProjectBase

    let version = semver.clean(file.version)
    let changeLog: string | undefined = project.changeLog["1.2.0"]

    if (!changeLog) {
        sendToast({
            message: `Unable to find changelog for version: ${version}`,
            type: "warning"
        })
    }

    //edit system
    let visibleModal: string | undefined

    function deleteVersion() {
        sendToast({
            message: `Deleting file: ${file.id}`
        })
        api.projects.deleteFie(file.id)
        visibleModal = undefined
        goto(`/downloads/${file.project}`)
    }

    function updateChangelog(event: SubmitEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        const log = formData.get("changelog") as string
        const group = api.projects.getGroup(project.group.toLowerCase())
        visibleModal = undefined
        sendToast({
            message: `Updating changelog for version: ${version}`
        })
        group?.updateChangelog(file.project, version, log)
    }

    function editFile() {
        visibleModal = undefined
    }

    function closeModal() {
        visibleModal = undefined
        sendToast({
            message: "Edit abandoned"
        })
    }
</script>

<div class="w-full bg-base-300 rounded-box shadow-md p-4">
    <div class="mb-2">
        <a href="/downloads/{file.project}/files" class="btn btn-ghost btn-sm">
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
                    <li><button onclick={() => visibleModal = "changelog"}>Edit Changelog</button></li>
                    <li><button onclick={() => visibleModal = "data"}>Edit File Info</button></li>
                    <li><button class="text-error" onclick={() => visibleModal = "delete"}>Delete</button></li>
                </ul>
            </div>
            {/if}
        </div>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="md:col-span-2 bg-base-300 p-4 rounded-box">
        <h1 class="text-2xl font-semibold mb-2">Changelog</h1>
        <Markdown content={changeLog ? changeLog : "*Changelog not available*"} />
    </div>

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
{#if (visibleModal === "changelog")}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-2xl m-2">
            <form onsubmit={updateChangelog} class="space-y-4">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-lg">Edit {version} Changelog</legend>
                    <textarea id="changelog" name="changelog" class="textarea textarea-bordered w-full">{changeLog}</textarea>

                    <div class="modal-action">
                        <button type="button" class="btn btn-warning" onclick={closeModal}>Abandon</button>
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </dialog>
{:else if (visibleModal === "data")}
    <EditMinecraftFile abandon={closeModal} close={editFile} file={file} />
{:else if (visibleModal === "delete")}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Delete Version?</h3>
            <p class="py-4">This will delete this file from the project!</p>
            <div class="modal-action">
                <button class="btn btn-success" onclick={closeModal}>Keep</button>
                <button class="btn btn-warning" onclick={deleteVersion}>Delete</button>
            </div>
        </div>
    </dialog>
{/if}