import type {MinecraftProject, ProjectBase} from "$lib/types/projects/ProjectData";
import { isModded, isPluginLoader } from "$lib/utils/MinecraftUtils";

export function checkMCProject(input: ProjectBase, type: MinecraftGroup): boolean {
    if (input.group != "MINECRAFT") return false
    const project = input as MinecraftProject
    switch (type) {
        case "all": return true
        case "map": return project.type == "MAP"
        case "plugin": {
            const checked = project.platforms.filter( value => isPluginLoader(value))
            return checked.length > 0 && project.type == "JAR"
        }
        case "mod": {
            const checked = project.platforms.filter( value => isModded(value))
            return checked.length > 0 && project.type == "JAR"
        }
        case "datapack": return project.type == "DATAPACK"
    }
}

export function formatFileDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
}

