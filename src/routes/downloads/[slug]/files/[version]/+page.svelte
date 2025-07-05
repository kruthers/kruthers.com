<script lang="ts">
    import type { PageProps } from './$types';
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {onMount} from "svelte";
    import {error} from "@sveltejs/kit";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import FilePage from "$lib/components/projects/page/FilePage.svelte";
    const { data } : PageProps  = $props();

    let file: BaseFile | undefined = $state()
    let project: ProjectBase | undefined = $state()

    onMount(async () => {
        project = await data.project
        file = await data.file
        if (file == undefined) {
            error(404, `File with ${data.fileID} not found`)
        }
    })
</script>

{#if (project && file)}
    <FilePage file={file} project={project} />
{:else}
    <span class="loading loading-bars loading-xl"></span>
    <!-- TODO: skeleton-->
{/if}