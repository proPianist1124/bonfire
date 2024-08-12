<script>
    import { page } from "$app/stores";

    export let error;
</script>

<svelte:head>
    <title>{error ? "404" : $page.status} / Bonfire</title>
</svelte:head>

<div class="text-center">
    <h2>
        {error ? error.code : $page.status}
    </h2>
    <h3>
        {error ? error.message : $page.error?.message}
    </h3>
    <a href="/">
        <button class="mt-5">Go Back</button>
    </a>
</div>