<script lang="ts">
    import type {Snippet} from "svelte";

    type properties = {
        // eslint-disable-next-line no-undef
        group: MinecraftGroup
        // eslint-disable-next-line no-undef
        change: (group: MinecraftGroup) => void
        children: Snippet<[]>
    }

    let { group, change, children }: properties = $props();

    import { page } from '$app/state';
</script>

{#if (page.url.searchParams.get("type") === group)}
    <a role="tab" class="tab tab-active" href="/downloads/minecraft?type={group}" onclick={() => change(group)}>{@render children()}</a>
{:else}
    <a role="tab" class="tab" href="/downloads/minecraft?type={group}" onclick={() => change(group)}>{@render children()}</a>
{/if}
