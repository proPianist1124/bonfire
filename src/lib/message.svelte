<script lang="ts">
    import { showDialog } from "./dialog";

    export let messages: Array<{
        text: string;
        username: string;
    }>;
    export let message;
    export let username;
    export let i;

    let showButton: boolean = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    on:mouseover={() => (showButton = true)}
    on:mouseleave={() => (showButton = false)}
    class="block text-lg {messages[i + 1]?.username == message.username
        ? ''
        : 'mb-3'}"
>
    <span
        class="block {username == message.username
            ? 'text-red-500'
            : 'text-blue-500'} font-medium"
        >{username == message.username
            ? messages[i - 1]?.username == message.username
                ? ""
                : "me"
            : messages[i - 1]?.username == message.username
              ? ""
              : message.username}</span
    >
    <div
        class="border-l-2 duration-100 hover:bg-gray-200 p-2 w-full flex items-center rounded-r-md {username ==
        message.username
            ? 'border-l-red-500'
            : 'border-l-blue-500'}"
    >
        {message.text}
        {#if showButton}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => showDialog(message.message_id)} class="ml-auto text-gray-400 cursor-pointer duration-100 hover:text-green-500">
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
                    ><circle cx="11" cy="11" r="8" /><path
                        d="m21 21-4.3-4.3"
                    /></svg
                >
            </div>
        {/if}
    </div>
</div>
<dialog id={message.message_id}>
    <h3>{message.text}</h3>
</dialog>