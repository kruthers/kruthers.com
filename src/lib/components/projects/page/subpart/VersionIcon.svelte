<script lang="ts">
    import {isPreRelease} from "$lib/utils/Versioning";

    export var version: string
</script>

{#if (isPreRelease(version))}
    <div class="tooltip" data-tip="Beta">
        <kbd class="kbd bg-warning">B</kbd>
    </div>
{:else}
    <div class="tooltip" data-tip="Release">
        <kbd class="kbd bg-success">R</kbd>
    </div>
{/if}
