<script lang="ts">
    import type { PageProps } from './$types';
    import Markdown from "$lib/components/Markdown.svelte";
    import {isPreRelease} from "$lib/utils/Versioning";
    const { data } : PageProps  = $props();

    const changelogPromise: Promise<Map<string, string>> = data.project.then((p) => {
        if (p) {
            return new Map(Object.entries(p.changeLog))
        } else {
            return new Map()
        }
    })
</script>

<div role="tablist" class="tabs tabs-lift tabs-lg">
    <a role="tab" class="tab" href="./">Description</a>
    <a role="tab" class="tab tab-active" href="./changelog">Changelog</a>
    <a role="tab" class="tab" href="./files">Files</a>
</div>
<div class="bg-base-300 border-base-300 p-6 w-full h-full">
    {#await changelogPromise}
        <span class="loading loading-bars loading-xl"></span>
        <!--    TODO: skeleton-->
    {:then changelog}
        <div class="relative pl-6 space-y-10 max-w-3xl mx-auto">
            {#each changelog as [version, changes]}
                <div class="rounded-lg border-base-100">
                    <div class="pl-6 border-l-4" class:border-success={!isPreRelease(version)} class:border-error={isPreRelease(version)}>
                        <h3 class="text-xl font-bold">#{version}</h3>
                        <div class="text-accent-content p-4 mt-2 prose prose-invert max-w-none">
                            <Markdown content={changes}/>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/await}
</div>
