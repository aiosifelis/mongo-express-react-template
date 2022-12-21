import cryptoRandomString from 'crypto-random-string'

type RandomStringType =
    | 'hex'
    | 'base64'
    | 'url-safe'
    | 'numeric'
    | 'distinguishable'
    | 'ascii-printable'
    | 'alphanumeric'

export default (length: number, type: RandomStringType = 'hex'): string => {
    return cryptoRandomString({ length, type })
}
