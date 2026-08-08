<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte";
    import type { LayoutProps } from './$types';
    import {type ProjectBase} from "$lib/types/projects/ProjectData";
    import ProjectPageHeader from "$lib/components/projects/page/ProjectPageHeader.svelte";
    import MinecraftProjectExtras from "$lib/components/projects/minecraft/MinecraftProjectExtras.svelte";
    import {resolve} from "$app/paths";
    import ProjectPageError from "$lib/components/projects/page/ProjectPageError.svelte";
    import {setProjectPageContext} from "$lib/utils/ProjectContext";
    import {page} from "$app/state";
    import { userToken } from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import {openModal} from "$lib/utils/Utils";

    const { data, children } : LayoutProps  = $props();
    const projectPromise: Promise<ProjectBase | undefined> = $derived(data.project)

    type TabName = "desc" | "changelog" | "files"
    let tabActive: TabName = $derived.by(() => {
        if (typeof window === "undefined") return "desc";

        const path = page.url.pathname;
        if (path.endsWith("changelog")) return "changelog";
        if (path.endsWith("files") || path.includes("/files/")) return "files";
        return "desc";
    });
    function isActive(tab: TabName): string {
        return tabActive === tab ? "tab-active" : "";
    }
</script>

{#snippet pageContent(project: ProjectBase)}
    <!--Needed to allow setting of context during component creation-->
    {@const proj = setProjectPageContext({project})}
    <div class="flex min-w-0 flex-col gap-4">
        <div class="rounded-3xl border border-base-300 bg-base-200/70 p-2 shadow-sm">
            <div role="tablist" class="tabs tabs-box bg-transparent">
                <a role="tab" class="tab {isActive("desc")}" href={resolve("/downloads/[slug]", {slug: data.id})}>
                    Description
                </a>
                <a role="tab" class="tab {isActive("changelog")}" href={resolve("/downloads/[slug]/changelog", {slug: data.id})}>
                    Changelog
                </a>
                <a role="tab" class="tab {isActive("files")}" href={resolve("/downloads/[slug]/files", {slug: data.id})}>
                    Files
                </a>
            </div>
        </div>
        {@render children()}
    </div>
{/snippet}

<PageInfo title={data.id} description="" />

<main class="min-h-screen bg-base-100">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {#await projectPromise}
            <div class="flex min-h-96 items-center justify-center rounded-3xl border border-base-300 bg-base-200/60">
                <span class="loading loading-bars loading-xl"></span>
            </div>
        {:then project}
            {#if project === undefined}
                <ProjectPageError
                        title="Project not found"
                        message={`Project with ${data.id} could not be found.`}
                />
            {:else}
                <ProjectPageHeader data={project} files={data.files} />

                {#if project.group === "MINECRAFT"}
                    <MinecraftProjectExtras project={project}>
                        {@render pageContent(project)}
                    </MinecraftProjectExtras>
                {:else}
                    {@render pageContent(project)}
                {/if}
            {/if}
        {:catch}
            <ProjectPageError />
        {/await}
    </div>
</main>

<!--Edit project FAB-->
{#if $userToken}
    <div class="fab fab-flower">
        <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
        <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-secondary">
            <Icon icon="mdi:application-edit-outline" height="1.2em" />
        </div>

        <div class="fab-close btn btn-circle btn-lg btn-warning">
            <Icon icon="mdi:close" height="1.2em" />
        </div>

        <!-- buttons that show up when FAB is open -->
        <div class="tooltip tooltip-left" data-tip="Upload Version">
            <button class="btn btn-lg btn-circle btn-info" onclick={() => openModal("create-version-modal")}>
                <Icon icon="mdi:file-upload-outline" height="1.2em" />
            </button>
        </div>
        <div class="tooltip tooltip-left" data-tip="Edit Project">
            <button class="btn btn-lg btn-circle btn-primary" onclick={() => openModal("edit-project-modal")}>
                <Icon icon="mdi:file-document-edit" height="1.2em" />
            </button>
        </div>
        <div></div> <!-- Empty elements, may be used for future buttons -->
        <div></div>
    </div>
{/if}