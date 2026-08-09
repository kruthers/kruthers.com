<script lang="ts">
    import { adminMeta, resetAdminMeta } from "$lib/store/AdminStore";
    import { onDestroy } from "svelte";
    import type { CdnFileEntry } from "$lib/types/api";
    import { FileType } from "$lib/types/api";
    import { api } from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import {findType, type SupportedType} from "$lib/types/FileTypes";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import {env} from "$env/dynamic/public";

    adminMeta.set({
        pages: [
            { name: "Files", path: "/admin/files", icon: "mdi:file-tree" },
        ]
    });

    onDestroy(resetAdminMeta);

    let currentFolder: string = $state("");
    const files: Promise<CdnFileEntry[]> = $derived(api.cdn.listFiles(currentFolder));
    const folderParts: string[] = $derived(currentFolder.split("/").filter(Boolean));

    //file management
    let fileToDelete: CdnFileEntry | undefined = $state();
    let uploadInput: HTMLInputElement | undefined = $state();
    let uploading = $state(false);
    let deleting = $state(false);

    //image preview
    let previewImage: string | undefined = $state();

    function getBreadcrumbPath(index: number): string {
        const parts = folderParts.slice(0, index + 1);
        return `${parts.join("/")}/`;
    }

    function getEntryName(entry: CdnFileEntry): string {
        return entry.name.split("/").filter(Boolean).pop() ?? entry.name;
    }

    function getParentFolder(): string {
        const parts = [...folderParts]
        parts.pop();

        if (parts.length === 0) return "";
        return `${parts.join("/")}`;
    }

    function openFolder(entry: CdnFileEntry): void {
        currentFolder = entry.name;
    }

    function refreshFiles(): void {
        const folderCache = currentFolder
        currentFolder = ""
        setTimeout(() => {
            currentFolder = folderCache
        }, 100)
    }

    function getDownloadUrl(entry: CdnFileEntry): string {
        const cdnBase = env.PUBLIC_CND_PATH.endsWith("/")
            ? env.PUBLIC_CND_PATH.slice(0, -1)
            : env.PUBLIC_CND_PATH;

        return `${cdnBase}/${entry.name}`;
    }

    function formatFileSize(size: number): string {
        if (size <= 0) return "—";

        const units = ["B", "KB", "MB", "GB", "TB"];
        let value = size;
        let unitIndex = 0;

        while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024;
            unitIndex++;
        }

        return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    }

    function getFriendlyType(entry: CdnFileEntry): SupportedType {
        if (entry.type === FileType.FOLDER) return "Folder";
        if (entry.type === FileType.UPLOADING) return "Uploading";
        return findType(entry.name).name
    }

    function getTypeIcon(entry: CdnFileEntry): string {
        if (entry.type === FileType.FOLDER) return "mdi:folder";
        if (entry.type === FileType.UPLOADING) return "mdi:cloud-upload";
        return findType(entry.name).icon
    }

    function requestDelete(entry: CdnFileEntry): void {
        fileToDelete = entry;
    }

    async function confirmDelete(): Promise<void> {
        if (!fileToDelete) return;

        deleting = true;

        const deleted = await api.cdn.deleteFile(fileToDelete.name);

        if (deleted) {
            fileToDelete = undefined;
            refreshFiles();
        }

        deleting = false;
    }

    async function uploadFiles(event: Event): Promise<void> {
        const input = event.currentTarget as HTMLInputElement;
        const selectedFiles = Array.from(input.files ?? []);

        if (selectedFiles.length === 0) return;

        uploading = true;

        for (const file of selectedFiles) {
            await api.cdn.uploadFile(file, currentFolder);
        }

        input.value = "";
        uploading = false;
        refreshFiles();
    }

    function isEntryImage(entry: CdnFileEntry): boolean {
        if (entry.type !== FileType.FILE) return false
        const extension = entry.name.split(".").pop()?.toLowerCase() ?? "";
        return ["png", "jpg", "jpeg", "gif", "webp"].includes(extension);
    }

    //image preview
    function openImagePreview(entry: CdnFileEntry): void {
        previewImage = getDownloadUrl(entry);
    }

    function closeImagePreview(): void {
        previewImage = undefined;
    }
</script>
<PageInfo title="Files" description="View and manage files on the CDN." />

