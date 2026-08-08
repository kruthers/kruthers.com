import {getContext, setContext} from "svelte";
import type {ProjectBase} from "$lib/types/projects/ProjectData";

const PROJECT_PAGE_CONTEXT = Symbol("project-page-context");

export type ProjectPageContext = {
    project: ProjectBase
}

export function setProjectPageContext(context: ProjectPageContext) {
    return setContext(PROJECT_PAGE_CONTEXT, context);
}

export function getProjectPageContext(): ProjectPageContext {
    return getContext<ProjectPageContext>(PROJECT_PAGE_CONTEXT);
}