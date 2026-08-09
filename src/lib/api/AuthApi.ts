import {SiteApi} from "$lib/api/SiteApi";
import {sendToast} from "$lib/store/Toasts";
import type {LegacyResponse, Token} from "$lib/types/api";

export default class AuthApi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    async getLink(legacy: boolean = false) {
        const response = await this.api.get(`auth/link?legacy=${legacy}`)
        if (response.ok) {
            return await response.text()
        } else return ""
    }

    async authorize(code: string) {
        const response = await this.api.get(`auth/authorize?code=${code}`)
        if (response.ok) {
            return await response.text()
        } else return null
    }

    async authorizeLegacy(code: string): Promise<LegacyResponse> {
        const response = await this.api.get(`auth/authorize/legacy?code=${code}`)
        if (response.ok) {
            return await response.json() as LegacyResponse
        } else {
            console.log("Failed to authorize")
            console.log(await response.text())
            return {
                success: false,
                message: "An unknown exception occurred. Please try again later."
            }
        }
    }

    async isValid(): Promise<boolean> {
        const response = await this.api.get("auth/validate")
        return response.ok;
    }

    async createToken(name: string, duration: number) {
        const response = await this.api.post("auth/token", {name, duration})
        if (response?.ok) {
            sendToast({
                message: "Token created",
                type: "success",
            })
            return await response.text()
        } else {
            sendToast({
                message: "Failed to create token",
                type: "error",
            })
            console.log("Failed to create token")
            console.log((await response?.text()) ?? "Not authenticated")
            return null
        }
    }

    async deleteToken(name: string) {
        const response = await this.api.delete(`auth/token/${name}`)
        if (response?.ok) {
            sendToast({
                message: "Token deleted",
                type: "success",
            })
            return true
        } else {
            sendToast({
                message: "Failed to delete token",
                type: "error",
            })
        }
    }

    async getTokens() {
        const response = await this.api.get("auth/tokens")
        if (response.ok) {
            return await response.json() as Token[]
        } else {
            console.log("Failed to get tokens")
            console.log(await response.text())
            sendToast({
                message: "Failed to get tokens",
                type: "error",
            })
            return []
        }
    }

}
