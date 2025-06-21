import type { PageLoad } from './$types';
import {api} from "$lib/systems/api";

export const load: PageLoad = ({ params }) => {
    const version = params.slug

};