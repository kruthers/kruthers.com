<script lang="ts">
	import '../app.css';
    import PageInfo from "$lib/components/PageInfo.svelte";
    import NavDownloadOptions from "$lib/components/NavDownloadOptions.svelte";

	let { children } = $props();

    let innerWidth = $state(0)

    //font awesome
    import { config } from '@fortawesome/fontawesome-svg-core'

    import '@fortawesome/fontawesome-svg-core/styles.css'
    import AlertToastContainer from "$lib/components/alerts/AlertToastContainer.svelte"; // Import the CSS
    config.autoAddCss = false
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
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" xml:space="preserve"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>X</svg>
            </a>
            <a href="https://bsky.app/profile/kruthers.com" target="_blank" aria-label="BlueSky">
                <svg class="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"> <path d="M6.335 5.144c-1.654 -1.199 -4.335 -2.127 -4.335 .826c0 .59 .35 4.953 .556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045 .665 -4.889 3.208 -2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134 -2.769 3.5 -3.5c.333 -.667 .5 -1.167 .5 -1.5c0 .333 .167 .833 .5 1.5c.366 .731 1.5 3.5 3.5 3.5c.754 0 1.637 -.571 2.667 -1.59c2.222 -2.203 1.378 -4.746 -2.667 -5.41c2.314 .38 4.73 .094 5.444 -2.369c.206 -.708 .556 -5.072 .556 -5.661c0 -2.953 -2.68 -2.025 -4.335 -.826c-2.293 1.662 -4.76 5.048 -5.665 6.856c-.905 -1.808 -3.372 -5.194 -5.665 -6.856z"></path> </svg>
            </a>
            <a href="https://github.com/kruthers" target="_blank" aria-label="GitHub">
                <svg class="fill-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                </svg>
            </a>
            <div class="tooltip" data-tip="@kruthers (click to copy)">
                <button aria-label="Discord" onclick={() => navigator.clipboard.writeText("kruthers")}>
                    <svg class="fill-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                        <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"></path>
                        <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>
</footer>
<!--<AlertToastContainer />-->
