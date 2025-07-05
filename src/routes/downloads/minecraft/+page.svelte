<script lang="ts">
    import MinecraftTab from "$lib/components/projects/minecraft/MinecraftTab.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import MinecraftProjectCard from "$lib/components/projects/minecraft/MinecraftProjectCard.svelte";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";

    import {page} from "$app/state";
    import {api} from "$lib/utils/api";
    import {checkMCProject} from "$lib/utils/ProjectUtils";
    // eslint-disable-next-line no-undef
    let mcType: MinecraftGroup = $state((page.url.searchParams.get("type") ?? "all") as MinecraftGroup)

    let data = api.projects.minecraft.getProjects()

    function changeGroup(group: MinecraftGroup) {
        mcType = group
    }
</script>

<PageInfo title="Minecraft Downloads" description="Minecraft project downloads" />
<div class="min-h-screen max-w-7xl mx-auto">
    <div role="tablist" class="tabs tabs-box">
        <MinecraftTab group="map" change={changeGroup}>Maps</MinecraftTab>
        <MinecraftTab group="plugin" change={changeGroup}>Plugins</MinecraftTab>
        <MinecraftTab group="mod" change={changeGroup}>Mods</MinecraftTab>
        <MinecraftTab group="datapack" change={changeGroup}>Datapacks</MinecraftTab>
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