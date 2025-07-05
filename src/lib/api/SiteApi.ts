import type {SiteApiOptions} from "$lib/types/api";
import AuthApi from "$lib/api/AuthApi";
import ProjectsApi from "$lib/api/ProjectsApi";
import {sendToast} from "$lib/store/Toasts";

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

    /**
     * Sets the authorization token of this API
     * @param {string} access_token - The access token you want to use as a Bearer token
     * @returns {SiteApi} - Returns this
     */
    setToken(access_token: string): SiteApi {
        this.authorization = `Bearer ${access_token}`
        return this
    }

    async get(path: string): Promise<Response> {
        const headers = new Headers()
        headers.append("Authorization", this.authorization)
        return await fetch(`${this.options.url}/${path}`, {
            method: "GET",
            headers: headers
        })
    }

    async post(path: string, body: unknown): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await fetch(`${this.options.url}/${path}`, {
            method: "POST",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async put(path: string, body: string, contentType: string): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await fetch(`${this.options.url}/${path}`, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": contentType
            },
            body: body
        })
    }

    async patch(path: string, body: unknown): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await fetch(`${this.options.url}/${path}`, {
            method: "PATCH",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async delete(path: string): Promise<Response | undefined> {
        if (this.authorization == "") return

        return await fetch(`${this.options.url}/${path}`, {
            method: "DELETE",
            headers: {
                "Authorization": this.authorization,
            }
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
}