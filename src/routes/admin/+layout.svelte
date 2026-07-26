<script lang="ts">
    import {browser} from "$app/environment";
    import { userToken } from "$lib/utils/api";
    import {goto} from "$app/navigation";
    import {resolve} from "$app/paths";
    import Icon from "@iconify/svelte";
    import {adminMeta} from "$lib/store/AdminStore";
    import type {ResolvedPathname} from "$app/types";

    let { children } = $props();

    $effect(() => {
        if (!browser) return;

        if (!$userToken) {
            goto(resolve("/login"));
        }
    });

    type AdminPages = {
        name: string,
        icon: string,
        path: ResolvedPathname
    }

    const adminPages: AdminPages[] = [
        {name: "Tokens", icon: "mdi:key", path: resolve("/admin/tokens")},
        {name: "Files", icon: "mdi:file-tree", path: resolve("/admin/files")},
        {name: "Posts", icon: "mdi:post", path: resolve("/admin/posts")},
        {name: "Projects", icon: "mdi:folder-multiple", path: resolve("/admin/projects")},
    ]
</script>

{#if $userToken}
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />
        <div class="drawer-content">
            <!-- Navbar -->
            <nav class="navbar w-full bg-base-300">
                <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost text-base-content btn-neutral drawer-button">
                    <!-- Sidebar toggle icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                </label>
                <div class="px-4">
                    {#if ($adminMeta)}
                        <div class="breadcrumbs text-sm">
                            <ul>
                                <li><a href={resolve("/admin")}><Icon icon="mdi:administrator" height="1.2em" /> Home</a></li>
                                {#each $adminMeta.pages as page (page.path)}
                                    <li>
                                        {#if page.path}
                                            <a href={page.path}>
                                                {#if page.icon}
                                                    <Icon icon={page.icon} height="1.2em" />
                                                {/if}
                                                {page.name}
                                            </a>
                                        {:else}
                                            {#if page.icon}
                                                <Icon icon={page.icon} height="1.2em" />
                                            {/if}
                                            {page.name}
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {:else}
                        Admin Area
                    {/if}
                </div>
            </nav>
            <!-- Page content here -->
            <div class="p-4">
                {@render children()}
            </div>
        </div>

        <div class="drawer-side is-drawer-close:overflow-visible">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
                <!-- Sidebar content here -->
                <ul class="menu w-full grow">
                    <li>
                        <a class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Admin Homepage" href={resolve("/admin")}>
                            <Icon icon="mdi:administrator" height="1.5em" />
                            <span class="is-drawer-close:hidden">Admin Home</span>
                        </a>
                    </li>
                    {#each adminPages as page (page.name)}
                        <li>
                            <a class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={page.name} href={page.path}>
                                <Icon icon={page.icon} height="1.5em" />
                                <span class="is-drawer-close:hidden">{page.name}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
{/if}
