<script lang="ts">
    import {type MinecraftPlatform} from "$lib/types/projects/MinecraftData";
    import {getPlatformData} from "$lib/utils/MinecraftUtils";
    import Icon from "@iconify/svelte";

    export var platform: MinecraftPlatform

    const data = getPlatformData(platform)
</script>

<span class="badge badge-sm rounded-full badge-outline m-1" style="border: 1px solid {data.color}; color: {data.color};">
    {#if (data.icon)}
        <Icon icon={data.icon} />
    {/if}
    {data.name}
</span>
