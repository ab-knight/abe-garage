import 'dotenv/config'
import nodemailer from 'nodemailer'

// SMTP transport, configured entirely from environment variables.
// For a free no-signup test inbox, leave SMTP_* unset and set
// ETHEREAL_USER / ETHEREAL_PASS from https://ethereal.email
function buildTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  // Test mode: Ethereal fake inbox
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  })
}

export async function sendOrderTrackingEmail(to, orderHash) {
  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')
  const link = `${frontendUrl}/order/${orderHash}`

  const info = await buildTransporter().sendMail({
    from: process.env.MAIL_FROM || 'Abe Garage <no-reply@abegarage.com>',
    to,
    subject: 'Track your car service order',
    text: `Your car service order has been received.\n\nTrack its progress here:\n${link}`,
    html: `<p>Your car service order has been received.</p><p>Track its progress here: <a href="${link}">${link}</a></p>`,
  })

  // Ethereal prints a preview URL; real SMTP returns a message id
  return nodemailer.getTestMessageUrl(info) || info.messageId
}
