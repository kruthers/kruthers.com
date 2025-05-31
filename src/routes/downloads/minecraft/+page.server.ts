import ProjectGroupApi from "$lib/api/ProjectGroupApi";
import type {MinecraftProject} from "$lib/types/projects/ProjectData";

const service = new ProjectGroupApi("minecraft")

export async function load() {
    const raw = await service.getProjects()
    const data = raw.map(value => value as MinecraftProject)

    return {
        projects: data
    }
}