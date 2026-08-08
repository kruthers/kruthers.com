import {SiteApi} from "$lib/api/SiteApi";

export default class ContactApi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    async sendContact(name: string, email: string, discord: string, message: string) {
        const response = await this.api.post("contact", {name, email, message, discord})
        if (response?.ok) {
            return true
        } else {
            console.log("Failed to send message")
            console.log(await response?.text())
            return false
        }
    }

}