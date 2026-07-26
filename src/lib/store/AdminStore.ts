import type {Snippet} from "svelte";
import {writable} from "svelte/store";
import type {ResolvedPathname} from "$app/types";

export type AdminPageMeta = {
    name: string,
    icon?: string,
    path?: ResolvedPathname
}

export type AdminMeta = {
    pages: AdminPageMeta[],
    extra?: Snippet
}

export const adminMeta = writable<AdminMeta>({ pages: [] })

export const resetAdminMeta = () => { adminMeta.set({ pages: [] }) }