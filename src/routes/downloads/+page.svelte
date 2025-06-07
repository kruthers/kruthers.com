<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte";
    import RawProjectCard from "$lib/components/projects/RawProjectCard.svelte";
    import {api} from "$lib/systems/api";
    import LoadingProjectCard from "$lib/components/projects/LoadingProjectCard.svelte";

    const data = api.projects.getProjects()
</script>

<PageInfo title="Downloads" description="Downloads for my projects" />
<div class="min-h-screen max-w-7xl mx-auto shadow-lg">
    <div class="grid grid-cols-4" >
        {#await (data)}
            <LoadingProjectCard />
            <LoadingProjectCard />
            <LoadingProjectCard />
            <LoadingProjectCard />
        {:then value}
            {#each value as project}
                <RawProjectCard data={project} />
            {/each}
        {/await}
    </div>
</div>
