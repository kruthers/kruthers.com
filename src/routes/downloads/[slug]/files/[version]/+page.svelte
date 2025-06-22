<script lang="ts">
    import type { PageProps } from './$types';
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import Icon from "@iconify/svelte";
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import Markdown from "$lib/components/Markdown.svelte";
    import MinecraftFileMetaData from "$lib/components/projects/minecraft/MinecraftFileMetaData.svelte";
    import semver from 'semver';
    import {sendToast} from "$lib/store/Toasts";
    import {getOrdinal} from "$lib/utils/Utils";
    import {copyWithAlert} from "$lib/utils/CopyUtils";
    const { data } : PageProps  = $props();

    let file: BaseFile | undefined = $state()
    let project: ProjectBase | undefined = $state()
    let changeLog: string | undefined = $state()

    onMount(async () => {
        const proj = await data.project
        const fileData = await data.file
        if (fileData == undefined) {
            error(404, `File with ${data.fileID} not found`)
        }

        project = proj
        file = fileData

        //get the changelog
        const v = semver.clean(file.version)
        changeLog = project?.changelog?.get(v)
        if (!changeLog) {
            sendToast({
                message: "Unable to find changelog for file version",
                type: "warning"
            })
        }
    })

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        const day = getOrdinal(date.getDate())
        const month = date.toLocaleString(undefined, { month: 'long' })
        const year = date.getFullYear()
        const time = date.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).toLowerCase()

        return `${month} ${day}, ${year} at ${time}`
    }

    function copyID() {
        if (file) {
            copyWithAlert(file.id)
        }
    }
</script>

{#if (project && file)}
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

                <div class="dropdown dropdown-end">
                    <button tabindex="0" class="btn btn-circle btn-ghost">
                        <Icon icon="mdi:dots-vertical" width="1.2em" height="1.2em" />
                    </button>
                    <ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li><a>Edit</a></li>
                        <li><a class="text-error">Delete</a></li>
                    </ul>
                </div>
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
                    {formatDate(file.published)}</li>
                <li>
                    <span class="flex items-center"><Icon icon="mdi:file" width="1.2em" height="1.2em" /> <strong>File ID:</strong></span>
                    <button onclick={() => copyID()} class="badge badge-sm rounded-full bg-base-100 cursor-pointer">
                        <Icon icon="mdi:content-copy" width="1.2em" height="1.2em" /> {file.id}
                    </button>
                </li>
            </ul>
        </div>
    </div>
{:else}
    <span class="loading loading-bars loading-xl"></span>
    <!-- TODO: skeleton-->
{/if}

