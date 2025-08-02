import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  // Créer un transporteur
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "teneledou@gmail.com", // Remplacez par votre hôte SMTP
    port: 587, // Port SMTP (587 pour TLS, 465 pour SSL)
    secure: true, // True pour SSL
    auth: {
      user: "teneledou@gmail.com", // Remplacez par votre email
      pass: "ftpc wxat ncwc ukpt", // Remplacez par votre mot de passe
    },
  });

  // Options de l'email
  const mailOptions = {
    from: '"teneledou@gmail.com', // Expéditeur
    to: options.to, // Destinataire
    subject: options.subject, // Sujet
    text: options.text || "HelloWordl !!", // Corps du message en texte brut
    html: options.html,
  };

  // Envoyer l'email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", info.response);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
}
