<script lang="ts">
    import type { PageProps } from './$types';
    import {type ProjectBase} from "$lib/types/projects/ProjectData";
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import Markdown from "$lib/components/Markdown.svelte";
    import {isPreRelease} from "$lib/systems/Versioning";
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
    <a role="tab" class="tab" href="./">Description</a>
    <a role="tab" class="tab tab-active" href="./changelog">Changelog</a>
    <a role="tab" class="tab" href="./files">Files</a>
</div>
<div class="bg-base-300 border-base-300 p-6 w-full h-full">
    {#if (project)}
        <div class="relative pl-6 space-y-10 max-w-3xl mx-auto">
            {#each project.changelog as [version, changes]}
                <div class="rounded-lg bg-base-200">
                    <div class="pl-6 border-l-4" class:border-success={!isPreRelease(version)} class:border-error={isPreRelease(version)}>
                        <h3 class="text-lg font-bold">{version}</h3>
                        <div class="text-accent-content p-4 mt-2 prose prose-invert max-w-none">
                            <Markdown content={changes}/>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <span class="loading loading-bars loading-xl"></span>
        <!--    TODO: skeleton-->
    {/if}
</div>
