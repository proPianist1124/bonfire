import { db } from "$lib/postgres";

export async function load({ cookies }: {
    cookies: {
        get: (name: string) => string
    }
}) {
    try {
        const user = await db`SELECT joined FROM bonfire_users WHERE id = ${cookies.get("token")};`;

        const chats = await Promise.all(user[0].joined.map(async (u: string) => {
            const chat = await db`SELECT id, members, name, image FROM bonfire_chats WHERE id = ${u};`;

            if (chat[0].members.length == 2) {
                const other = await db`SELECT username, profile FROM bonfire_users WHERE id = ${chat[0].members.filter((m: string) => m !== cookies.get("token"))[0]};`;

                return {
                    id: chat[0].id,
                    ...other[0],
                    type: "dm"
                }
            } else {
                return {
                    ...chat[0],
                    type: "group"
                }
            }
        }));

        return {
            chats
        }
    } catch (e) {
        return {
            error: "User not found"
        }
    }
}