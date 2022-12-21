import { CorsOptions } from 'cors'
import { IServerConfig } from 'typings/interfaces'

const getCorsURLs = (): string[] => {
    try {
        return process.env.CORS_URLS.split(',')
    } catch (error) {
        return []
    }
}

export default (config: IServerConfig): CorsOptions => {
    const {} = config
    return {
        credentials: true,
        origin: getCorsURLs(),
        exposedHeaders: ['Access-Control-Allow-Origin']
    }
}
