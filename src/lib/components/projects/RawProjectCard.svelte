<script lang="ts">
    import type {RawProject} from "$lib/types/projects/ProjectData";

    let {data}: {data: RawProject} = $props();
</script>

<div class="card w-66 bg-base-200 card-lg shadow-sm indicator m-7 rounded-3xl">
    <img class="indicator-item indicator-start size-9 pixels" src="/projects/icons/{data.group.toLowerCase()}.png" alt="group" />
    <figure>
        <img src={data.image} alt="pfp" class="rounded-3xl"/>
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title"><a href="downloads/{data.id}" class="hover:underline" >{data.name}</a></h2>
        <p>{data.overview}</p>
    </div>
</div>
