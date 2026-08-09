<script lang="ts">
    import PostsPage from "$lib/components/posts/PostsPage.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
</script>

<PageInfo title="Downloads" description="Downloads for my projects" />

<main class="min-h-screen bg-base-100">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 py-4">
        <header class="rounded-3xl border border-base-300 bg-linear-to-br from-base-100 via-base-200 to-base-300 shadow-sm">
            <div class="relative p-6 sm:p-8 lg:p-10">
                <div class="max-w-3xl">
                    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
                        News, Updates & Blog
                    </h1>

                    <p class="mt-4 max-w-2xl text-base leading-relaxed text-base-content/70 sm:text-lg">
                        Welcome to the my personal feed, the location I post updates on my projects, share the occasional
                        news and the even more occasional blog post. (Mostly just project/ site updates though)
                    </p>
                </div>
            </div>
        </header>

        <PostsPage>
            {#snippet header()}
                <h2 class="text-2xl font-bold tracking-tight">Browse Posts</h2>
            {/snippet}
        </PostsPage>
    </section>
</main>
