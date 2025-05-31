<script lang="ts">
    export var data: string = ""

    import { page } from '$app/state';
</script>

{#if (page.url.searchParams.get("type") === data)}
    <a role="tab" class="tab tab-active" href="/downloads/minecraft?type={data}"><slot /></a>
{:else}
    <a role="tab" class="tab" href="/downloads/minecraft?type={data}"><slot /></a>
{/if}
