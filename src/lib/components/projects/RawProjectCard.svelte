<script lang="ts">
    import type {RawProject} from "$lib/types/projects/ProjectData";

    export var data: RawProject
</script>

<div class="card w-96 bg-base-100 card-xs shadow-sm">
    <figure>
        <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            class="rounded-xl"
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">{data.name}</h2>
        <p>{data.overview}</p>
    </div>
</div>
