import { db } from "$lib/postgres";

export async function POST({ request, cookies }: {
    request: Request,
    cookies: {
        get: (name: string) => string
    }
}) {
    const formData = await request.json();

    try {
        const chat = await db`SELECT id, owner FROM bonfire_chats WHERE id = ${formData.id};`;

        if (cookies.get("token") == chat[0].owner) {
            await db`UPDATE bonfire_chats SET messages = '[]' WHERE id = ${chat[0].id};`;
        }

        return new Response("Success");
    } catch (e) {
        return new Response("An error occured.", { status: 500 });
    }
}