import CryptoJS from "crypto-js";
import { db } from "$lib/postgres";
import { ENCRYPTION_KEY } from "$env/static/private";

export async function load({ params, cookies }: {
    params: {
        id: string
    },
    cookies: {
        get: (name: string) => string
    }
}) {
    try {
        const chat = await db`SELECT id, name, messages, members, owner FROM yasss_chats WHERE id = ${params.id};`;

        if (chat) {
            chat[0].messages = await Promise.all(await chat[0].messages.map(async (msg: {
                username: string;
                text: string;
            }) => {
                const author = await db`SELECT id, username, profile, bio FROM yasss_users WHERE id = ${msg.username};`;
                const bytes = CryptoJS.AES.decrypt(msg.text, ENCRYPTION_KEY);
    
                return {
                    ...author[0],
                    text: bytes.toString(CryptoJS.enc.Utf8)
                }
            }));
    
            chat[0].members = await Promise.all(await chat[0].members.map(async (m: string) => {
                const member = await db`SELECT id, username, profile, bio FROM yasss_users WHERE id = ${m};`;
    
                return member[0];
            }));
    
            if (chat[0].members.length == 2) {
                const other = await db`SELECT username, profile, bio FROM yasss_users WHERE id = ${chat[0].members.filter((m: {
                    id: string;
                }) => m.id !== cookies.get("token"))[0].id};`;
    
                return {
                    ...chat[0],
                    ...other[0],
                    type: "dm"
                }
            } else {
                return {
                    ...chat[0],
                    type: "group"
                }
            }
        } else {
            return {
                error: "Server not found",
                messages: []
            }
        }
    } catch (e) {
        return {
            error: "Server not found",
            messages: []
        }
    }
}