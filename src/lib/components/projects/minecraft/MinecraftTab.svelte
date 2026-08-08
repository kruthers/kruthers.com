<script lang="ts">
    import type {Snippet} from "svelte";
    import { page } from '$app/state';
    import {getMcGroupIcon} from "$lib/utils/MinecraftUtils";
    import Icon from "@iconify/svelte";
    import type {MinecraftGroup} from "$lib/types/projects/MinecraftData";

    type properties = {
        group: MinecraftGroup
        change: (group: MinecraftGroup) => void
        children: Snippet
    }

    let { group, change, children }: properties = $props();

    let active = $derived(page.url.searchParams.get("type") === group || page.url.searchParams.get("type") === null && group === "all")

</script>

<a role="tab" class="tab {active ? "tab-active": ""} flex gap-1" href="/downloads/minecraft?type={group}" onclick={() => change(group)}>
    <Icon icon={getMcGroupIcon(group)} />
    {@render children()}
</a>
