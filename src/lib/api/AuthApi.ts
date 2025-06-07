import {SiteApi} from "$lib/api/SiteApi";

export default class AuthApi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    async getLink() {
        const response = await this.api.get("auth/link")
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

}
