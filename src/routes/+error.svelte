<script>
    import { page } from '$app/state';
</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">{page.status}</h1>
            <p class="py-6">
                {page.error.message}
            </p>
            <a role="button" class="btn btn-error" href="/">Return Home</a>
        </div>
    </div>
</div>