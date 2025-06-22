<script lang="ts">
    import type {BaseFile, MinecraftFile} from "$lib/types/projects/FileData";
    import FileRow from "$lib/components/projects/page/subpart/FileRow.svelte";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";

    export var files: BaseFile[]
    const mcFiles = files.map(value => value as MinecraftFile)
</script>

<table class="table">
    <!-- head -->
    <thead>
        <tr>
            <th></th>  <!-- The column there there if its a release/ pre release -->
            <th>Name</th>
            <th>Game Version</th>
            <th>Platforms</th>
            <th>Published</th>
            <th></th> <!-- Where the download button is -->
        </tr>
    </thead>
    <tbody>
    {#each mcFiles as file}
        <FileRow file={file}>
            <td>
                <MinecraftVersions versions={file.gameVersions} />
            </td>
            <td>
                <MinecraftPlatforms platforms={file.platforms} />
            </td>
        </FileRow>
    {/each}
    </tbody>
</table>
