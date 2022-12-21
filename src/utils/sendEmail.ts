import { get } from 'lodash'
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { EmailTemplate } from 'typings/enums'
import { IEmailConfig, IRequest } from 'typings/interfaces'

const templates = require('../emails/emails.json')
const mjml = require('mjml')

const ns: string = 'utils/sendEmail'

export default async (req: IRequest, emailConfig: IEmailConfig) => {
    const {
        logger,
        language,
        config: {
            email: {
                service,
                port,
                auth: { user, pass }
            },
            https,
            security: { systemEmail },
            general: { appName }
        }
    } = req
    const {
        subject = '',
        from = `${appName} <${systemEmail}>`,
        to = [],
        template = EmailTemplate.DEFAULT,
        htmlVariables = {}
    } = emailConfig

    try {
        const transporter: Mail = nodemailer.createTransport({
            service,
            host: service,
            port,
            tls: {
                rejectUnauthorized: false
            },
            secure: https,
            auth: { user, pass }
        })

        const mjmlTemplate = get(templates, `${language}.${template}`, '')

        let templateHTML = mjml(mjmlTemplate).html

        Object.keys(htmlVariables).forEach((key: any) => {
            const re = new RegExp(`{${key}}`, 'g')
            // @ts-ignore
            templateHTML = templateHTML.replace(re, htmlVariables[key])
        })

        templateHTML = templateHTML.replace(/{__APP_NAME__}/g, appName)

        const sendEmailOptions: Mail.Options = {
            from,
            to,
            subject: `${appName} - ${subject}`,
            html: templateHTML
        }

        logger.info(
            `${ns} EmailOptions: ${JSON.stringify({
                from,
                to,
                subject,
                htmlVariables:
                    process.env.NODE_ENV !== 'production' ? htmlVariables : ''
            })}`
        )

        const info = await transporter.sendMail(sendEmailOptions)
        logger.info(`${ns} send: Email success: ${JSON.stringify(info)}`)
    } catch (error) {
        logger.error(`${ns} ${error}`)
    }
}
