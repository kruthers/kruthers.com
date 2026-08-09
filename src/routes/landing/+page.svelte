<script lang="ts">
    import Icon from "@iconify/svelte";
    import {onMount} from "svelte";
    import type {LegacyResponse} from "$lib/types/api";
    import {page} from "$app/state";
    import {api} from "$lib/utils/api";
    import {resolve} from "$app/paths";
    import {goto} from "$app/navigation";

    let redirectLink: string | undefined = $state();
    let response: LegacyResponse | undefined = $state();
    let authorizing: boolean = $state(false);

    onMount(() => {
        const code = page.url.searchParams.get("code")
        if (code && code.length > 10) {
            authorizing = true
            api.auth.authorizeLegacy(code).then((res) => {
                response = res
                removeParams()
            })
        } else {
            api.auth.getLink(true).then((res) => {
                redirectLink = res
            })
        }
    })

    function tryAgain() {
        authorizing = false
        response = undefined
        removeParams()
        goto(resolve("/landing"))
    }

    function removeParams() {
        let params = page.url.searchParams
        params.delete("code")
        page.url.search = params.toString()
    }
</script>

{#if authorizing}
    <div class="hero bg-base-200 min-h-screen">
        {#if response}
            {#if response.success}
                <div class="hero-content flex-col lg:flex-row alert alert-success alert-soft">
                    <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                        <Icon icon="mdi:link-variant" height="4em" />
                        <div>
                            <h2 class="text-xl font-semibold">Access Granted</h2>
                            <p class="text-sm opacity-70">See the attached file to download the old data, warning it is 70GB file</p>
                            <a href={response.message} rel="external" target="_blank" class="btn btn-primary">
                                <Icon icon="mdi:download" width="1.2em" />
                                Download File
                            </a>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="hero-content flex-col lg:flex-row alert alert-error alert-soft">
                    <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                        <Icon icon="mdi:block" height="4em" />
                        <div>
                            <h2 class="text-xl font-semibold">Access Blocked</h2>
                            <p class="text-sm opacity-70">{response.message}</p>
                            <button class="btn btn-primary" onclick={tryAgain}>Try Again</button>
                        </div>
                    </div>
                </div>
            {/if}
        {:else}
            <div class="hero-content flex-col lg:flex-row alert alert-info">
                <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                    <span class="loading loading-bars loading-xl"></span>
                    <h1 class="text-5xl font-bold">Authenticating with discord</h1>
                </div>
            </div>
        {/if}
    </div>
{:else}
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row alert alert-info alert-soft">
            <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                <h1 class="text-5xl font-bold">Service offline</h1>
                <p class="py-6">
                    Hello the service/ files you tried to access are no longer available at that link! <br />
                    Don't worry though, nothing has been deleted just moved. To confirm your identity, please sign in with
                    discord, this process is instant and will return the data if you used to have access.
                </p>
                {#if redirectLink}
                    <a role="button" class="btn bg-white text-black border-[#e5e5e5]" href={redirectLink} rel="external">
                        <Icon icon="logos:discord-icon" width="1.55em" height="1.2em" />
                        Sign in with Discord
                    </a>
                {:else}
                    <button class="btn btn-primary" disabled={authorizing}>
                        <span class="loading loading-spinner"></span>
                        Sign in with Discord
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}