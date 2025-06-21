<script lang="ts">
    import type { PageProps } from './$types';
    import {type ProjectBase} from "$lib/types/projects/ProjectData";
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import Markdown from "$lib/components/Markdown.svelte";
    const { data } : PageProps  = $props();

    let project: ProjectBase | undefined = $state()


    onMount(async () => {
        const proj = await data.project
        if (proj == undefined) {
            error(404, `Project with ${data.id} not found`)
        }

        project = proj
    })
</script>

<div role="tablist" class="tabs tabs-lift tabs-lg">
    <a role="tab" class="tab tab-active" href="./{data.id}">Description</a>
    <a role="tab" class="tab" href="./{data.id}/changelog">Changelog</a>
    <a role="tab" class="tab" href="./{data.id}/files">Files</a>
</div>
<div class="bg-base-300 border-base-300 p-6 w-full h-full">
    {#if (project)}
        <Markdown content={project.description} />
    {:else}
        <span class="loading loading-bars loading-xl"></span>
    {/if}
</div>
