<script lang="ts">
    import PageInfo from "$lib/components/PageInfo.svelte";
    import Icon from "@iconify/svelte";
    import {closeModal, openModal} from "$lib/utils/Utils";
    import type {Token} from "$lib/types/api";
    import {api} from "$lib/utils/api";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import {sendToast} from "$lib/store/Toasts";

    let tokens: Promise<Token[]> = $state(api.auth.getTokens())
    let newToken: string | undefined = $state()

    function isExpired(token: Token): boolean {
        const expires = new Date(token.expires)
        const now = new Date()
        return now > expires
    }

    function refreshTokens() {
        tokens = api.auth.getTokens()
    }

    function createToken(event: SubmitEvent) {
        event.preventDefault()
        const data = new FormData(event.target as HTMLFormElement)
        const name = data.get("name") as string
        const duration = parseInt(data.get("duration") as string)
        console.log("Creating token", name, duration)
        api.auth.createToken(name, duration).then(result => {
            console.log("Created token", result)
            newToken = result
        }).catch(err => {
            console.error("Failed to create token")
            console.error(err)
            sendToast({
                message: "Failed to create token",
                type: "error",
            })
        })

        const modal = document.getElementById("create-token") as HTMLDialogElement
        modal.close()
    }
</script>

<PageInfo title="Tokens" description="View and manage site tokens" />

<main class="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
    <section class="rounded-2xl border border-base-300 bg-base-200 shadow-sm">
        <div class="flex flex-col gap-4 border-b border-base-300 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="min-w-0">
                <h1 class="text-2xl font-bold">Bot Tokens</h1>
            </div>

            <div class="">
                <button class="btn btn-sm btn-secondary rounded-full" onclick={refreshTokens}>
                    <Icon icon="mdi:refresh" height="1.2em" />
                    Refresh
                </button>
                <button class="btn btn-sm btn-primary rounded-full" onclick={() => openModal("create-token")}>
                    <Icon icon="mdi:plus" height="1.2em" />
                    Create Token
                </button>
            </div>
        </div>
        <ul class="list bg-base-100 rounded-box shadow-md">
            {#await tokens}
                {#each Array(4)}
                    <li>
                       <div class="skeleton h-16 w-full rounded-2xl"></div>
                    </li>
                {/each}
            {:then tokenList}
                {#if tokenList.length === 0}
                    <li class="text-center">
                        <div class="flex flex-col items-center justify-center gap-3 p-14 text-center">
                            <Icon icon="mdi:robot-off-outline" height="4em" class="opacity-50" />
                            <div>
                                <h2 class="text-xl font-semibold">No Tokens</h2>
                                <p class="text-sm opacity-70">Looks there are not any tokens in the system currently</p>
                            </div>
                        </div>
                    </li>
                {:else}
                    {#each tokenList as token (token.tokenId)}
                        <li class="list-row">
                            <div>
                                {#if isExpired(token)}
                                    <Icon icon="mdi:robot-dead" height="3em" class="text-secondary" />
                                {:else}
                                    <Icon icon="mdi:robot-excited" height="3em" class="text-success" />
                                {/if}
                            </div>
                            <div class="list-col-grow">
                                <div>{token.name}</div>
                                <div class="text-xs uppercase font-semibold opacity-60">{token.tokenId}</div>
                            </div>
                            <div>
                                <span class="badge badge-sm">Expires <FormattedDate date={token.expires} /></span>
                            </div>
                            <button class="btn btn-square btn-ghost btn-error" aria-label="delete">
                                <Icon icon="mdi:trash-can" height="2em" />
                            </button>
                        </li>
                    {/each}
                {/if}
            {:catch}
                <li>
                    <div class="alert alert-error rounded-2xl">
                        <Icon icon="mdi:alert-circle" height="1.5em" />
                        <span>Failed to load tokens</span>
                        <button class="btn btn-sm rounded-full" onclick={refreshTokens}>Try again</button>
                    </div>
                </li>
            {/await}
        </ul>
    </section>
</main>

<!-- Modals -->
<dialog id="create-token" class="modal">
    <div class="modal-box">
        <form class="space-y-4" onsubmit={createToken}>
            <h2 class="text-2xl font-bold">Create Token</h2>
            <fieldset class="fieldset">
                <label class="label" for="name">Name</label>
                <input type="text" class="input validator" placeholder="Name of token" name="name" id="name" required/>
                <div class="validator-hint hidden">Name of token is required</div>
            </fieldset>
            <fieldset class="fieldset">
                <label class="label" for="duration">Valid For (days)</label>
                <input type="number" class="input validator" placeholder="Number of days token is valid" required min="1" id="duration" name="duration" />
                <p class="validator-hint hidden">Must be valid for at least 1 day</p>
            </fieldset>

            <div class="modal-action">
                <button class="btn btn-primary" type="submit">Create</button>
                <button class="btn btn-error" type="reset" onclick={() => closeModal("create-token")}>Cancel</button>
            </div>
        </form>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button onclick={() => closeModal("create-token")}>close</button>
    </form>
</dialog>

{#if newToken}
    <dialog id="new-token" class="modal modal-open">
        <div class="modal-box border-success">
            <div class="relative bg-base-200 border rounded-box p-2">
                <div class="grow text-wrap max-w-full overflow-hidden">
                    <pre class="whitespace-pre-wrap break-all"><code id="token-block" class="text-sm text-body">{newToken}</code></pre>
                </div>
                <div class="absolute top-2 inset-e-2">
                    <button class="btn btn-sm btn-neutral tooltip" data-tip="Copy Token" onclick={() => navigator.clipboard.writeText(newToken ?? "")}>
                        <Icon icon="mdi:content-copy" width="1.2em" height="1.2em" />
                    </button>
                </div>
            </div>
        </div>
        <form class="modal-backdrop">
            <button onclick={() => newToken = undefined}>close</button>
        </form>
    </dialog>
{/if}