<script lang="ts">
    import {api} from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";

    const emailRegex = /^[\w\-.]+@(?:[\w-]+\.)+[\w-]{2,4}$/
    const discordRegex = /^(?=.{2,32}$)(?!(?:everyone|here)$)\.?[a-z0-9_]+(?:\.[a-z0-9_]+)*\.?$/

    let sending = $state(false)
    let sent = $state(false)
    let error = $state<string | null>(null)

    async function submit(e: SubmitEvent) {
        e.preventDefault()
        error = null

        const element = e.target as HTMLFormElement
        const formData = new FormData(element)

        const name = (formData.get("name") as string).trim()
        const email = ((formData.get("email") as string | null) ?? "").trim()
        const discord = ((formData.get("discord") as string | null) ?? "").trim()
        const message = (formData.get("message") as string).trim()

        if (name.length < 1) {
            error = "Please enter your name."
            return
        }
        if (message.length < 1) {
            error = "Please enter a message."
            return
        }
        if (!discord && !email) {
            error = "Please provide either an email address or Discord username."
            return
        }
        if (email && !emailRegex.test(email)) {
            error = "Please enter a valid email address."
            return
        }
        if (discord && !discordRegex.test(discord)) {
            error = "Please enter a valid Discord username."
            return
        }
        sending = true
        const result = await api.contact.sendContact(name, email, discord, message)
        sending = false

        if (result) {
            sent = true
            element.reset()
        } else {
            error = "Failed to send your message. Please try again later."
        }
    }

</script>

<PageInfo title="Contact" description="Contact form for sending me a message." />

<main class="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
    <section class="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div class="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
            <div class="flex flex-col justify-center gap-4 rounded-2xl bg-base-200 p-6">
                <div class="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-content">
                    <Icon icon="mdi:message-text-outline" height="2em" />
                </div>

                <div>
                    <h1 class="text-3xl font-bold">Send me a message</h1>
                    <p class="mt-3 text-base opacity-75">
                        Want to contact me and not sure which way is best? Or what platform ill see it?<br />
                        Send me a message via here and ill try and respond as soon as possible!
                    </p>
                </div>

                <div class="alert alert-info alert-soft">
                    <Icon icon="mdi:information-outline" height="1.5em" />
                    <span>Include either your Discord username or email, so i have a way to respond</span>
                </div>
            </div>

            <div class="rounded-2xl bg-base-200 p-4 sm:p-6">
                {#if sent}
                    <div class="flex min-h-96 flex-col items-center justify-center gap-4 text-center">
                        <div class="flex size-20 items-center justify-center rounded-full bg-success text-success-content">
                            <Icon icon="mdi:check" height="3em" />
                        </div>

                        <div>
                            <h2 class="text-2xl font-bold">Message sent!</h2>
                            <p class="mt-2 opacity-75">
                                Your message has been sent, you should get a response soon!
                            </p>
                        </div>

                        <button class="btn btn-primary" type="button" onclick={() => sent = false}>
                            Send another message
                        </button>
                    </div>
                {:else}
                    <form class="flex flex-col gap-2" onsubmit={submit}>
                        {#if error}
                            <div class="alert alert-error alert-soft">
                                <Icon icon="mdi:alert-circle-outline" height="1.5em" />
                                <span>{error}</span>
                            </div>
                        {/if}

                        <fieldset class="fieldset">
                            <label class="label" for="name">Name</label>
                            <input
                                class="input validator" type="text" name="name" placeholder="Your name"
                                required disabled={sending} id="name"
                            />
                            <span class="validator-hint hidden text-error">Name is required</span>
                        </fieldset>

                        <fieldset class="fieldset">
                            <label class="label" for="email">Email</label>
                            <label class="input validator" for="email">
                                <Icon icon="mdi:email" height="1.25em" />
                                <input type="email" name="email" id="email" placeholder="Email address" disabled={sending}/>
                            </label>
                            <p class="validator-hint hidden text-error">Enter a valid email address</p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <label class="label" for="discord">Discord</label>
                            <label class="input validator" for="discord">
                                <Icon icon="ic:baseline-discord" height="1.25em" />
                                <input type="text" name="discord" id="discord"
                                        placeholder="Discord Username" disabled={sending} min="3" max="32"
                                        pattern="{discordRegex.source}"
                                />
                            </label>
                            <p class="validator-hint hidden text-error">Enter a valid Discord username</p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <label class="label" for="message">Message</label>
                            <textarea
                                    class="textarea validator min-h-40 w-full"
                                    name="message" id="message"
                                    placeholder="Your message"
                                    required
                                    disabled={sending}
                                    minlength="10"
                                    maxlength="3000"
                            ></textarea>
                            <p class="validator-hint hidden">
                                Message is required<br />
                                Message must be at least 10 characters long<br />
                                Message must be at most 3000 characters long
                            </p>
                        </fieldset>

                        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <button class="btn btn-ghost" type="reset" disabled={sending}>
                                Clear
                            </button>

                            <button class="btn btn-primary" type="submit" disabled={sending}>
                                {#if sending}
                                    <span class="loading loading-spinner loading-sm"></span>
                                    Sending...
                                {:else}
                                    <Icon icon="mdi:send" height="1.25em" />
                                    Send message
                                {/if}
                            </button>
                        </div>
                    </form>
                {/if}
            </div>
        </div>
    </section>
</main>
