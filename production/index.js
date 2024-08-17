import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handler } from "../build/handler.js";
import { db } from "./postgres.js";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", socket => {
    socket.on("message", async (msg) => {
        const author = await db`SELECT username FROM bonfire_users WHERE id = ${msg.username};`;
        socket.broadcast.emit(msg.id, {
            type: "message",
            text: msg.text,
            username: author[0].username
        });
    });

    socket.on("purge", (id) => {
        socket.broadcast.emit(`purge_${id}`, true);
    });
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port, () => { 
    console.log(`Production build running on ::${port}`);
});