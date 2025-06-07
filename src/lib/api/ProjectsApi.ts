import type {ProjectBase, RawProject} from "$lib/types/projects/ProjectData";
import {SiteApi} from "$lib/api/SiteApi";
import ProjectGroupApi from "$lib/api/ProjectGroupApi";

export default class ProjectsApi {
    private readonly api: SiteApi
    public readonly minecraft: ProjectGroupApi

    constructor(api: SiteApi) {
        this.api = api
        this.minecraft = new ProjectGroupApi("minecraft", this.api)
    }

    async getProjects(): Promise<RawProject[]> {
        const result = await this.api.get("projects")
        if (result.ok) {
            return await result.json() as RawProject[]
        } else {
            console.log(`Failed to get data for projects: ${result.status}: ${await result.text()}`)
            return []
        }
    }

    async getProject(project : string) {
        const result = await this.api.get(`project/${project}`)
        if (result.ok) {
            return await result.json() as ProjectBase
        } else {
            if (result.status != 404) console.log(`Failed to find project: ${result.status}: ${await result.text()}`)
            return
        }
    }

    async getDownloadLink(project: string, file: string) {
        const result = await this.api.get(`project/${project}/download/${file}`)
        const data = await result.text()
        if (result.ok) {
            return data
        } else {
            console.log(`Failed to get download url: ${result.status}: ${data}`)
        }
    }

    async deleteProject(project: string): Promise<boolean> {
        const result = await this.api.delete(`project/${project}`)
        if (result?.ok) {
            return true
        } else if (result != undefined) {
            console.log(`Failed to get delete project: ${result.status}: ${await result.text()}`)
        }
        return false
    }

    async deleteFie(file: string): Promise<boolean> {
        const result = await this.api.delete(`project/file/${file}`)
        if (result?.ok) {
            return true
        } else if (result != undefined) {
            console.log(`Failed to get delete file: ${result.status}: ${await result.text()}`)
        }
        return false
    }

}
