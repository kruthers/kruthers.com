import type { PageLoad } from './$types';
import {api} from "$lib/utils/api";

export const load: PageLoad = async ({ url }) => {
    const searchParams = url.searchParams
    if (!searchParams.has("code")) return { status: 302, redirect: await api.auth.getLink() }

    return {
        code: searchParams.get("code")
    }
}