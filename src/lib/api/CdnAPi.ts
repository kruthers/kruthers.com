import {SiteApi} from "$lib/api/SiteApi";
import type {CdnFileEntry, CdnUploadURL} from "$lib/types/api";
import {sendToast} from "$lib/store/Toasts";

export default class CdnAPi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    async listFiles(path?: string): Promise<CdnFileEntry[]> {
        if (!this.api.hasAuth()) return [];
        const pathQuery = path ? "?path="+encodeURI(path) : ""
        const response = await this.api.get(`files/list${pathQuery}`)
        if (response.ok) {
            return await response.json() as CdnFileEntry[]
        } else {
            console.log("Failed to list file")
            sendToast({
                message: "Failed to list files",
                type: "error",
            })
            return []
        }
    }

    async uploadFile(file: File, folder?: string): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        const formData = new FormData()
        formData.append("file", file)
        const encodedPath = folder ? "?folder="+encodeURIComponent(folder) : ""
        const response = await this.api.postFormData(`files/upload${encodedPath}`, formData)

        if (response?.ok) {
            sendToast({
                message: "File uploaded successfully",
                type: "success",
            })
            return true
        }
        sendToast({
            message: "Failed to upload file",
            type: "error",
        })
        return false
    }


    async startMultiPartUpload(path: string, type: string): Promise<CdnUploadURL> {
        if (!this.api.hasAuth()) return { fileID: "NULL", auth: "NULL", url: "NULL" }
        const headers = new Headers()
        headers.set("Content-Type", type)

        const response = await this.api.get(`files/upload/start?path=${encodeURIComponent(path)}`, headers)
        if (response.ok) {
            return await response.json() as CdnUploadURL
        } else {
            console.log("Failed to start multi part upload")
            console.log(await response?.text())
            sendToast({
                message: "Failed to start multi part upload",
                type: "error",
            })
            return { fileID: "NULL", auth: "NULL", url: "NULL" }
        }
    }

    async endMultiPartUpload(fileID: string, checksums: string[]): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        const data: FinishCdnUpload = { fileID, checksums }
        const response = await this.api.post("files/upload/end", data)
        if (response?.ok) {
            sendToast({
                message: "File uploaded successfully",
                type: "success",
            })
            return true
        } else {
            console.log("Failed to end multi part upload")
            console.log(await response?.text())
            sendToast({
                message: "Failed to end multi part upload",
                type: "error",
            })
            return false
        }
    }

}

type FinishCdnUpload = {
    fileID: string,
    checksums: string[]
}
