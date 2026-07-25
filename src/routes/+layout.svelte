<script lang="ts">
	import '../app.css';
    import PageInfo from "$lib/components/PageInfo.svelte";

    import AlertToastContainer from "$lib/components/alerts/AlertToastContainer.svelte";
    import Icon from "@iconify/svelte";
    import {copyWithAlert} from "$lib/utils/CopyUtils"; // Import the CSS
    import { resolve } from '$app/paths';
    import projectPages from "$lib/types/projects/pages"

	let { children } = $props();

    let innerWidth = $state(0)
</script>

<svelte:window bind:innerWidth />
<PageInfo title="Unknown" description="No Description set" />

{#snippet projectEntries()}
    {#each projectPages as project (project.name)}
        <li>
            <a href={project.path}>{project.name}</a>
            {#if project.subPaths?.length ?? 0 > 0}
                <ul>
                    {#each project.subPaths as subPath (subPath.name)}
                        <li><a href={subPath.path}>
                            {#if subPath.icon}
                                <Icon icon={subPath.icon} height="1.2em" />
                            {/if}
                            {subPath.name}
                        </a></li>
                    {/each}
                </ul>
            {/if}
        </li>
    {/each}
{/snippet}

<header class="max-lg:collapse bg-base-200 shadow-sm w-full rounded-md">
    <input id="navbar-1-toggle" class="peer hidden" type="checkbox" />
    <label for="navbar-1-toggle" class="fixed inset-0 hidden max-lg:peer-checked:block"></label>
    <div class="collapse-title navbar">
        <div class="navbar-start">
            <label for="navbar-1-toggle" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <a class="btn btn-ghost text-xl" aria-label="Home" href="{resolve("/")}"><Icon icon="mdi:home" height="1.2em" /></a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a href={resolve("/posts")}>Posts</a></li>
                <li>
                    <details>
                        <summary>Downloads</summary>
                        <ul class="p-2 bg-base-100 w-40 z-1">
                            {@render projectEntries()}
                        </ul>
                    </details>
                </li>
                <li><a href={resolve("/portfolio")}>Portfolio</a></li>
            </ul>
        </div>
        <div class="navbar-end">

        </div>
    </div>

    <div class="collapse-content lg:hidden z-1">
        <ul class="menu">
            <li><a href={resolve("/posts")}>Posts</a></li>
            <li>
                <button>Downloads</button>
                <ul>
                    {@render projectEntries()}
                </ul>
            </li>
            <li><a href={resolve("/portfolio")}>Portfolio</a></li>
        </ul>
    </div>
</header>

{@render children()}

<footer class="footer sm:footer-horizontal bg-neutral text-base-content p-10">
    <aside></aside>
    <nav>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="50" width="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p>kruthers.com<br/>Copyright © 2026</p>
    </nav>
    <nav>
        <h6 class="footer-title">Made Using</h6>
        <a href="https://tailwindcss.com" class="link link-hover">Tailwind</a>
        <a href="https://daisyui.com" class="link link-hover">Daisyui</a>
        <a href="https://svelte.dev" class="link link-hover">Svelte</a>
    </nav>
    <nav>
        <h6 class="footer-title">Quick Links</h6>
        <a href={resolve("/")} class="link link-hover">Home Page</a>
        <a href={resolve("/downloads")} class="link link-hover">Downloads</a>
        <a href={resolve("/contact")} class="link link-hover">Contact Me</a>
        <a href={resolve("/landing")} class="link link-hover">Old Sites</a>
    </nav>
    <nav>
        <h6 class="footer-title">Socials</h6>
        <div class="grid grid-flow-col gap-4">
            <a href="https://github.com/kruthers" target="_blank" aria-label="GitHub">
                <Icon icon="logos:github-icon" width="2em" height="2em" />
            </a>
            <div class="tooltip tooltip-info" data-tip="@kruthers (click to copy)">
                <button aria-label="Discord" onclick={() => copyWithAlert("kruthers")}>
                    <Icon icon="logos:discord-icon" width="2em" height="2em" />
                </button>
            </div>
            <a href={resolve("/contact")} aria-label="Contact" class="tooltip" data-tip="Direct Contact">
                <Icon icon="mdi:message" width="2em" height="2em" />
            </a>
            <a href="https://bsky.app/profile/kruthers.com" target="_blank" aria-label="BlueSky" class="tooltip" data-tip="Not in use">
                <Icon icon="logos:bluesky" width="2em" height="2em" />
            </a>
        </div>
    </nav>
</footer>
<AlertToastContainer />
