<script lang="ts">
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import type { Post } from "$lib/types/api";
    import { resolve } from "$app/paths";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import Icon from "@iconify/svelte";

    const latestPost: Post = {
        id: "placeholder-latest-post",
        title: "Latest project update coming soon",
        tags: ["news", "projects"],
        image: null,
        description: "This placeholder will show the latest post once the posts API is connected.",
        published: new Date().toISOString()
    };
</script>

<PageInfo
    title="Home"
    description="kruthers' personal site for downloads, portfolio projects, and updates"
/>

<div class="bg-base-100">
    <main class="mx-auto flex w-full max-w-7xl lg:shadow-xl flex-col gap-8 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <section
            class="hero min-h-112 overflow-hidden rounded-3xl bg-base-300 shadow-xl"
            style="background-image: linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.75)), url('/home_banner.jpg');"
        >
            <div class="hero-content max-w-4xl text-center text-neutral-content">
                <div>
                    <p class="mb-3 text-sm font-semibold uppercase tracking-[0.35em] opacity-80">
                        Jordan / kruthers
                    </p>

                    <h1 class="text-5xl font-black lowercase sm:text-6xl lg:text-7xl">
                        kruthers.com
                    </h1>

                    <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-95 sm:text-xl">
                        Welcome to my personal website, the home of my projects, updates and portfolio.
                        Most of what you will find here is focused on Minecraft maps, plugins, mods, and other
                        creative or technical projects I am working on.
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-3">
                        <span class="badge badge-outline">
                            <Icon icon="mdi:code-braces" height="1.2em" />
                            Developer
                            <Icon icon="logos:kotlin-icon" height="1.2em" />
                            <Icon icon="logos:typescript-icon" height="1.2em" />
                            <Icon icon="logos:mongodb-icon" height="1.2em" />
                            <Icon icon="logos:postgresql" height="1.2em" />
                        </span>
                        <span class="badge badge-outline">
                            <Icon icon="hugeicons:time-management" height="1.2em" />
                            Project Manager
                        </span>
                        <span class="badge badge-outline">
                            <Icon icon="mdi:server-network" height="1.2em" />
                            System Admin
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <a
                href={resolve("/posts/[slug]", { slug: latestPost.id })}
                class="card bg-primary text-primary-content shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
                <div class="card-body">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="badge badge-secondary">Latest post</span>
                        <span class="text-xs opacity-80">
                            <FormattedDate date={latestPost.published} />
                        </span>
                    </div>

                    <h2 class="card-title">{latestPost.title}</h2>
                    <p class="text-sm opacity-90">{latestPost.description}</p>

                    <div class="mt-auto flex flex-wrap gap-2">
                        {#each latestPost.tags as tag (tag)}
                            <span class="badge badge-outline border-primary-content/50 text-primary-content">
                                {tag}
                            </span>
                        {/each}
                    </div>
                </div>
            </a>
        </section>

        <section class="grid gap-6 lg:grid-cols-3">
            <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/downloads")}>
                <div class="card-body">
                    <h2 class="card-title">Project downloads <Icon icon="mdi:download" height="1.2em"/></h2>
                    <p>
                        Find a range of projects i have worked on and have published. Including Minecraft maps,
                        plugins, mods and datapacks
                    </p>
                </div>
            </a>

            <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/portfolio")}>
                <div class="card-body">
                    <h2 class="card-title">Portfolio work <Icon icon="mdi:work-outline" height="1.2em"/></h2>
                    <p>
                        Browse selected projects (both personal and collaborative) that I have worked on and contributed
                        in the past. Find out what I did for them and the impact I have had.
                    </p>
                </div>
            </a>

            <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/posts")}>
                <div class="card-body">
                    <h2 class="card-title">News & Updates <Icon icon="mdi:newspaper-variant-multiple" height="1.2em"/></h2>
                    <p>
                        See the latest updates about the projects im working on and occasional other updates.
                    </p>
                </div>
            </a>
        </section>
    </main>
</div>