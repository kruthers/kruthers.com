<script lang="ts">
    import {onMount} from "svelte";
    import type { PageProps } from './$types';
    import {api, userToken} from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import {sendToast} from "$lib/store/Toasts";

    let title = $state("Authenticating...")
    let loading = $state(true)
    let failed = $state(false)

    let { data }: PageProps = $props()

    onMount(async () => {
        if (!data.code) {
            sendToast({
                id: 0,
                message: "Failed to authenticate: Failed to read code from discord",
                type: "error"
            })
            return
        }
        await api.auth.authorize(data.code)
            .then((authData) => {
                if (authData != null) {
                    userToken.set(authData)
                    sendToast({
                        id: 0,
                        message: "Successfully signed into discord",
                        type: "success"
                    })
                    window.location.href = "/"
                    loading = false
                } else {
                    userToken.set(null)
                    loading = false
                    failed = true
                    title = "Authentication Failed."
                    sendToast({
                        id: 0,
                        message: "Failed to authenticate: Unauthorized",
                        type: "error"
                    })
                }
            })
    })
</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl">{title}</h1>
            <br />
            {#if (loading)}
                <span class="loading loading-spinner w-20"></span>
            {:else}
                <p>
                    {#if (failed)}
                        <Icon icon="pajamas:warning-solid" width="2em" height="2em"  style="color: #b01d1d" />
                    {:else}
                        <Icon icon="bi:check-all" width="2em" height="2em"  style="color: #26b01d" />
                    {/if}
                </p>

                <br />
                <a role="button" class="btn btn-warning" href="/login">Login</a>
            {/if}
        </div>
    </div>
</div>