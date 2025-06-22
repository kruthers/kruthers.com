<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import Icon from "@iconify/svelte";
    import {copyWithAlert} from "$lib/utils/CopyUtils";

    export var file: BaseFile

    async function copyToClipboard() {
        const link = `https://kruthers.com/downloads/${file.project}/files/${file.id}`
        await copyWithAlert(link)
    }
</script>

<td>
    <a role="button" class="btn btn-circle btn-info" href={file.link} ><Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /></a>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-circle btn-ghost"><Icon icon="mdi:dots-vertical" width="1.2em" height="1.2em" /></div>
        <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a href={file.link}><Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /> Download</a></li>
            <li>
                <a href="/downloads/{file.project}/files/{file.id}">
                    <Icon icon="mdi:credit-card-settings-outline" width="1.2em" height="1.2em" /> View Version
                </a>
            </li>
            <li>
                <button on:click={copyToClipboard} class="">
                    <Icon icon="mdi:content-copy" width="1.2em" height="1.2em" /> Copy to clipboard
                </button>
            </li>
        </ul>
    </div>
</td>
