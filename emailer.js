const { MailtrapClient } = require("mailtrap");

const TOKEN = "2e07812876b4875ee5475bdb3fc252dd";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

 const sender = {
   email: "info@vonceescalada.com",
   name: "V11 Club de Escalada",
 };

const sendMail = (recipients, subject, text, category) => {
    client
  .send({
    from: sender,
    to: recipients,
    subject: subject,
    html: text,
    category: category,
  })
  .then(console.log, console.error);
}

exports.sendMail = (recipients, subject, text, category, date) => sendMail(recipients, subject, text, category)