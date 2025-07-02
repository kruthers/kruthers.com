<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte";
    import type { LayoutProps } from './$types';
    import {type ProjectBase} from "$lib/types/projects/ProjectData";
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import ProjectPageHeader from "$lib/components/projects/page/ProjectPageHeader.svelte";
    import MinecraftProjectExtras from "$lib/components/projects/minecraft/MinecraftProjectExtras.svelte";

    const { data, children } : LayoutProps  = $props();

    let loading = $state(true)
    let project: ProjectBase | undefined = $state()


    onMount(async () => {
        const proj = await data.project
        if (proj == undefined) {
            error(404, `Project with ${data.id} not found`)
        }

        loading = false
        project = proj
    })
</script>

<PageInfo title={data.id} description="" />
<div class="min-h-screen max-w-7xl mx-auto" >
    {#if (loading || project === undefined)}
        <span class="loading loading-bars loading-xl"></span>
    {:else}
        <ProjectPageHeader data={project} />
        {#if (project.group === "MINECRAFT")}
            <MinecraftProjectExtras project={project}>{@render children()}</MinecraftProjectExtras>
        {:else}
            {@render children()}
        {/if}
    {/if}
</div>
