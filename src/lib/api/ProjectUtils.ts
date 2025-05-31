import type {MinecraftProject} from "$lib/types/projects/ProjectData";
import {isModded, isPluginLoader, MinecraftType} from "$lib/types/projects/MinecraftData";

export function checkMCProject(project: MinecraftProject, type: string): boolean {
    if (type === "map") {
        return project.type == MinecraftType.MAP
    } else if (type == "datapack") {
        return project.type == MinecraftType.DATAPACK
    } else if (type == "mod") {
        const checked = project.platforms.filter( value => isModded(value))
        return checked.length > 0 && project.type == MinecraftType.JAR
    } else if (type == "plugin") {
        const checked = project.platforms.filter( value => isPluginLoader(value))
        return checked.length > 0 && project.type == MinecraftType.JAR
    }
    return false
}
