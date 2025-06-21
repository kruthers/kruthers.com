<script lang="ts">
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import type {BaseFile} from "$lib/types/projects/FileData";

    export var files: BaseFile[]
</script>

<table class="table">
    <!-- head -->
    <thead>
    <tr>
        <th></th>  <!-- The column there there if its a release/ pre release -->
        <th>Name</th>
        <th>Published</th>
        <th></th> <!-- Where the download button is -->
    </tr>
    </thead>
    <tbody>
    {#each files as file}
        {#if (file.link != null)}
            <tr>
                <td><VersionIcon version={file.version} /></td>
                <td>
                    <div class="flex items-center gap-3">
                        <div>
                            <div class="font-bold">{file.name}</div>
                            <div class="text-sm opacity-50">{file.version}</div>
                        </div>
                    </div>
                </td>
                <td>{file.published}</td>
                <td>
                    TODO
                </td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>