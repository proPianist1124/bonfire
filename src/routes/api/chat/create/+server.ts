export async function POST({ request, cookies }: {
    request: Request;
    cookies: {
        get: (name: string) => string
    }
}) {
    const formData = await request.json();

    console.log(formData, cookies.get("token"));

    return new Response("Success");
}