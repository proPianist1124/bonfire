<script>
    import "./app.css";
    import { navigating } from "$app/stores";

    export let data;
</script>

<a
    href="/"
    class="flex justify-center font-bold text-4xl mb-5 duration-100 hover:text-gray-500"
>
    yasss
</a>
<main
    class="bg-gray-50 max-w-[650px] {data.user ? "h-[75vh]": ""} overflow-auto block m-auto p-5 rounded-md"
>
    {#if $navigating}
        <p class="font-bold text-3xl text-center mt-10">Loading...</p>
    {:else}
        <slot />
    {/if}
</main>
{#if data.user}
    <main
        class="max-w-[650px] bg-gray-100 block m-auto mt-5 rounded-full p-2 flex items-center"
    >
        <p class="font-medium text-lg flex items-center">
            <img
                src="/profiles/default.png"
                class="w-9 h-9 rounded-full mr-1 border border-gray-300"
                alt="profile pic"
            />
            {data.user.username}
        </p>
        <a href="/api/auth/logout" class="ml-auto">
            <button class="secondary p-2 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                    /><polyline points="16 17 21 12 16 7" /><line
                        x1="21"
                        x2="9"
                        y1="12"
                        y2="12"
                    /></svg
                >
            </button>
        </a>
    </main>
{/if}
