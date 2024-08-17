<script>
    import Alert from "$lib/ui/alert.svelte";

    let error = "";

    async function createServer(e) {
        error = "";

        if (e.target.name.value.length < 4) {
            error = "Name must be at least 4 characters";
        } else {
            await fetch("/api/chat/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                }),
            });
        }
    }
</script>

<svelte:head>
    <title>New Chat / Bonfire</title>
</svelte:head>

{#if error}
    <Alert>{error}</Alert>
{/if}
<h2>New Chat</h2>
<p class="text-gray-400">It's lonely here...</p>
<form on:submit|preventDefault={createServer} autocomplete="off">
    <input
        type="text"
        name="name"
        placeholder="chat name..."
        class="w-full my-5"
    />
    <button type="submit" class="w-full">Create</button>
</form>
