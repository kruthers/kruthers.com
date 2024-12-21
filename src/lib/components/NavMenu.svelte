<script lang="ts">
    import type {NavEntry} from "$lib/types/NavBar";

    export var pages: Array<NavEntry>

    import { page } from '$app/state';

    function toggleMenu() {
        let element = document.getElementById("menu")
        if (element === null) return
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden")
            console.log("Shown")
        } else {
            element.classList.add("hidden")
            console.log("Hidden")
        }
    }
</script>

<nav class="bg-primary">
    <div class="mx-auto max-w-7xl px-2 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 right-0 flex items-center">
                <!-- Mobile menu button-->
                <button type="button" on:click={ () => toggleMenu()} class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="absolute -inset-0.5"></span>
                    <span class="sr-only">Open main menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
            </div>
            <div class="flex flex-1 items-center justify-center">
                <div class="flex shrink-0 items-center">
                    <img class="h-8 w-auto" src="/icon.png" alt="Your Company">
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="hidden" id="menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
            {#each pages as entry}
                {#if ((entry.path === "/" && page.url.pathname === "/") || (entry.path !== "/" && page.url.pathname.includes(entry.path)))}
                    <a href="{entry.path}" class="block rounded-md bg-secondary px-3 py-2 text-base font-medium text-white" aria-current="page">{entry.name}</a>
                {:else}
                    <a href="{entry.path}" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-accent hover:text-white">{entry.name}</a>
                {/if}
            {/each}
        </div>
    </div>
</nav>