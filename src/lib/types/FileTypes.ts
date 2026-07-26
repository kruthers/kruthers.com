

export type SupportedType = "Folder" | "Uploading" |  "File" | //default 3
    "Image" | "PDF" | "Archive" | "Code" | "Video" | "Audio" | "Markdown" | "Text" | "Java archive" | "JSON" |
    "Gif" | "YAML" | "XML"

export type FileFormatting = {
    name: SupportedType,
    icon: string,
    extensions: string[]
}

export const commonFileTypes: FileFormatting[] = [
    {name: "Image", icon: "mdi:image", extensions: ["png", "jpg", "jpeg", "webp"]},
    {name: "PDF", icon: "mdi:file-pdf", extensions: ["pdf"]},
    {name: "Archive", icon: "mdi:archive", extensions: ["zip", "rar", "7z"]},
    {name: "Code", icon: "mdi:code-braces", extensions: ["js", "ts", "java", "kt", "py", "cs", "cpp", "c", "go", "rb", "swift", "php", "lua", "sql", "html", "css"]},
    {name: "Video", icon: "mdi:video", extensions: ["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm"]},
    {name: "Audio", icon: "mdi:music", extensions: ["mp3", "wav", "ogg", "flac"]},
    {name: "Markdown", icon: "mdi:markdown", extensions: ["md"]},
    {name: "Text", icon: "mdi:file-document", extensions: ["txt"]},
    {name: "Java archive", icon: "mdi:java", extensions: ["jar"]},
    {name: "JSON", icon: "mdi:code-braces-box", extensions: ["json"]},
    {name: "Gif", icon: "mdi:gif", extensions: ["gif"]},
    {name: "YAML", icon: "tdesign:file-yaml-filled", extensions: ["yaml", "yml"]},
    {name: "XML", icon: "mdi:xml", extensions: ["xml"]},
]

const defaultType: FileFormatting = {name: "File", icon: "mdi:file", extensions: ["UNKNOWN"]}

export function findType(fileName: string): FileFormatting {
    const extension = fileName.split(".").pop()?.toLowerCase() ?? "UNKNOWN";
    const type = commonFileTypes.find(type => type.extensions.includes(extension))
    return type ?? defaultType;
}
