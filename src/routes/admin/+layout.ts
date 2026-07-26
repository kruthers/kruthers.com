import {api} from "$lib/utils/api";
import type {LayoutLoad} from "./$types";

export const load: LayoutLoad = async () => {
    const isAuth = await api.auth.isValid()
    return { authenticated: isAuth }
}
