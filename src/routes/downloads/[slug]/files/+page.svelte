<script lang="ts">
    import type { PageProps } from './$types';
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import MinecraftFileList from "$lib/components/projects/minecraft/MinecraftFileList.svelte";
    import type {BaseFile} from "$lib/types/projects/FileData";
    import ProjectFilesList from "$lib/components/projects/page/ProjectFilesList.svelte";
    const { data } : PageProps  = $props();

    let files: BaseFile[] = $state([])
    let group: string | undefined = $state()

    onMount(async () => {
        const filesData = await data.files
        const proj = await data.project
        if (proj == undefined) {
            error(404, `Project with ${data.id} not found`)
        }

        group = proj.group
        files = filesData
    })
</script>

<div class="bg-base-300 border-base-300 p-6 w-full h-full">
    {#if (group === "MINECRAFT")}
        <MinecraftFileList files={files} />
    {:else if (group)}
        <ProjectFilesList files={files} />
    {:else}
        <span class="loading loading-bars loading-xl"></span>
        <!--    TODO: skeleton-->
    {/if}
</div>
