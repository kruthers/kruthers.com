<script lang="ts">
    import type {NavEntry} from "$lib/types/NavBar";

    export var pages: Array<NavEntry>

    import { page } from '$app/state';
</script>

<nav class="bg-primary">
    <div class="mx-auto max-w-7xl px-2 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex shrink-0 items-center">
                    <img class="h-8 w-auto" src="/icon.png" alt="Your Company">
                </div>
                <div class="hidden sm:ml-6 sm:block">
                    <div class="flex space-x-4">
                        {#each pages as entry}
                            {#if ((entry.path === "/" && page.url.pathname === "/") || (entry.path !== "/" && page.url.pathname.includes(entry.path)))}
                                <a href="{entry.path}" class="rounded-md bg-secondary px-3 py-2 text-base font-medium text-white" aria-current="page">{entry.name}</a>
                            {:else}
                                <a href="{entry.path}" class="rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-accent hover:text-white">{entry.name}</a>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>