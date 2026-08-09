<script lang="ts">
    import {isPreRelease} from "$lib/utils/Versioning";
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";
    import type {PageProps} from "./$types";

    let { data } : PageProps = $props();
</script>

{#await data.project then project}
    {#if project}
        {const changelog = new Map(Object.entries(project.changeLog))}
        <section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
            {#if changelog.size === 0}
                <div class="flex min-h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-base-300 bg-base-100/60 p-8 text-center">
                    <h2 class="text-xl font-bold">No changelog available</h2>
                    <p class="text-sm text-base-content/60">There are no changelog entries for this project yet.</p>
                </div>
            {:else}
                <div class="mx-auto max-w-3xl space-y-8">
                    {#each changelog as [version, changes] (version)}
                        <article class="rounded-2xl border border-base-300 bg-base-100/60 p-4">
                            <div
                                    class="border-l-4 pl-5"
                                    class:border-success={!isPreRelease(version)}
                                    class:border-error={isPreRelease(version)}
                            >
                                <h3 class="text-xl font-bold">#{version}</h3>
                                <div class="mt-3 max-w-none rounded-2xl bg-base-200/70 p-4 text-accent-content">
                                    <MarkdownContainer content={changes}/>
                                </div>
                            </div>
                        </article>
                    {/each}
                </div>
            {/if}
        </section>
    {/if}
{/await}