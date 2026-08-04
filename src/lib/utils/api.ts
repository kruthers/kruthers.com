import {writable, type Writable} from "svelte/store";
import {browser} from "$app/environment";
import {SiteApi} from "$lib/api/SiteApi";
import { env } from "$env/dynamic/public";
import {PUBLIC_CND_PATH} from "$env/static/public";

export const api = new SiteApi({
    url: env.PUBLIC_API_PATH,
    access_token: (browser ? localStorage.getItem("token") : '')
})

export const userToken: Writable<string | undefined> = writable(function(){
    if (!browser) return undefined
    const t = localStorage.getItem("token")
    return  t ? t : undefined
}());

userToken.subscribe((data) => {
    if (!browser) return
    if (data) {
        localStorage.setItem("token", data)
    } else {
        localStorage.removeItem("token")
    }
})

export function getUploadedFileUrl(path: string, file: File) {
    const basePath = PUBLIC_CND_PATH.endsWith("/")
        ? PUBLIC_CND_PATH
        : `${PUBLIC_CND_PATH}/`;

    return `${basePath}${path}${encodeURIComponent(file.name)}`;
}
