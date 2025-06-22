import {api} from "$lib/utils/api";
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const link = api.auth.getLink()

    return {
        discordRedirect: link
    }
}
