import { db } from "$lib/postgres";

export async function POST({ request }: {
    request: Request
}) {
    const formData = await request.json();
    
    console.log(formData);
}