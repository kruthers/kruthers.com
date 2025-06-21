<script lang="ts">
	import '../app.css';
    import PageInfo from "$lib/components/PageInfo.svelte";
    import NavDownloadOptions from "$lib/components/NavDownloadOptions.svelte";

	let { children } = $props();

    let innerWidth = $state(0)

    import AlertToastContainer from "$lib/components/alerts/AlertToastContainer.svelte";
    import Icon from "@iconify/svelte";
    import {copyWithAlert} from "$lib/systems/CopyUtils"; // Import the CSS
</script>

<svelte:window bind:innerWidth />
<PageInfo title="Unknown" description="No Description set" />

<header class="col-auto">
    <div class="bg-primary shadow-sm">
        <nav class="navbar mx-auto max-w-7xl px-2 lg:px-8">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul class="menu menu-sm dropdown-content bg-accent rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a href = "/">About Me</a></li>
                        <li><a href = "/portfolio">Portfolio</a></li>
                        <li>
                            Downloads
                            <NavDownloadOptions/>
                        </li>
                    </ul>
                </div>
                <img class="h-8 w-auto" src="/icon.png" alt="Your Company">
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><a href = "/">About Me</a></li>
                    <li><a href = "/portfolio">Portfolio</a></li>
                    <li>
                        <details>
                            <summary>Downloads</summary>
                            <NavDownloadOptions/>
                        </details>
                    </li>
                </ul>
            </div>
            <div class="navbar-end">
                <!-- TODO: Auth related things -->
            </div>
        </nav>
    </div>
</header>

{@render children()}

<footer class="footer sm:footer-horizontal bg-neutral text-base-content p-10">
    <aside></aside>
    <nav>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="50" width="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p>kruthers.com<br/>Copyright © 2024</p>
    </nav>
    <nav>
        <h6 class="footer-title">Made Using</h6>
        <a href="https://tailwindcss.com" class="link link-hover">Tailwind</a>
        <a href="https://daisyui.com" class="link link-hover">Daisyui</a>
        <a href="https://svelte.dev" class="link link-hover">Svelte</a>
    </nav>
    <nav>
        <h6 class="footer-title">Socials</h6>
        <div class="grid grid-flow-col gap-4">
            <a href="https://x.com/Pandakruthers" target="_blank" aria-label="X (Twitter)">
                <Icon icon="devicon:twitter" width="2em" height="2em" />
            </a>
            <a href="https://bsky.app/profile/kruthers.com" target="_blank" aria-label="BlueSky">
                <Icon icon="logos:bluesky" width="2em" height="2em" />
            </a>
            <a href="https://github.com/kruthers" target="_blank" aria-label="GitHub">
                <Icon icon="logos:github-icon" width="2em" height="2em" />
            </a>
            <div class="tooltip tooltip-info" data-tip="@kruthers (click to copy)">
                <button aria-label="Discord" onclick={() => copyWithAlert("kruthers")}>
                    <Icon icon="logos:discord-icon" width="2em" height="2em" />
                </button>
            </div>
        </div>
    </nav>
</footer>
<AlertToastContainer />
