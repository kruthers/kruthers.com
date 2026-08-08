import type {ResolvedPathname} from "$app/types";

const projectPages: ProjectPage[] = [
    {
      name: "All Projects",
      path: "/downloads",
      subPaths: []
    },
    {
        name: "Minecraft",
        path: "/downloads/minecraft",
        subPaths: [
            {name: "Maps", path: "/downloads/minecraft?type=map", icon: "mdi:map"},
            {name: "Mods", path: "/downloads/minecraft?type=mod", icon: "mdi:gear-box"},
            {name: "Plugins", path: "/downloads/minecraft?type=plugin", icon: "material-symbols:power-plug-rounded"},
            {name: "Datapacks", path: "/downloads/minecraft?type=datapack", icon: "mdi:box-variant"}
        ]
    }
]

export default projectPages

export type subProjectPage = {
    name: string,
    path: ResolvedPathname,
    icon?: string
}

export type ProjectPage = {
    name: string,
    path: ResolvedPathname,
    subPaths: subProjectPage[]
}