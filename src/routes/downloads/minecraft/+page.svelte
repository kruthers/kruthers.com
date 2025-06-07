<script lang="ts">
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import { faMap, faPlug, faBoxOpen, faBoxArchive } from "@fortawesome/free-solid-svg-icons"

    import MinecraftTab from "$lib/components/projects/minecraft/MinecraftTab.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import MinecraftProjectCard from "$lib/components/projects/minecraft/MinecraftProjectCard.svelte";

    import {page} from "$app/state";
    import {api} from "$lib/systems/api";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";
    import {checkMCProject} from "$lib/systems/ProjectUtils";
    let mcType: string = $state(page.url.searchParams.get("type") ?? "map")

    let data = api.projects.minecraft.getProjects()
</script>

<PageInfo title="Minecraft Downloads" description="Minecraft project downloads" />
<div class="min-h-screen max-w-7xl mx-auto">
    <div role="tablist" class="tabs tabs-box ">
        <MinecraftTab data="map"><FontAwesomeIcon icon={faMap} /> Maps</MinecraftTab>
        <MinecraftTab data="plugin"><FontAwesomeIcon icon={faPlug} /> Plugins</MinecraftTab>
        <MinecraftTab data="mod"><FontAwesomeIcon icon={faBoxOpen} /> Mods</MinecraftTab>
        <MinecraftTab data="datapack"><FontAwesomeIcon icon={faBoxArchive} /> Datapacks</MinecraftTab>
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