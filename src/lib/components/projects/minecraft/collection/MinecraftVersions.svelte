<script lang="ts">
    export var versions: string[]

    export var compact: boolean = true
</script>

{#if (versions.length < 2 || !compact)}
    {#each versions as version}
        <span class="badge badge-sm rounded-full badge-outline badge-info m-1">{version}</span>
    {/each}
{:else}
    <span class="badge badge-sm rounded-full badge-outline badge-info m-1">{versions[0]}</span>
    <div class="dropdown dropdown-hover">
        <span class="badge badge-sm rounded-full badge-soft badge-info p-3">+</span>
        <ul tabindex="-1" class="no-meta-list dropdown-content bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm">
            {#each versions as version}
                <li>{version}</li>
            {/each}
        </ul>
    </div>
{/if}