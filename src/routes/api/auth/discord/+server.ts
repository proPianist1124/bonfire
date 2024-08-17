import axios from "axios";
import { redirect } from "@sveltejs/kit";
import { v4 as uuid } from "uuid";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT } from "$env/static/private";
import { db } from "$lib/postgres";

export async function GET({ url, cookies }) {
    if (url.searchParams.get("code")) {
        const formData = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: String(url.searchParams.get("code")),
            redirect_uri: DISCORD_REDIRECT
        });

        const output = await axios.post("https://discord.com/api/v10/oauth2/token",
            formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        );

        if (output.data) {
            const access = output.data.access_token;

            const userInfo = await axios.get("https://discord.com/api/v10/users/@me", {
                headers: {
                    "Authorization": `Bearer ${access}`
                }
            });

            const user = await db`SELECT id FROM bonfire_users WHERE email = ${userInfo.data.email};`;

            if (user.length !== 0) {
                cookies.set("token", user[0].id, {
                    path: "/"
                });
            } else {
                const id = uuid();

                await db`INSERT INTO bonfire_users (id, email, username) VALUES (${id}, ${userInfo.data.email}, ${userInfo.data.username});`;

                cookies.set("token", id, {
                    path: "/"
                });
            }

            redirect(302, "/");
        } else {
            return new Response("Invalid code.");
        }
    } else {
        redirect(302, "/");
    }
}