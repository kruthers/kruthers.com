<script lang="ts">
    import MinecraftTab from "$lib/components/projects/minecraft/MinecraftTab.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import MinecraftProjectCard from "$lib/components/projects/minecraft/MinecraftProjectCard.svelte";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";

    import {page} from "$app/state";
    import {api} from "$lib/utils/api";
    import {checkMCProject} from "$lib/utils/ProjectUtils";
    let mcType: string = $state(page.url.searchParams.get("type") ?? "map")

    let data = api.projects.minecraft.getProjects()
</script>

<PageInfo title="Minecraft Downloads" description="Minecraft project downloads" />
<div class="min-h-screen max-w-7xl mx-auto">
    <div role="tablist" class="tabs tabs-box ">
        <MinecraftTab data="map">Maps</MinecraftTab>
        <MinecraftTab data="plugin">Plugins</MinecraftTab>
        <MinecraftTab data="mod">Mods</MinecraftTab>
        <MinecraftTab data="datapack">Datapacks</MinecraftTab>
    </div>
    <div class="grid grid-cols-4" >
        {#await (data)}
            <LoadingProjectCard />
            <LoadingProjectCard />
            <LoadingProjectCard />
            <LoadingProjectCard />
        {:then value}
            {#each value as project}
                {#if (checkMCProject(project, mcType))}
                    <MinecraftProjectCard data={project} />
                {/if}
            {/each}
        {/await}
    </div>
</div>