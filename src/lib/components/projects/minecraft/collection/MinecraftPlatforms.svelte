<script lang="ts">
    import {type MinecraftPlatform} from "$lib/types/projects/MinecraftData";
    import PlatformBadge from "$lib/components/projects/minecraft/collection/PlatformBadge.svelte";

    export var platforms: MinecraftPlatform[]
</script>

{#each platforms as platform}
    <PlatformBadge platform={platform} />
{/each}