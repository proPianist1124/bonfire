import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handler } from "../build/handler.js";
import { db } from "./postgres.js";

const port = 4173;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", async socket => {
    socket.on("message", async msg => {
        const user = await db`SELECT profile, username FROM yasss_users WHERE id = ${msg.username};`;

        io.emit(`message_${msg.server}`, {
            // broadcast message back to all clients
            profile: user[0].profile,
            username: user[0].username,
            text: msg.text
        });
    });
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port, () => { 
    console.log(`Production build running on ::${port}`);
});