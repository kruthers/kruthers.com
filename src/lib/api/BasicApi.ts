import {PUBLIC_API_PATH} from "$env/static/public"

export default class BasicApi {
    getAuth(): string | undefined {
        return undefined //todo
    }

    async get(path: string) {
        const headers = new Headers()
        const auth = this.getAuth()
        if (auth != undefined) {
            headers.append("Authorization", auth)
        }

        return await fetch(`${PUBLIC_API_PATH}/${path}`, {
            method: "GET",
            headers: headers
        })
    }

    async post(path: string, body: never) {
        const auth = this.getAuth()
        if (auth == undefined) return

        return await fetch(`${PUBLIC_API_PATH}/${path}`, {
            method: "POST",
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    async put(path: string, body: never, contentType: string) {
        const auth = this.getAuth()
        if (auth == undefined) return

        return await fetch(`${PUBLIC_API_PATH}/${path}`, {
            method: "PUT",
            headers: {
                "Authorization": auth,
                "Content-Type": contentType
            },
            body: JSON.stringify(body)
        })
    }

    async delete(path: string) {
        const auth = this.getAuth()
        if (auth == undefined) return

        return await fetch(`${PUBLIC_API_PATH}/${path}`, {
            method: "DELETE",
            headers: {
                "Authorization": auth,
            }
        })
    }

}
