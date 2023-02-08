import config from 'config'
const { mongoURI } = config
export default (): string => mongoURI
