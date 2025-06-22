<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {goto} from "$app/navigation";
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import {formatFileDate} from "$lib/utils/ProjectUtils";
    import FileOptions from "$lib/components/projects/page/subpart/FileOptions.svelte";

    export var file: BaseFile

    function openFile() {
        goto(`/downloads/${file.project}/files/${file.id}`)
    }
</script>

<tr class="hover:bg-base-200">
    <th><VersionIcon version={file.version} /></th>
    <td on:click={openFile} class="hover:underline cursor-pointer">
        <div class="flex items-center gap-3">
            <div>
                <div class="font-bold">{file.name}</div>
                <div class="text-sm opacity-50">{file.version}</div>
            </div>
        </div>
    </td>
    <slot />
    <td>{formatFileDate(file.published)}</td>
    <FileOptions file={file} />
</tr>
