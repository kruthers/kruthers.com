import type { LayoutLoad } from './$types';
import {api} from "$lib/systems/api";

export const load: LayoutLoad = ({ params }) => {
    const data = api.projects.getProject(params.slug)
    const files = api.projects.getFiles(params.slug)

    return {
        id: params.slug,
        project: data,
        files: files
    };
};