import { redirect } from "@sveltejs/kit"
import { db } from "$lib/postgres";

export async function load({ cookies, url }: {
    cookies: {
        get: (name: string) => string
    }
    url: { pathname: string }
}) {
    try {
        const user = await db`SELECT * FROM bonfire_users WHERE id = ${cookies.get("token")};`;

        return {
            user: user[0]
        }
    } catch (e) {
        if (url.pathname == "/" || url.pathname == "/api/auth/magic-link") {
            return {
                error: "User not found"
            }
        } else {
            redirect(302, "/");
        }
    }
}