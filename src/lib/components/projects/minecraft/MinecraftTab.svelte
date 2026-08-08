<script lang="ts">
    import type {Snippet} from "svelte";

    type properties = {
        // eslint-disable-next-line no-undef
        group: MinecraftGroup
        // eslint-disable-next-line no-undef
        change: (group: MinecraftGroup) => void
        children: Snippet
    }

    let { group, change, children }: properties = $props();

    let active = $derived(page.url.searchParams.get("type") === group || page.url.searchParams.get("type") === null && group === "all")

    import { page } from '$app/state';
    import {getMcGroupIcon} from "$lib/utils/MinecraftUtils";
    import Icon from "@iconify/svelte";
</script>

<a role="tab" class="tab {active ? "tab-active": ""} flex gap-1" href="/downloads/minecraft?type={group}" onclick={() => change(group)}>
    <Icon icon={getMcGroupIcon(group)} />
    {@render children()}
</a>
