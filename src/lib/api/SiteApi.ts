import type {SiteApiOptions} from "$lib/types/api";
import AuthApi from "$lib/api/AuthApi";
import ProjectsApi from "$lib/api/ProjectsApi";
import {sendToast} from "$lib/store/Toasts";
import CdnAPi from "$lib/api/CdnAPi";
import PostsAPi from "$lib/api/PostsAPI";
import {userToken} from "$lib/utils/api";
import ContactApi from "$lib/api/ContactApi";

export class SiteApi {
    authorization: string = ""
    readonly options: SiteApiOptions

    constructor(options: SiteApiOptions) {
        this.options = options
        if (options.access_token) this.setToken(options.access_token)
    }

    //api groups
    public readonly auth = new AuthApi(this)
    public readonly projects = new ProjectsApi(this)
    public readonly cdn = new CdnAPi(this)
    public readonly posts = new PostsAPi(this)
    public readonly contact = new ContactApi(this)

    /**
     * Sets the authorization token of this API
     * @param {string} access_token - The access token you want to use as a Bearer token
     * @returns {SiteApi} - Returns this
     */
    setToken(access_token: string): SiteApi {
        this.authorization = `Bearer ${access_token}`
        return this
    }

    private async fetch(path: string, init: RequestInit): Promise<Response> {
        const headers = new Headers(init.headers)
        if (this.authorization != "") headers.append("Authorization", this.authorization)
        const response = await fetch(`${this.options.url}/${path}`, {
            ...init,
            headers: headers
        })
        if (response.status == 401 || response.status == 403) {
            //reset user authentication
            this.authorization = ""
            userToken.set(undefined)
            //send error toast
            sendToast({
                message: "Authorization session expired.",
                type: "warning"
            })
        }
        return response
    }

    async get(path: string, headers?: Headers): Promise<Response> {
        return await this.fetch(path, {
            method: "GET",
            headers: headers
        })
    }

    async post(path: string, body: unknown): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await this.fetch(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async postFormData(path: string, body: FormData): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await this.fetch(path, {
            method: "POST",
            body
        })
    }

    async put(path: string, body: string, contentType: string = "application/json"): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await this.fetch(path, {
            method: "PUT",
            headers: {
                "Content-Type": contentType
            },
            body: body
        })
    }

    async patch(path: string, body: unknown): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await this.fetch(path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async delete(path: string): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await this.fetch(path, {
            method: "DELETE"
        })
    }

    async getMcCache(): Promise<McMeta> {
        const response = await this.get("/meta/mc")

        if (response.ok) {
            return await response.json() as McMeta
        } else {
            sendToast({
                message: "Failed to get MC Meta",
                type: "warning"
            })
            return {versions: [], latestVersion: ""}
        }
    }

    public hasAuth(): boolean {
        return this.authorization != ""
    }
}