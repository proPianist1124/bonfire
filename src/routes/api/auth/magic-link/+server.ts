import { json, redirect } from "@sveltejs/kit";
import { db } from "$lib/postgres";
import { send } from "$lib/resend";

export async function GET({ url, cookies }) {
    if (url.searchParams.get("code")) {
        try {
            const user = await db`SELECT id FROM bonfire_users WHERE id = ${url.searchParams.get("code")};`;

            if (user.length !== 0) {
                cookies.set("token", user[0].id, {
                    path: "/"
                });
            } else {
                return new Response("User does not exist.");
            }
        } catch (e) {
            return new Response("An error occured");
        }
    }
    redirect(302, "/");
}

export async function POST({ request }: {
    request: Request;
}) {
    const formData = await request.json();

    try {
        const user = await db`SELECT id, email FROM bonfire_users WHERE email = ${formData.email};`;

        if (user.length === 0) return json({
            error: "User does not exist with that email."
        });

        await send({
            from: "Bonfire",
            to: user[0].email,
            subject: "Login Requested",
            body: `Click <a href="http://localhost:3000/api/auth/magic-link?code=${user[0].id}">this magic link</a> to log in.`
        });

        return json({
            success: "We have sent a magic link to your email."
        });
    } catch (e) {
        return json({
            error: "An error occurred."
        });
    }
}