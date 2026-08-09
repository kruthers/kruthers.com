<script lang="ts">
    import type { PageProps } from './$types';
    import MinecraftFileList from "$lib/components/projects/minecraft/MinecraftFileList.svelte";
    import ProjectFilesList from "$lib/components/projects/page/ProjectFilesList.svelte";
    import ProjectPageError from "$lib/components/projects/page/ProjectPageError.svelte";
    import {onMount} from "svelte";

    const { data } : PageProps  = $props();
    let group: string = $state("")

    onMount(() => {
        data.project.then(result => {
            group = result?.group ?? ""
        })
    })
</script>

<section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
    {#await data.files}
        <div class="flex min-h-64 items-center justify-center">
            <span class="loading loading-bars loading-xl"></span>
        </div>
    {:then files}
        {#if group === "MINECRAFT"}
            <MinecraftFileList files={files} />
        {:else}
            <ProjectFilesList files={files} />
        {/if}
    {:catch}
        <ProjectPageError
                title="Unable to load files"
                message="An unknown error occurred while loading the files for this project."
        />
    {/await}
</section>