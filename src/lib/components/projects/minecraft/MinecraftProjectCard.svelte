<script lang="ts">
    import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";

    type properties = {
        data: ProjectBase
    }

    let {data}: properties = $props();
    let project = data as MinecraftProject
</script>

<div class="card w-66 bg-base-200 card-lg shadow-sm indicator m-7 rounded-3xl">
    <figure>
        <img src={project.image} alt="pfp" class="rounded-3xl"/>
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title"><a href="/downloads/{project.id}" class="hover:underline" >{project.name}</a></h2>
        <p>{project.overview}</p>
        {#if (project.credit)}
            <p>by {project.credit}</p>
        {/if}
        <MinecraftVersions versions={project.gameVersions} />
        <MinecraftPlatforms platforms={project.platforms} />
    </div>
</div>