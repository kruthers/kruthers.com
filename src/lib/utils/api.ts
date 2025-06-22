import {writable, type Writable} from "svelte/store";
import {browser} from "$app/environment";
import {SiteApi} from "$lib/api/SiteApi";
import {PUBLIC_API_PATH} from "$env/static/public";

export const api = new SiteApi({
    url: PUBLIC_API_PATH,
    access_token: (browser ? localStorage.getItem("token") : '')
})

export const userToken: Writable<string | null> = writable(function(){
    if (!browser) return null
    return localStorage.getItem("token")
}());

userToken.subscribe((data) => {
    if (!browser) return
    if (data) {
        localStorage.setItem("token", data)
    } else {
        localStorage.removeItem("token")
    }
})
