<script lang="ts">
    import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
    import Icon from "@iconify/svelte";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";
    import FormattedDate from "$lib/components/FormattedDate.svelte";

    export var project: ProjectBase
    let data = project as MinecraftProject
</script>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
    <div class="col-span-3">
        <slot />
    </div>

    <div class="p-4 rounded-box bg-base-300">
        <h2 class="text-xl mb-2">Supported</h2>
        <ul class="text-sm space-y-3">
            <li>
                <span class="flex items-center"><Icon icon="cil:fork" width="1.2em" height="1.2em" /><strong>Java Versions:</strong></span>
                <MinecraftVersions versions={data.gameVersions} compact={false} />
            </li>
            <li>
                <span class="flex items-center"><Icon icon="mdi:controller" width="1.2em" height="1.2em" /><strong>Platforms:</strong></span>
                <MinecraftPlatforms platforms={data.platforms} />
            </li>
        </ul>
        {#if (project.links.size > 0)}
            <br />
            <h2 class="text-xl mb-2">Links</h2>
            <ul class="text-sm space-y-3">
                {#each project.links as [name,link]}
                    <li><a href={link}>{name}</a></li>
                {/each}
            </ul>
        {/if}
        <br />
        <h2 class="text-xl mb-2">Project Details</h2>
        <ul class="text-sm space-y-3">
            <li>
                <span class="flex items-center"><Icon icon="mdi:clock" width="1.2em" height="1.2em" /> <strong>Published:</strong></span>
                <FormattedDate date={project.created} />
            </li>
            <li>
                <span class="flex items-center"><Icon icon="mdi:clock" width="1.2em" height="1.2em" /> <strong>Last Update:</strong></span>
                <FormattedDate date={project.lastUpdate} />
            </li>
        </ul>
    </div>
</div>
