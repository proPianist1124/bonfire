<script>
    import "./app.css";
    import { navigating } from "$app/stores";

    export let data;
</script>

<a
    href="/"
    class="block font-bold text-4xl mb-5 duration-100 hover:text-gray-500 w-fit m-auto"
>
    Bonfire
</a>
<main class="bg-gray-50 max-w-[650px] block m-auto p-5 rounded-md">
    {#if $navigating}
        <p class="font-bold text-3xl my-10 text-center mt-10">Loading...</p>
    {:else}
        <slot />
    {/if}
</main>
{#if data.user}
    <main
        class="max-w-[650px] bg-gray-50 block m-auto mt-5 rounded-full p-2 flex items-center"
    >
        <p class="font-medium text-xl flex items-center">
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
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                    /><circle cx="12" cy="12" r="3" /></svg
                >
            </button>
        </a>
    </main>
{/if}
