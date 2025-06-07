<script lang="ts">
import PageInfo from "$lib/components/PageInfo.svelte";
import type {PageServerData} from './$types';
import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

let { data }: { data: PageServerData } = $props()

</script>

<PageInfo title="Login" description="Downloads for my projects" />
<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
        <div class="max-w-md">
            {#await (data.discordRedirect)}
                <span class="loading loading-spinner loading-xl"></span>
            {:then discordUrl}
                <h1 class="text-5xl font-bold">Sign In</h1>
                <p class="py-6">
                    Login using discord, if you are not registered as an admin this will do nothing!
                </p>
                <a role="button" class="btn btn-wide tn-soft btn-info btn-outline" href={discordUrl}>
                    <FontAwesomeIcon icon={faDiscord} style="color: #5865F2;" />
                    Sign in with Discord
                </a>
            {/await}
        </div>
    </div>
</div>