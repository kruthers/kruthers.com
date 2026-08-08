<script lang="ts">
    import {api} from "$lib/utils/api";
    import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
    import ProjectCreationModal from "$lib/components/projects/forms/ProjectCreationModal.svelte";
    import Icon from "@iconify/svelte";
    import RawProjectCard from "$lib/components/projects/RawProjectCard.svelte";
    import {openModal} from "$lib/utils/Utils";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import {adminMeta} from "$lib/store/AdminStore";

    adminMeta.set({
        pages: [
            { name: "Projects", path: "/admin/projects", icon: "mdi:folder-multiple" },
        ]
    });

    let projects = $state(api.projects.getProjects())

    function refresh() {
        projects = api.projects.getProjects()
    }

    async function createMcProject(rawData: ProjectBase, formData: FormData): Promise<boolean> {
        const project: MinecraftProject = {
            ...rawData,
            type: formData.get("type") as string,
            gameVersions: [],
            platforms: []
        }

        const result: MinecraftProject | undefined = await api.projects.minecraft.createProject(project)
        const success = result != undefined
        if (success) refresh()
        return success
    }
</script>

<PageInfo title="Project Management" description="Manage and add projects on the site" />

<main class="w-full">
    <div class="flex w-full flex-col gap-6 p-4 lg:p-6">
        <section class="w-full rounded-2xl border border-base-300 bg-base-200 p-4 shadow-md">
            <div class="mb-4">
                <h1 class="text-2xl font-bold">Create Project</h1>
                <p class="text-sm opacity-70">Choose a project type to create.</p>
            </div>

            <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <button class="card bg-base-100 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                    onclick={() => openModal("create-project-minecraft")}
                >
                    <div class="card-body">
                        <div class="flex items-center gap-3">
                            <img
                                    src="/projects/icons/minecraft.png"
                                    alt="Minecraft"
                                    class="size-12 pixels rounded-xl"
                            />
                            <div>
                                <h2 class="card-title">Minecraft</h2>
                                <p class="text-sm opacity-70">Create a Minecraft project</p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </section>

        <section class="w-full rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <div class="mb-4">
                <h2 class="text-2xl font-bold">All Projects</h2>
                <p class="text-sm opacity-70">View existing projects.</p>
            </div>

            {#await projects}
                <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {#each Array(8)}
                        <div class="skeleton h-96 rounded-3xl"></div>
                    {/each}
                </div>
            {:then projectList}
                {#if projectList.length === 0}
                    <div class="flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-base-200 p-14 text-center">
                        <Icon icon="mdi:folder-open-outline" height="4em" class="opacity-50" />
                        <div>
                            <h3 class="text-xl font-semibold">No Projects</h3>
                            <p class="text-sm opacity-70">Create your first project to get started.</p>
                        </div>
                    </div>
                {:else}
                    <div class="grid w-full justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {#each projectList as project (`${project.group}-${project.id}`)}
                            <RawProjectCard data={project} />
                        {/each}
                    </div>
                {/if}
            {:catch}
                <div class="alert alert-error rounded-2xl">
                    <Icon icon="mdi:alert-circle" height="1.5em" />
                    <span>Failed to load projects</span>
                </div>
            {/await}
        </section>
    </div>
</main>

<ProjectCreationModal group="MINECRAFT" createProject={createMcProject}>
    {#snippet extraFields()}
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Project Type</legend>
            <select id="type" name="type" class="select validator">
                <option value="MAP">Map</option>
                <option value="JAR">Jar</option>
                <option value="DATAPACK">Datapack</option>
            </select>
            <span class="validator-hint">Required</span>
        </fieldset>
    {/snippet}
</ProjectCreationModal>

