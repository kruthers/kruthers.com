import type {ProjectBase} from "$lib/types/projects/ProjectData";
import {SiteApi} from "$lib/api/SiteApi";
import {sendToast} from "$lib/store/Toasts";
import type {BaseFile} from "$lib/types/projects/FileData";
import {invalidateAll} from "$app/navigation";

export default class ProjectGroupApi {
    private readonly api: SiteApi
    public readonly group: string
    private readonly path: string

    constructor(group: string, api: SiteApi) {
        this.api = api
        this.group = group
        this.path = `projects/${this.group}`
    }

    private async get(path: string): Promise<Response> {
        return this.api.get(`${this.path}/${path}`);
    }

    private async post(path: string, body: never) {
        return this.api.post(`${this.path}/${path}`, body)
    }

    private async put(path: string, body: string, contentType: string) {
        return this.api.put(`${this.path}/${path}`, body, contentType)
    }

    private async patch(path: string, body: unknown) {
        return this.api.patch(`${this.path}/${path}`, body)
    }

    async getProjects() {
        const result = await this.get("list")
        if (result.ok) {
            return await result.json() as ProjectBase[]
        } else {
            console.log(`Failed to fetch projects for ${this.group}: ${result.status}: ${await result.text()}`)
            return []
        }
    }

    async getProject(project : string) {
        const result = await this.get(`${project}`)
        if (result.ok) {
            return await result.json() as ProjectBase
        } else {
            if (result.status != 404) console.log(`Failed to find project: ${result.status}: ${await result.text()}`)
            return
        }
    }

    async updateChangelog(project : string, version: string, change: string) {
        const data = {
            version: version,
            log: change
        }
        const result = await this.put(`${project}/changelog`, JSON.stringify(data), "application/json")
        if (result?.ok) {
            sendToast({
                message: `Update changelog for ${project} version ${version}`,
                type: "success"
            })
            return await result.json() as ProjectBase
        } else {
            sendToast({
                message: `Failed to update changelog for ${project} version ${version}`,
                type: "error"
            })
            if (result?.status != 404) console.log(`Failed to update changelog: ${result?.status}: ${await result?.text()}`)
            return
        }
    }

    async editProject(project: ProjectBase) {
        const result = await this.patch(`${project.id}`, project)
        if (result?.ok) {
            sendToast({
                message: "Project Updated",
                duration: 10,
                type: "success"
            })
            return await result.json() as ProjectBase
        } else {
            if (result?.status != 404 && result) {
                console.log(`Failed to update project: ${result.status}: ${await result.text()}`)
            }
            sendToast({
                message: "Failed to update project",
                type: "error"
            })
            return
        }
    }

    async editFile(project: string, file: string, data: object) {
        const result = await this.patch(`${project}/file/${file}`, {
            version: "0.0.0",
            ...data
        })
        if (result?.ok) {
            sendToast({
                message: "File Updated",
                duration: 10,
                type: "success"
            })
            return await result.json() as BaseFile
        } else {
            if (result?.status != 404 && result) {
                console.log(`Failed to update file: ${result.status}: ${await result.text()}`)
            }
            sendToast({
                message: "Failed to update file",
                type: "error"
            })
            return
        }
    }

}
