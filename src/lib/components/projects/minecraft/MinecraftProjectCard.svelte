<script lang="ts">
    import type {MinecraftProject} from "$lib/types/projects/ProjectData";

    export var data: MinecraftProject
</script>

<div class="card w-90 bg-base-200 card-lg shadow-sm indicator m-8 rounded-3xl">
    <figure>
        <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                class="rounded-3xl "
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title"><a href="downloads/{data.id}" class="hover:underline" >{data.name}</a></h2>
        <p>{data.overview}</p>

    </div>
</div>