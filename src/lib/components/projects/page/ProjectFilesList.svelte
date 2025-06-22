<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import FileRow from "$lib/components/projects/page/subpart/FileRow.svelte";

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
            <FileRow file={file}>
                <!--Nothing in this one-->
            </FileRow>
        {/if}
    {/each}
    </tbody>
</table>