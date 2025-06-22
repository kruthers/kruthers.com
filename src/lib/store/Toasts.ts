import { writable} from "svelte/store";

export type Toast = {
    id?: number;
    message: string;
    type?: "info" | 'success' | 'warning' | 'error';
    duration?: number;
}

const toasts = writable<Toast[]>([]);

export function sendToast(toast: Toast) {
    const id = Date.now();
    const fullToast = { ...toast, id };
    toasts.update((t) => [...t, fullToast]);

    setTimeout(() => {
        toasts.update((t) => t.filter((x) => x.id !== id));
    }, toast.duration ?? 5000);
}

export default toasts;
