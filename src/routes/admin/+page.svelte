<script lang="ts">
    import {adminMeta} from "$lib/store/AdminStore";
    import {resolve} from "$app/paths";
    import Icon from "@iconify/svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";

    adminMeta.set({
        pages: []
    })

</script>

<PageInfo title="Admin Panel" description="Manage the site and its content" />

<main class="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
    <section class="w-full bg-base-200 rounded-box p-3">
        <h1 class="text-3xl font-bold">Admin Panel</h1>
        <p>
            Welcome to the admin panel for <span class="badge badge-soft">kruthers.com</span>, control
            projects, posts and bot tokens. Also access the remote CDN to view files and check its status
        </p>
    </section>
    <section class="grid gap-6 lg:grid-cols-3">
        <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/admin/files")}>
            <div class="card-body">
                <h2 class="card-title">CDN Files <Icon icon="mdi:file-tree" height="1.2em"/></h2>
                <p>
                    A CND file browser. View & manage the files currently hosted on the remote CDN.
                </p>
            </div>
        </a>
        <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/admin/posts")}>
            <div class="card-body">
                <h2 class="card-title">Posts Management <Icon icon="mdi:post" height="1.2em"/></h2>
                <p>
                    View current posts, articles & create new posts/ articles.
                </p>
            </div>
        </a>
        <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/admin/projects")}>
            <div class="card-body">
                <h2 class="card-title">Manage Projects <Icon icon="mdi:folder-multiple" height="1.2em"/></h2>
                <p>
                    Create new projects and view all current projects listed on the site
                </p>
            </div>
        </a>
        <a class="card bg-base-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md" href={resolve("/admin/tokens")}>
            <div class="card-body">
                <h2 class="card-title">Manage Bot Tokens <Icon icon="mdi:robot" height="1.2em"/></h2>
                <p>
                    Add, remove and view bot tokens
                </p>
            </div>
        </a>
    </section>
</main>