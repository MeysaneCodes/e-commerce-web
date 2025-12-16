import EmailTemplate from "@/app/providers/Resend/template_email";
import {Resend} from "resend";
import {randomInt} from "node:crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function send_opt_code({toEmail, fromEmail,digits_code}:{toEmail:string, fromEmail:"Resend <onboarding@resend.dev>", digits_code:number}) {

    console.log("sented to " + toEmail);
    try {
        const {data, error} =  await resend.emails.send({
            to: toEmail,
            from: fromEmail,
            subject: "Sie haben einen Verifizierungscode angefordert",
            react: <EmailTemplate inCode={digits_code}/>
        });

        if (error) {
            return { error , status: 500 };
        }


        return {data: data};


    }catch (e){
        console.error(e);
        return { e , status: 500 };
    }

}

