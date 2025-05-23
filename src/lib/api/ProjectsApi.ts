import type {ProjectBase, RawProject} from "$lib/types/projects/ProjectData";
import BasicApi from "$lib/api/BasicApi";

export default class ProjectsApi extends BasicApi {

    async getProjects() {
        const result = await this.get("projects")
        if (result.ok) {
            return await result.json() as RawProject[]
        } else {
            console.log(`Failed to get data for projects: ${result.status}: ${await result.text()}`)
            return []
        }
    }

    async getProject(project : string) {
        const result = await this.get(`project/${project}`)
        if (result.ok) {
            return await result.json() as ProjectBase
        } else {
            if (result.status != 404) console.log(`Failed to find project: ${result.status}: ${await result.text()}`)
            return
        }
    }

    async getDownloadLink(project: string, file: string) {
        const result = await this.get(`project/${project}/download/${file}`)
        const data = await result.text()
        if (result.ok) {
            return data
        } else {
            console.log(`Failed to get download url: ${result.status}: ${data}`)
        }
    }

    async deleteProject(project: string): Promise<boolean> {
        const result = await this.delete(`project/${project}`)
        if (result?.ok) {
            return true
        } else if (result != undefined) {
            console.log(`Failed to get delete project: ${result.status}: ${await result.text()}`)
        }
        return false
    }

    async deleteFie(file: string): Promise<boolean> {
        const result = await this.delete(`project/file/${file}`)
        if (result?.ok) {
            return true
        } else if (result != undefined) {
            console.log(`Failed to get delete file: ${result.status}: ${await result.text()}`)
        }
        return false
    }

}
