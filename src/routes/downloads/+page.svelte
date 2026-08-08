<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte";
    import RawProjectCard from "$lib/components/projects/RawProjectCard.svelte";
    import {api} from "$lib/utils/api";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";
    import Icon from "@iconify/svelte";

    const data = api.projects.getProjects()
</script>

<PageInfo title="Downloads" description="Downloads for my projects" />

<main class="min-h-screen bg-base-100">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 py-4">
        <header class="rounded-3xl border border-base-300 bg-linear-to-br from-base-100 via-base-200 to-base-300 shadow-sm">
            <div class="relative p-6 sm:p-8 lg:p-10">
                <div class="max-w-3xl">
                    <div class="badge badge-soft badge-primary flex items-center gap-2">
                        <Icon icon="mdi:download" height="1.2em" />
                        Project Downloads
                    </div>

                    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
                        Downloads
                    </h1>

                    <p class="mt-4 max-w-2xl text-base leading-relaxed text-base-content/70 sm:text-lg">
                        View all the different maps/ plugins and other projects i have published and available for download.
                    </p>
                </div>
            </div>
        </header>

        <section class="rounded-3xl border border-base-300 bg-base-200/40 p-4 shadow-sm sm:p-6">
            <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 class="text-2xl font-bold">All Projects</h2>
                    <p class="text-sm text-base-content/60">
                        Click a project below to view more information, and to access its downloads
                    </p>
                </div>
            </div>

            {#await data}
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                </div>
            {:then value}
                {#if value.length === 0}
                    <div class="alert alert-warning alert-soft block justify-center">
                        <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                            <Icon icon="mdi:folder-open-outline" height="4em" class="opacity-50" />
                            <div>
                                <h2 class="text-xl font-semibold">No projects available</h2>
                                <p class="text-sm opacity-70">Ops, looks like no projects have been loaded. Please check back later, if the issue continues please contact me!</p>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {#each value as project (project.id)}
                            <RawProjectCard data={project} />
                        {/each}
                    </div>
                {/if}
            {:catch}
                <div class="alert alert-error alert-soft block justify-center">
                    <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                        <Icon icon="mdi:alert-circle" height="4em" />
                        <div>
                            <h2 class="text-xl font-semibold">Failed to load projects</h2>
                            <p class="text-sm opacity-70">An unknown exception occurred while loading the projects. Please try refreshing the page.</p>
                        </div>
                    </div>
                </div>
            {/await}
        </section>
    </section>
</main>