<main class="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
    <section class="rounded-2xl border border-base-300 bg-base-200 shadow-sm">
        <div class="flex flex-col gap-4 border-b border-base-300 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="min-w-0">
                <h1 class="text-2xl font-bold">File explorer</h1>

                <div class="breadcrumbs max-w-full overflow-x-auto text-sm">
                    <ul>
                        <li>
                            <button class="link flex items-center gap-1" onclick={() => currentFolder = ""}>
                                <Icon icon="mdi:server" height="1.1em" />
                                Root
                            </button>
                        </li>

                        {#each folderParts as part, index (index)}
                            <li>
                                <button class="link" onclick={() => currentFolder = getBreadcrumbPath(index)}>
                                    {part}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="flex flex-wrap gap-2">
                {#if currentFolder !== ""}
                    <button class="btn btn-sm rounded-full" onclick={() => currentFolder = getParentFolder()}>
                        <Icon icon="mdi:arrow-up" height="1.2em" />
                        Up
                    </button>
                {/if}

                <button class="btn btn-sm btn-outline rounded-full" onclick={refreshFiles}>
                    <Icon icon="mdi:refresh" height="1.2em" />
                    Refresh
                </button>

                <button class="btn btn-sm btn-primary rounded-full" disabled={uploading} onclick={() => uploadInput?.click()}>
                    {#if uploading}
                        <span class="loading loading-spinner loading-xs"></span>
                        Uploading
                    {:else}
                        <Icon icon="mdi:upload" height="1.2em" />
                        Upload
                    {/if}
                </button>

                <input
                    bind:this={uploadInput}
                    type="file"
                    multiple
                    class="hidden"
                    onchange={uploadFiles}
                />
            </div>
        </div>

        <div class="bg-base-100">
            <table class="table w-full">
                <thead>
                <tr>
                    <th class="w-12"></th>
                    <th class="w-full">Name</th>
                    <th class="max-lg:hidden min-w-26">Type</th>
                    <th class="max-lg:hidden min-w-20">Size</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {#await files}
                    <!-- eslint-disable-next-line svelte/require-each-key @typescript-eslint/no-unused-vars -->
                    {#each Array(8) as _}
                        <tr>
                            <td><div class="skeleton h-10 w-10 rounded-xl"></div></td>
                            <td class="space-y-2 overflow-hidden">
                                <div class="skeleton h-4 w-48"></div>
                                <div class="skeleton h-3 w-72 max-w-full"></div>
                            </td>
                            <td class="max-lg:hidden">
                                <div class="skeleton h-5 w-20 rounded-full"></div>
                            </td>
                            <td class="max-lg:hidden">
                                <div class="skeleton h-4 w-16"></div>
                            </td>
                            <td class="w-0 whitespace-nowrap text-right">
                                <div class="skeleton h-8 w-28 rounded-full"></div>
                            </td>
                        </tr>
                    {/each}
                {:then loadedFiles}
                    {#if loadedFiles.length === 0}
                        <tr>
                            <td colspan="5" class="text-center">
                                <div class="flex flex-col items-center justify-center gap-3 p-14 text-center">
                                    <Icon icon="mdi:folder-open-outline" height="4em" class="opacity-50" />
                                    <div>
                                        <h2 class="text-xl font-semibold">This folder is empty</h2>
                                        <p class="text-sm opacity-70">Upload a file to add something here.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {:else}
                        {#each loadedFiles as entry (entry.name)}
                            <tr>
                                <td>
                                    {#if isEntryImage(entry)}
                                        <button onclick={() => openImagePreview(entry)} class="block h-10 w-10 overflow-hidden rounded-xl bg-base-200 transition hover:opacity-80">
                                            <img src={getDownloadUrl(entry)} alt={getEntryName(entry)} class="h-full w-full object-cover" loading="lazy"/>
                                        </button>
                                    {:else}
                                        <button
                                                class="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 transition hover:bg-base-300"
                                                disabled={entry.type !== FileType.FOLDER}
                                                onclick={() => openFolder(entry)}
                                                aria-label={entry.type === FileType.FOLDER ? `Open ${entry.name}` : entry.name}
                                        >
                                            <Icon icon={getTypeIcon(entry)} height="1.5em" />
                                        </button>
                                    {/if}
                                </td>
                                <th>
                                    <div class="min-w-0">
                                        {#if entry.type === FileType.FOLDER}
                                            <button
                                                class="block max-w-full truncate text-left font-semibold hover:link"
                                                onclick={() => openFolder(entry)}
                                            >
                                                {getEntryName(entry)}
                                            </button>
                                        {:else if isEntryImage(entry)}
                                            <button
                                                onclick={() => openImagePreview(entry)}
                                                class="block max-w-full truncate text-left font-semibold hover:link"
                                            >
                                                {getEntryName(entry)}
                                            </button>
                                        {:else}
                                            <p class="truncate font-semibold">{getEntryName(entry)}</p>
                                        {/if}

                                        <p class="truncate text-xs opacity-60">{entry.name}</p>

                                        <div class="mt-2 flex flex-wrap gap-2 lg:hidden">
                                            <span class="badge badge-outline badge-sm">{getFriendlyType(entry)}</span>
                                            <span class="badge badge-ghost badge-sm">{formatFileSize(entry.size)}</span>
                                        </div>
                                    </div>
                                </th>
                                <td class="max-lg:hidden">
                                    <span class="badge badge-outline">{getFriendlyType(entry)}</span>
                                </td>
                                <td class="max-lg:hidden text-sm opacity-80">
                                    {formatFileSize(entry.size)}
                                </td>
                                <td>
                                    <div class="flex gap-2 flex-nowrap">
                                        {#if entry.type === FileType.FOLDER}
                                            <button class="btn btn-sm rounded-full" onclick={() => openFolder(entry)}>
                                                <Icon icon="mdi:folder-open" height="1.2em" />
                                                <span class="hidden lg:inline">Open</span>
                                            </button>
                                        {:else if entry.type === FileType.FILE}
                                            <a class="btn btn-sm rounded-full" href={getDownloadUrl(entry)}
                                               download={entry.name} target="_blank" rel="external"
                                            >
                                                <Icon icon="mdi:download" height="1.2em" />
                                                <span class="hidden lg:inline">Download</span>
                                            </a>
                                        {/if}

                                        <button
                                            class="btn btn-error btn-sm rounded-full"
                                            onclick={() => requestDelete(entry)}
                                        >
                                            <Icon icon="mdi:delete" height="1.2em" />
                                            <span class="hidden lg:inline">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                {:catch}
                    <tr>
                        <td colspan="5" class="text-center p-4">
                            <div class="alert alert-error rounded-2xl">
                                <Icon icon="mdi:alert-circle" height="1.5em" />
                                <span>Failed to load files.</span>
                                <button class="btn btn-sm rounded-full" onclick={refreshFiles}>Try again</button>
                            </div>
                        </td>
                    </tr>
                {/await}
                </tbody>
            </table>
        </div>
    </section>
</main>

{#if fileToDelete}
    <div class="modal modal-open">
        <div class="modal-box rounded-3xl">
            <h3 class="text-lg font-bold">
                Delete {fileToDelete.type === FileType.FOLDER ? "folder" : "file"}?
            </h3>

            <p class="py-4">
                Are you sure you want to delete
                <span class="font-semibold">{getEntryName(fileToDelete)}</span>?
                This action cannot be undone.
            </p>

            <div class="rounded-2xl bg-base-200 p-3 text-sm opacity-80">
                {fileToDelete.name}
            </div>

            <div class="modal-action">
                <button class="btn rounded-full" disabled={deleting} onclick={() => fileToDelete = undefined}>
                    Cancel
                </button>

                <button class="btn btn-error rounded-full" disabled={deleting} onclick={confirmDelete}>
                    {#if deleting}
                        <span class="loading loading-spinner loading-sm"></span>
                        Deleting
                    {:else}
                        Delete
                    {/if}
                </button>
            </div>
        </div>

        <button
            class="modal-backdrop"
            disabled={deleting}
            onclick={() => fileToDelete = undefined}
            aria-label="Close delete confirmation"
        ></button>
    </div>
{:else if previewImage}
    <dialog id="image_preview" class="modal modal-open" onclose={closeImagePreview}>
        <div class="modal-box w-fit max-w-6xl p-4 m-0 shadow-xl">
            <img src={previewImage} alt="Preview" class="m-0">
        </div>
<!--        <img src= alt="" class="max-w-full object-contain" />-->
        <form method="dialog" class="modal-backdrop">
            <button onclick={closeImagePreview}>close</button>
        </form>
    </dialog>
{/if}