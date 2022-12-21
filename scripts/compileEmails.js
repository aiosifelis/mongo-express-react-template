const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { identity } = require('lodash')

async function main() {
    try {
        const emailsPath = './src/emails'
        const json = {}
        const languages = ['el-GR', 'en-GB']

        languages.forEach((language) => {
            const languagePath = `${emailsPath}/${language}`
            const files = readdirSync(languagePath)

            json[language] = {}

            files.forEach((file) => {
                const contents = readFileSync(
                    `${languagePath}/${file}`,
                    'utf-8'
                )
                const [filename] = file.split('.')
                json[language][filename] = contents
            })
        })

        writeFileSync(
            `${emailsPath}/emails.json`,
            JSON.stringify(json, null, 4),
            'utf-8'
        )
    } catch (error) {
        console.error(error)
    }
}

main()
