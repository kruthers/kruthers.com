<script lang="ts">
    import type {PortfolioCardConfig} from "$lib/types/Portfoilio";

    export var config: PortfolioCardConfig
    export var left: boolean
</script>

<div class="card card-side bg-neutral shadow-xl mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 my-4">
    {#if (!left)}
        <figure class="w-1/2">
            <img src="/portfolio/{config.image}" alt="Logo" />
        </figure>
    {/if}
    <div class="card-body">
        <h2 class="card-title">{config.name}</h2>
        <p>{config.description}</p>
        <div class="card-actions justify-start">
            {#each config.roles as role}
                <div class="badge  badge-lg badge-primary">{role}</div>
            {/each}
            {#if (config.link !== undefined)}
                <a role="button" class="btn btn-primary mr-0 ml-auto" href="{config.link}">More Information</a>
            {/if}
        </div>
    </div>
    {#if (left)}
        <figure class="w-1/2 ml-auto mr-0">
            <img src="/portfolio/{config.image}" alt="Logo" />
        </figure>
    {/if}
</div>