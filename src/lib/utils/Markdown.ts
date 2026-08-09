import {Carta} from "carta-md";
import {attachment} from "@cartamd/plugin-attachment";
import {api, getUploadedUrl} from "$lib/utils/api";
import {code} from "@cartamd/plugin-code";
import {emoji} from "@cartamd/plugin-emoji";

export function getCarta(fileUpload: boolean = false, fileUploadPath: string = "cache/unknown/"): Carta {
    const attachmentExt = attachment({
        async upload(file: File): Promise<string | null> {
            const uploaded = await api.cdn.uploadFile(file, fileUploadPath)
            if (uploaded) {
                return getUploadedUrl(fileUploadPath, file.name)
            } else {
                return null
            }
        }
    })

    // svelte-ignore state_referenced_locally
    const extensionsOpt = fileUpload ? [attachmentExt] : []

    return new Carta({
        sanitizer: (input: string) => input,
        extensions: [code({theme: "dracula"}), emoji(), ...extensionsOpt],
        shikiOptions: {
            themes: ["dracula"],
            langs: ["markdown","java", "kotlin", "typescript", "json", "python", "properties", "bash", "yml"]
        },
        theme: "dracula"
    })
}

