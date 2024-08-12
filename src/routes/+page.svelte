<script>
    import { showDialog } from "$lib/dialog";
    import { PUBLIC_DISCORD_REDIRECT } from "$env/static/public";

    export let data;

    function removeFriend() {
        console.log("removeFriend");
    }

    function createServer() {
        console.log("createServer");
    }
</script>

<svelte:head>
    <title>Home / Bonfire</title>
</svelte:head>

{#if !data.error}
    <h2 class="mb-5 flex items-center">
        Friends
        <button
            on:click={() => showDialog("new")}
            class="secondary font-normal ml-auto">+</button
        >
    </h2>
    {#each data.chats as chat}
        <a href="/chat/{chat.id}">
            <div
                class="flex items-center border-2 border-gray-100 rounded-md p-5 cursor-pointer text-lg duration-100 hover:border-gray-200"
            >
                {#if chat.type == "dm" || (chat.type == "group" && chat.image)}
                    <img
                        src={chat.type == "dm" ? chat.profile : chat.image}
                        class="rounded-full w-9 h-9 mr-1 border border-gray-300"
                        alt="test"
                    />
                {:else}
                    <div
                        class="rounded-full w-7 h-7 mr-1 bg-gray-200 flex items-center justify-center"
                    >
                        {chat.name[0].toUpperCase()}
                    </div>
                {/if}
                <p class="font-medium text-xl">
                    {chat.type == "dm" ? chat.username : chat.name}
                </p>
                <button
                    on:click|preventDefault={removeFriend}
                    type="button"
                    class="ghost ml-auto"
                >
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
                        ><path d="M3 6h18" /><path
                            d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                        /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line
                            x1="10"
                            x2="10"
                            y1="11"
                            y2="17"
                        /><line x1="14" x2="14" y1="11" y2="17" /></svg
                    >
                </button>
            </div>
        </a>
    {/each}
    <dialog id="new">
        <h2>New Chat</h2>
        <p class="text-gray-400">It's lonely here...</p>
        <form on:submit|preventDefault={createServer} autocomplete="off">
            <input placeholder="chat name..." class="w-full my-5" />
            <button type="submit" class="w-full">Create</button>
        </form>
    </dialog>
{:else}
    <h3 class="mb-5 text-center">Wowwwww!! sign in!11</h3>
    <a href={PUBLIC_DISCORD_REDIRECT}>
        <button class="block m-auto bg-[#5865F2] hover:bg-[#5865F2]/90"
            >Sign In with Discord</button
        >
    </a>
{/if}
