
import nodemailer from 'nodemailer'

class EmailService {
    async sendEmail(email: string, phoneNumber: string) {
        const transport = nodemailer.createTransport({
            host: 'salvy_mail',
            port: 1025
        });

        transport.sendMail({
            from: 'Damaso Junio <damaso.brasileo@salvy.com>',
            to: email,
            subject: 'Sua nova linha Salvy',
            html: `
            <h1>Sua nova linha telefonica foi criada!</h1>
            <p>Seu novo numero é: ${phoneNumber}</p>
            `
        })

        console.log('Email enviado')
    }
}

export const emailService = new EmailService()