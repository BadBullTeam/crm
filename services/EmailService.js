import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
class EmailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.smtp_host,
            port: process.env.smtp_port,
            secure: false,
            auth: {
                user: process.env.smtp_user,
                pass: process.env.smtp_password
            }
        })
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.smtp_user,
            to,
            subject: 'Активация аккаунта' + process.env.api_url,
            text: '',
            html: 
            `
                 <div>
                    <h1> Для активации передийте по ссылке </h1>
                    <a href="${link}">${link}</a>
                 </div>
                
            `
        })
    }
}
export default new EmailService();