<script lang="ts">
    import { io } from "socket.io-client";
    import Error from "../../+error.svelte";
    import { showDialog } from "$lib/dialog";

    export let data: {
        id: string;
        name: string;
        type: string;
        username: string;
        owner: string;
        messages: Array<{
            text: string;
            username: string;
        }>;
        members: Array<{
            username: string;
            profile: string;
            bio: string;
        }>;
        user: {
            id: string;
            username: string;
        };
        error: string;
    };

    const socket = io();

    let error: string = "";

    let messages: Array<{
        text: string;
        username: string;
    }> = data.messages ? [...data.messages] : [];

    // listen for messages
    socket.on(data.id, (message: { text: string; username: string }) => {
        messages = [message, ...messages];
    });

    async function send(e: any) {
        if (e.target.message.value == "") {
            error = "Cannot send an empty message.";
            return;
        } else {
            error = "";
        }

        messages = [
            {
                text: e.target.message.value,
                username: data.user?.username,
            },
            ...messages,
        ];

        const message: {
            id: string;
            text: string;
            username: string;
        } = {
            id: data.id,
            text: e.target.message.value,
            username: data.user?.id,
        };

        socket.emit("message", message);

        await fetch("/api/chat/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        });

        e.target.message.value = "";
    }

    async function remove(id: string) {
        console.log("removing", id);
    }
</script>

<svelte:head>
    <title
        >{data.error
            ? "404 / yasss"
            : data.type == "dm"
              ? data.username
              : `${data.name} / yasss`}</title
    >
</svelte:head>

{#if data.error}
    <Error
        error={{
            code: 404,
            message: "Chat not found",
        }}
    />
{:else}
    <h3 class="flex items-center mb-5 font-medium bg-gray-100 p-5 rounded-md">
        {data.type == "dm" ? data.username : data.name}
        <span class="block ml-auto"> 🔥5 </span>
        <button on:click={() => showDialog("settings")} class="secondary ml-2">
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
                ><path d="M20 7h-9" /><path d="M14 17H5" /><circle
                    cx="17"
                    cy="17"
                    r="3"
                /><circle cx="7" cy="7" r="3" /></svg
            >
        </button>
    </h3>
    <div id="messages" class="overflow-auto h-[50vh] mb-5">
        {#if messages && messages.length !== 0}
            {#each messages as message, i}
                <div
                    class="block text-lg {messages[i + 1]?.username ==
                    message.username
                        ? ''
                        : 'mb-3'}"
                >
                    <span
                        class="block {data.user?.username == message.username
                            ? 'text-red-500'
                            : 'text-blue-500'} font-medium"
                        >{data.user?.username == message.username
                            ? messages[i - 1]?.username == message.username
                                ? ""
                                : "me"
                            : messages[i - 1]?.username == message.username
                              ? ""
                              : message.username}</span
                    >
                    <div
                        class="border-l-2 {data.user?.username ==
                        message.username
                            ? 'border-l-red-500'
                            : 'border-l-blue-500'} p-2 w-fit"
                    >
                        {message.text}
                    </div>
                </div>
            {/each}
        {:else}
            <p class="text-center text-gray-400">No messages yet</p>
        {/if}
    </div>
    <form
        on:submit|preventDefault={send}
        autocomplete="off"
        class="flex items-center"
    >
        <input name="message" placeholder="What's happening?!" class="w-full" />
        <button type="submit" class="ml-2">Send</button>
    </form>
    <p class="text-red-600 mt-2">{error}</p>
{/if}
<dialog id="settings">
    <h2>Settings</h2>
    <div class="button-container">
        <button on:click={() => showDialog("invite")} class="secondary"
            >Invite</button
        >
        <button on:click={() => showDialog("members")} class="secondary"
            >Members</button
        >
        {#if data.owner == data.user.id}
            <button on:click={() => showDialog("settings")} class="secondary"
                >More</button
            >
        {/if}
    </div>
    <hr class="my-5" />
    <h3 class="text-red-500">Danger</h3>
    <div class="button-container">
        {#if data.owner == data.user.id}
            <button class="danger">Purge</button>
            <button class="danger">Delete</button>
        {:else}
            <button class="danger">Leave</button>
        {/if}
    </div>
</dialog>
<dialog id="invite">
    <button on:click={() => showDialog("settings")} class="secondary"
        >&lt;</button
    >
    <h2 class="mt-5">Invite</h2>
    <p class="text-gray-400 mb-5">Invite your friends to this chat</p>
    <form class="flex items-center w-full">
        <input
            type="text"
            name="friend"
            placeholder="Your friend's username..."
            class="w-full"
        />
        <button class="secondary ml-2">Add</button>
    </form>
</dialog>
<dialog id="members">
    <button on:click={() => showDialog("settings")} class="secondary"
        >&lt;</button
    >
    <h2 class="my-5">Members</h2>
    {#if data.members}
        {#each data.members as member}
            <a
                href="/u/@{member.username}"
                class="text-lg border-2 border-gray-200 rounded-md p-5 flex items-center mb-3 duration-100 hover:border-gray-300"
            >
                <img
                    src={member.profile}
                    class="w-[30px] h-[30px] rounded-full mr-1 border border-gray-300"
                    alt={member.username}
                />
                {member.username}
                {#if member.username != data.user.username}
                    <button
                        on:click|preventDefault={() => remove(member.username)}
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
                            /><path
                                d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                            /><line x1="10" x2="10" y1="11" y2="17" /><line
                                x1="14"
                                x2="14"
                                y1="11"
                                y2="17"
                            /></svg
                        >
                    </button>
                {/if}
            </a>
        {/each}
    {/if}
</dialog>
