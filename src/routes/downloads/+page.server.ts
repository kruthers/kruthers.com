import ProjectsApi from "$lib/api/ProjectsApi";

const service = new ProjectsApi()

export async function load() {
    return {
        projects: await service.getProjects()
    }
}