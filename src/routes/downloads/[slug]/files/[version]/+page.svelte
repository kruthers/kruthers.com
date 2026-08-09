<script lang="ts">
    import type { PageProps } from './$types';
    import FilePage from "$lib/components/projects/page/FilePage.svelte";
    import ProjectPageError from "$lib/components/projects/page/ProjectPageError.svelte";

    const { data } : PageProps  = $props();
</script>

{#await data.project then project}
    {#if project}
        <section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
            {#await data.file}
                <div class="flex min-h-64 items-center justify-center">
                    <span class="loading loading-bars loading-xl"></span>
                </div>
            {:then file}
                {#if file === undefined}
                    <ProjectPageError
                            title="File not found"
                            message={`File with ${data.fileID} could not be found.`}
                    />
                {:else}
                    <FilePage file={file} project={project} />
                {/if}
            {:catch}
                <ProjectPageError
                        title="Unable to load file"
                        message="An unknown error occurred while loading this file."
                />
            {/await}
        </section>
    {/if}
{/await}