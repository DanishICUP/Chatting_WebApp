// import { resendClient, sender } from "../lib/resend.js"
// import { createWelcomeEmailTemplate } from "./emailTemplates.js"


// export const sendWelcomeEmail = async (email, name, clientURL) => {
//     const { data, error } = await resendClient.emails.send({
//         from: `${sender.name} <${sender.email}>`,
//         to: email,
//         subject: 'welcome to my chatify app ',
//         html: createWelcomeEmailTemplate(name, clientURL),
//     })

//     if (error) {
//         return console.error({ error });
//     }else{
//         console.log("welcome email send successfully", data)
//     }
// }