import getEncryptionKey from './getEncryptionKey'

const Cryptr = require('cryptr')

export default new Cryptr(getEncryptionKey())
