import {api} from "$lib/systems/api";
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const link = api.auth.getLink()

    return {
        discordRedirect: link
    }
}
