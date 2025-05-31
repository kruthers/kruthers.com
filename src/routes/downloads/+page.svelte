<script>
    import PageInfo from "$lib/components/PageInfo.svelte";
    import RawProjectCard from "$lib/components/projects/RawProjectCard.svelte";

    let { data } = $props();
</script>

<PageInfo title="Downloads" description="Downloads for my projects" />
<div class="min-h-screen max-w-7xl mx-auto shadow-lg">
    <div class="grid grid-cols-4" >
        {#each data.projects as project}
            <RawProjectCard data={project} />
        {/each}
    </div>
</div>
