import { sveltekit } from "@sveltejs/kit/vite";
import { Server } from "socket.io";
import { defineConfig } from "vite";
import { db } from "./production/postgres.js";

const webSocketServer = {
	name: "webSocketServer",
	configureServer(server: any) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		io.on("connection", socket => {
			socket.on("message", async (msg: {
				id: string;
				text: string;
				username: string;
			}) => {
				const author = await db`SELECT username FROM bonfire_users WHERE id = ${msg.username};`;
				socket.broadcast.emit(msg.id, {
					text: msg.text,
					username: author[0].username
				});
			});
		});
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
})
