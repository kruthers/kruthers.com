<script lang="ts">
import PageInfo from "$lib/components/PageInfo.svelte";
import type {PageData} from './$types';
import Icon from "@iconify/svelte";

let { data }: { data: PageData } = $props()

</script>

<PageInfo title="Login" description="Downloads for my projects" />
<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
        <div class="max-w-md">
            {#await (data.discordRedirect)}
                <span class="loading loading-spinner loading-xl"></span>
            {:then discordUrl}
                <div class="card w-96 bg-neutral text-neutral-content card-lg shadow-sm">
                    <div class="card-body items-center text-center">
                        <h1 class="card-title text-4xl">Sign In</h1>
                        <p>
                            <br/>
                            This website uses a Discord whitelist to manage access to admin tools.
                            If you are not pre-whitelisted you will not be able to sign in or do anything.
                            <br /><br />
                            If you believe you should have access then you are in the wrong place
                            <br/>
                        </p>
                        <a role="button" class="btn bg-white text-black border-[#e5e5e5]" href={discordUrl}>
                            <Icon icon="logos:discord-icon" width="1.55em" height="1.2em" />
                            Sign in with Discord
                        </a>
                    </div>
                </div>
            {/await}
        </div>
    </div>
</div>