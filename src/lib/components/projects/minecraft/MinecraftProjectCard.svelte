<script lang="ts">
    import type {MinecraftProject} from "$lib/types/projects/ProjectData";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";
    import {resolve} from "$app/paths";
    import {toTitleCase} from "$lib/utils/Utils";
    import {getMcGroupIcon, getMcGroups} from "$lib/utils/MinecraftUtils";
    import Icon from "@iconify/svelte";

    type properties = {
        project: MinecraftProject,
        showGroups?: boolean
    }

    let { project, showGroups = false }: properties = $props();

</script>

<a href={resolve("/downloads/[slug]", {slug: project.id})}
   class="card relative w-full overflow-visible rounded-3xl border border-base-300 bg-base-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
   aria-label={`View ${project.name}`}
>
    <figure class="aspect-video overflow-hidden rounded-t-3xl">
        <img src={project.banner} alt={project.name} class="h-full w-full object-cover transition-transform"/>
    </figure>

    <div class="card-body gap-3 p-5">
        {#if showGroups}
            <div>
                <span class="mb-2 font-semibold uppercase tracking-wide flex gap-2">
                    {#each getMcGroups(project) as group (group)}
                        <span class="badge badge-sm badge-accent badge-outline flex items-center gap-1">
                            <Icon icon={getMcGroupIcon(group)} height="1.2em" />
                            {group}
                        </span>
                    {/each}
                </span>
                <h2 class="card-title line-clamp-2 text-xl">{project.name}</h2>
            </div>
        {/if}

        <p class="line-clamp-3 text-sm leading-relaxed text-base-content/70">
            {project.overview}
        </p>
        {#if (project.credit)}
            <p class="line-clamp-4 text-sm leading-relaxed text-base-content/70" >by {project.credit}</p>
        {/if}

        <MinecraftVersions versions={project.gameVersions} />
        <MinecraftPlatforms platforms={project.platforms} />

        {#if project.tags.length > 0}
            <div class="mt-1 flex flex-wrap gap-2">
                {#each project.tags.slice(0, 3) as tag, index (index)}
                    <span class="badge badge-soft badge-secondary badge-sm">{toTitleCase(tag)}</span>
                {/each}
            </div>
        {/if}
    </div>
</a>
