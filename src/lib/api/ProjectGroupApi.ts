/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicApi from "$lib/api/BasicApi";
import type {ProjectBase} from "$lib/types/projects/ProjectData";

export default class ProjectGroupApi extends BasicApi {
    private readonly group: string
    private readonly path: string

    constructor(group: string) {
        super()
        this.group = group
        this.path = "projects/${this.group}"
    }

    override async get(path: string): Promise<Response> {
        return super.get(`${this.path}/${path}`);
    }

    override async post(path: string, body: never) {
        return super.post(`${this.path}/${path}`, body)
    }

    async getProjects() {
        const result = await this.get("list")
        if (result.ok) {
            return await result.json() as any[]
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

    async getVersions(project : string) {
        const result = await this.get(`${project}/files`)
        if (result.ok) {
            return await result.json() as ProjectBase
        } else {
            if (result.status != 404) console.log(`Failed to find project: ${result.status}: ${await result.text()}`)
            return
        }
    }

}
