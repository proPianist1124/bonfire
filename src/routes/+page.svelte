<script>
    import { showDialog } from "$lib/dialog";
    import Alert from "$lib/ui/alert.svelte";
    import { PUBLIC_DISCORD_REDIRECT } from "$env/static/public";

    export let data;

    let error = "";
    let success = "";

    async function loginWithEmail(e) {
        error = "";
        success = "";

        const res = await fetch("/api/auth/magic-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: e.target.email.value,
            }),
        }).then((res) => res.json());

        if (res.success) {
            success = res.success;
        } else {
            error = res.error;
        }
    }

    function removeFriend() {
        console.log("removeFriend");
    }
</script>

<svelte:head>
    <title>{!data.error ? "Home / Bonfire" : "Login / Bonfire"}</title>
</svelte:head>

{#if !data.error}
    <h2 class="mb-5 flex items-center">
        Friends
        <a href="/create" class="ml-auto">
            <button class="secondary font-normal">+</button>
        </a>
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
{:else}
    {#if error}
        <Alert>{error}</Alert>
    {/if}
    <h3 class="mb-5 text-center">Wowwwww!! sign in!11</h3>
    <div class="w-6/12 block m-auto">
        <a href={PUBLIC_DISCORD_REDIRECT}>
            <button class="w-full bg-[#5865F2] hover:bg-[#5865F2]/90"
                >Sign In with Discord</button
            >
        </a>
        <p class="text-gray-500 text-center my-2">or</p>
        <form
            on:submit|preventDefault={loginWithEmail}
            autocomplete="off"
            class="w-full flex items-center justify-center"
        >
            <input
                type="email"
                name="email"
                placeholder="email address"
                class="mr-2 w-full"
                required
            />
            <button type="submit">
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
                    ><path d="M6 9h6V5l7 7-7 7v-4H6V9z" /></svg
                >
            </button>
        </form>
        <p class="text-green-500">{success}</p>
    </div>
{/if}
