import CryptoJS from "crypto-js";
import { db } from "$lib/postgres";
import { PRIVATE_CRYPTO_KEY } from "$env/static/private";

export async function POST({ request }: {
    request: Request
}) {
    const formData = await request.json();

    const chat = await db`SELECT id, messages FROM yasss_chats WHERE id = ${formData.message.id};`;

    delete formData.message.id;

    formData.message.text = CryptoJS.AES.encrypt(formData.message.text.replaceAll(`"`, `\"`), PRIVATE_CRYPTO_KEY).toString();

    await db`UPDATE yasss_chats SET messages = ${[formData.message, ...chat[0].messages]} WHERE id = ${chat[0].id};`;

    return new Response("Message saved");
}