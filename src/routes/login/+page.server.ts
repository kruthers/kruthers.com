import {api} from "$lib/systems/api";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const link = api.auth.getLink()

    return {
        discordRedirect: link
    }
}
