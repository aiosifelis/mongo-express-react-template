import { Client } from 'basic-ftp'
import config from 'config/server'
import { Readable } from 'stream'
import { Logger } from 'winston'

const ns: string = 'utils/ftp'
export default async (logger: Logger) => {
    const { ftp } = config

    const client = new Client()

    client.ftp.verbose = true

    logger.info(`${ns} Connecting to FTP: ${JSON.stringify(ftp)}`)

    client.trackProgress((info) => {
        logger.info(`${ns} TrackProcess ${JSON.stringify(info)}`)
    })

    await client.access(ftp)

    logger.info(`${ns} FTPClient connected`)

    return {
        async upload(from: Buffer, name: string) {
            const readable = new Readable()
            readable._read = () => {}
            readable.push(from)
            readable.push(null)

            await client.ensureDir(ftp.path)

            await client.uploadFrom(readable, `${ftp.path}/${name}`)
            logger.info(`${ns} Uploaded to ${ftp.path}/${name}`)
            client.close()
        },
        async download(from: string, to: string) {
            await client.downloadTo(to, from)
            logger.info(`${ns} Download from: ${from} to ${to}`)
            client.close()
        },
        async remove(fileName: string) {
            const from: string = `${ftp.path}/${fileName}`
            await client.remove(from)
            logger.info(`${ns} Remove from: ${from}`)
            client.close()
        }
    }
}
