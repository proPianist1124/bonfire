import { redirect } from "@sveltejs/kit";

export async function GET({ cookies }: {
    cookies: {
        delete: (name: string, path: {
            path: string
        }) => void
    }
}) {
    cookies.delete("token", {
        path: "/"
    });
    redirect(302, "/");
}