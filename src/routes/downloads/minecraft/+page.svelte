<script lang="ts">
    import MinecraftTab from "$lib/components/projects/minecraft/MinecraftTab.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";

    import {page} from "$app/state";
    import {api} from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import {toTitleCase} from "$lib/utils/Utils";
    import {checkMCProject} from "$lib/utils/ProjectUtils";
    import type {MinecraftProject} from "$lib/types/projects/ProjectData";
    import MinecraftProjectCard from "$lib/components/projects/minecraft/MinecraftProjectCard.svelte";
    import {onMount} from "svelte";
    import type {MinecraftGroup} from "$lib/types/projects/MinecraftData";
    let mcType: MinecraftGroup = $state((page.url.searchParams.get("type") ?? "all") as MinecraftGroup)

    //project loading
    let loading = $state(true)
    let error = $state(false)
    let allProjects = $state<MinecraftProject[]>([])
    let projects = $derived(allProjects.filter(p => checkMCProject(p, mcType)))

    onMount(() => {
        api.projects.minecraft.getProjects().then((result) => {
            allProjects = result.map(p => p as MinecraftProject)
        }).catch((err) => {
            error = true
            console.error("Failed to load projects")
            console.error(err)
        }).finally(() => {
            loading = false
        })
    })

    function changeGroup(group: MinecraftGroup) {
        mcType = group
    }
</script>

<PageInfo title="Minecraft Downloads" description="Minecraft project downloads" />

<main class="min-h-screen bg-base-100">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 py-4">
        <div>
            <header class="rounded-3xl border border-base-300 bg-linear-to-br from-base-100 via-base-200 to-base-300 shadow-sm p-6 sm:p-8 lg:p-10">
                <div class="max-w-3xl">
                    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
                        Minecaft Downloads
                    </h1>

                    <p class="mt-4 text-base leading-relaxed text-base-content/70 sm:text-lg">
                        The home of all Minecraft projects I have published/ made or worked on.
                        Go to a project to view it details, supported versions and download it!
                    </p>
                </div>
            </header>
            <div class="mt-2 rounded-box border border-base-300 shadow-sm overflow-hidden">
                <div role="tablist" class="pl-6 sm:pl-8 lg:pl-10 tabs tabs-box bg-linear-to-r from-base-200 to-base-300 ">
                    <MinecraftTab group="all" change={changeGroup}>All</MinecraftTab>
                    <MinecraftTab group="map" change={changeGroup}>Maps</MinecraftTab>
                    <MinecraftTab group="plugin" change={changeGroup}>Plugins</MinecraftTab>
                    <MinecraftTab group="mod" change={changeGroup}>Mods</MinecraftTab>
                    <MinecraftTab group="datapack" change={changeGroup}>Datapacks</MinecraftTab>
                </div>
            </div>
        </div>

        <section class="rounded-3xl border border-base-300 bg-base-200/40 p-4 shadow-sm sm:p-6 min-h-145">
            <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 class="text-2xl font-bold">{toTitleCase(mcType)} Projects</h2>
                    <p class="text-sm text-base-content/60">
                        {#if mcType === "all" || mcType === "map" || mcType === "datapack"}
                            Click a project below to view more information, and to access its downloads
                        {:else if mcType === "plugin"}
                            View any current plugins I have published. These are Jars that are designed to be run on
                            Spigot or Paper server software or on a Velocity Proxy
                        {:else if mcType === "mod"}
                            View any current mods I have published. These are Jars that are designed to be run on Fabric/
                            Forge or NeoForge servers/ clients.
                        {/if}
                    </p>
                </div>
            </div>

            {#if loading}
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                    <LoadingProjectCard />
                </div>
            {:else if error}
                <div class="alert alert-error alert-soft block justify-center">
                    <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                        <Icon icon="mdi:alert-circle" height="4em" />
                        <div>
                            <h2 class="text-xl font-semibold">Failed to load projects</h2>
                            <p class="text-sm opacity-70">An unknown exception occurred while loading the projects. Please try refreshing the page.</p>
                        </div>
                    </div>
                </div>
            {:else}
                {#if projects.length === 0}
                    <div class="alert alert-warning alert-soft block justify-center">
                        <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                            <Icon icon="mdi:folder-open-outline" height="4em" class="opacity-50" />
                            <div>
                                {#if allProjects.length === 0}
                                    <h2 class="text-xl font-semibold">No projects available</h2>
                                    <p class="text-sm opacity-70">Ops, looks like no projects have been loaded. Please check back later, if the issue continues please contact me!</p>
                                {:else}
                                    <h2 class="text-xl font-semibold">No {toTitleCase(mcType)}s available yet</h2>
                                    <p class="text-sm opacity-70">
                                        It looks like there is no {toTitleCase(mcType)}s published yet. Check back later for updates.<br/>
                                        You can also check out my posts & updates for when new ones are released!
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                {:else}
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {#each projects as project (project.id)}
                            <MinecraftProjectCard {project} showGroups={mcType === "all"} />
                        {/each}
                    </div>
                {/if}
            {/if}
        </section>
    </section>
</main>
