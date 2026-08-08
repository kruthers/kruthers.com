<script lang="ts">
    import {type McPlatformData, type MinecraftPlatform} from "$lib/types/projects/MinecraftData";
    import {getPlatformData} from "$lib/utils/MinecraftUtils";
    import Icon from "@iconify/svelte";
    import type {Snippet} from "svelte";

    const { platform = "VANILLA", data = getPlatformData(platform), children }: {
        platform?: MinecraftPlatform,
        data?: McPlatformData,
        children?: Snippet
    } = $props()
</script>

<span class="badge badge-sm rounded-full badge-outline m-1" style="border: 1px solid {data.color}; color: {data.color};">
    {#if (data.icon)}
        <Icon icon={data.icon} />
    {/if}
    {data.name}
    {@render children?.()}
</span>
