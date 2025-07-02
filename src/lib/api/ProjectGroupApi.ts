import type {ProjectBase} from "$lib/types/projects/ProjectData";
import {SiteApi} from "$lib/api/SiteApi";
import {sendToast} from "$lib/store/Toasts";

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
        //todo!!
        // const result = await this.get(`${project}`)
        // if (result.ok) {
        //     return await result.json() as ProjectBase
        // } else {
        //     if (result.status != 404) console.log(`Failed to find project: ${result.status}: ${await result.text()}`)
        //     return
        // }
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

}
