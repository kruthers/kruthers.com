<script lang="ts">
    import type {BaseFile, MinecraftFile} from "$lib/types/projects/FileData";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";
    import Icon from "@iconify/svelte";

    export var file: BaseFile

    let mcFile = file as MinecraftFile
</script>

<li>
    <span class="flex items-center"><Icon icon="cil:fork" width="1.2em" height="1.2em" /><strong>Supported Versions (Java):</strong></span>
    <MinecraftVersions versions={mcFile.gameVersions} compact={false} />
</li>
<li>
    <span class="flex items-center"><Icon icon="mdi:controller" width="1.2em" height="1.2em" /><strong>Supported Platforms:</strong></span>
    <MinecraftPlatforms platforms={mcFile.platforms} />
</li>