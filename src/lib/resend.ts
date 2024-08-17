import { Resend } from "resend";
import { RESEND_PRIVATE_KEY } from "$env/static/private";

const resend = new Resend(RESEND_PRIVATE_KEY);

export async function send({
    from,
    to,
    subject,
    body
}: {
    from: string;
    to: string;
    subject: string;
    body: string;
}) {
    await resend.emails.send({
        from: `${from} <bonfire@propianist1124.obl.ong>`,
        to: [to],
        subject,
        html: body,
    });
}