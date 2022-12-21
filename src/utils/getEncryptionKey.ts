import config from 'config/server'
const { mongoURI } = config
export default (): string => mongoURI
