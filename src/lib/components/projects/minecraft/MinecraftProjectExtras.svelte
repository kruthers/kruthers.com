<script lang="ts">
    import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
    import Icon from "@iconify/svelte";
    import MinecraftVersions from "$lib/components/projects/minecraft/collection/MinecraftVersions.svelte";
    import MinecraftPlatforms from "$lib/components/projects/minecraft/collection/MinecraftPlatforms.svelte";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import type {Snippet} from "svelte";
    import {api, userToken} from "$lib/utils/api";
    import ProjectEditModal from "$lib/components/projects/forms/ProjectEditModal.svelte";
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";

    let {project, children}: {project: ProjectBase, children: Snippet} = $props();

    let data = $derived(project as MinecraftProject);
    let links = $derived(Object.entries(project.links ?? {}));

    async function saveProject(raw: ProjectBase): Promise<boolean> {

        const updated: MinecraftProject = {
            ...raw,
            type: data.type,
            gameVersions: data.gameVersions,
            platforms: data.platforms,
        }

        console.log(updated)

        const result = await api.projects.minecraft.editProject(updated)
        return result != undefined
    }
</script>

<div class="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
    <aside class="order-1 rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm lg:order-2 lg:self-start">
        <div class="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            <section>
                <h2 class="mb-3 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:check-circle-outline" width="1.2em" height="1.2em" />
                    Supported by
                </h2>

                <ul class="space-y-4 text-sm">
                    <li class="space-y-2">
                        <span class="flex items-center gap-2 font-semibold text-base-content/80">
                            <Icon icon="mdi:language-java" width="1.2em" height="1.2em" />
                            Java Versions
                        </span>
                        <MinecraftVersions versions={data.gameVersions} compact={false} />
                    </li>

                    <li class="space-y-2">
                        <span class="flex items-center gap-2 font-semibold text-base-content/80">
                            <Icon icon="mdi:controller" width="1.2em" height="1.2em" />
                            Platforms
                        </span>
                        <MinecraftPlatforms platforms={data.platforms} />
                    </li>
                </ul>
            </section>

            {#if links.length > 0}
                <section>
                    <h2 class="mb-3 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:link-variant" width="1.2em" height="1.2em" />
                        Links
                    </h2>

                    <ul class="space-y-2 text-sm">
                        {#each links as [name, link] (link)}
                            <li>
                                <a class="link link-primary" href={link} rel="external">
                                    {name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </section>
            {/if}

            <section>
                <h2 class="mb-3 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:information-outline" width="1.2em" height="1.2em" />
                    Details
                </h2>

                <ul class="space-y-4 text-sm">
                    <li>
                        <span class="flex items-center gap-2 font-semibold text-base-content/80">
                            <Icon icon="mdi:calendar-outline" width="1.2em" height="1.2em" />
                            Published
                        </span>
                        <FormattedDate date={project.created} includeTime={false} />
                    </li>

                    <li>
                        <span class="flex items-center gap-2 font-semibold text-base-content/80">
                            <Icon icon="mdi:update" width="1.2em" height="1.2em" />
                            Last Update
                        </span>
                        <FormattedDate date={project.lastUpdate} includeTime={false} />
                    </li>
                </ul>
            </section>
        </div>
    </aside>

    <div class="order-2 min-w-0 lg:order-1">
        {@render children()}
    </div>
</div>

<!--Minecraft Modals-->
{#if $userToken}
    <ProjectEditModal project={project} saveProject={saveProject} group="MINECRAFT">
    </ProjectEditModal>
{/if}