<script lang="ts">
    import VersionIcon from "$lib/components/projects/page/subpart/VersionIcon.svelte";
    import type {BaseFile, MinecraftFile} from "$lib/types/projects/FileData";
    import FileLinkCopy from "$lib/components/projects/page/subpart/FileLinkCopy.svelte";
    import Icon from "@iconify/svelte";

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
        <tr>
            <th><VersionIcon version={file.version} /></th>
            <td>
                <div class="flex items-center gap-3">
                    <div>
                        <div class="font-bold">{file.name}</div>
                        <div class="text-sm opacity-50">{file.version}</div>
                    </div>
                </div>
            </td>
            <td>
                {#each file.gameVersions as v}
                    <span class="badge">{v}</span>
                {/each}
            </td>
            <td>
                {#each file.platforms as platform}
                    <span class="badge">{platform}</span>
<!--                Todo: Change platform to not be raw string-->
                {/each}
            </td>
            <td>{file.published}</td>
            <th>
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn m-1">Click</div>
                    <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a href={file.link}><Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /> Download</a></li>
                        <li><a href={file.id}><Icon icon="mdi:credit-card-settings-outline" width="1.2em" height="1.2em" /> View Version</a></li>
                        <li><FileLinkCopy file={file} /></li>
                    </ul>
                </div>
            </th>
        </tr>
    {/each}
    </tbody>
</table>