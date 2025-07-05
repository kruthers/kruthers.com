import type {ProjectBase, RawProject} from "$lib/types/projects/ProjectData";
import {SiteApi} from "$lib/api/SiteApi";
import ProjectGroupApi from "$lib/api/ProjectGroupApi";
import type {BaseFile} from "$lib/types/projects/FileData";
import {sendToast} from "$lib/store/Toasts";

export default class ProjectsApi {
    private readonly api: SiteApi
    private readonly groups: ProjectGroupApi[] = []

    public readonly minecraft: ProjectGroupApi

    constructor(api: SiteApi) {
        this.api = api
        this.minecraft = new ProjectGroupApi("minecraft", this.api)

        //array of all the groups
        this.groups.push(this.minecraft)
    }

    getGroup(group: string): ProjectGroupApi | undefined {
        const groups = this.groups.filter(g => g.group === group)
        if (groups.length > 0) {
            return groups[0]
        } else {
            return undefined
        }
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

    async getFiles(project: string) {
        const data = await this.getFilesRaw(project)
        if (data == null) {
            return []
        } else {
            return data as BaseFile[]
        }
    }

    async getFilesRaw(project: string) {
        const result = await this.api.get(`project/${project}/files`)
        if (result.ok) {
            return await result.json() as unknown[]
        } else {
            if (result.status != 404) console.log(`Failed to find project files: ${result.status}: ${await result.text()}`)
            return []
        }
    }

    async download(project: string, file: string) {
        const result = await this.api.get(`project/${project}/download/${file}`)
        if (!result.ok) {
            console.log(`Failed Download file: ${result.status}: ${await result.text()}`)
        }
    }

    async updateFileLink(project: string, file: string, link: string) {
        const result = await this.api.put(`project/${project}/file/${file}`, link, "text/plain")
        if (result?.ok == true) {
            return true
        }
        if (result == undefined) {
            console.log("Unauthorized to update file link")
        } else {
            console.log(`Failed to update file: ${result.status}: ${await result.text()}`)
        }
        return false
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
            sendToast({
                message: "File deleted",
                type: "info"
            })
            return true
        } else if (result != undefined) {
            console.log(`Failed to get delete file: ${result.status}: ${await result.text()}`)
            sendToast({
                message: "Failed to delete file",
                type: "error"
            })
        }
        return false
    }

}
