import { isEmpty, isNumber } from 'lodash'
import moment from 'moment'
import { languages } from 'typings/data'
import { ErrorCode } from 'typings/enums'
import validator from 'validator'

const nameMaxLength: number = 500
const messageMaxLength: number = 500

export default {
    fullName(firstName: string, lastName: string): void {
        if (
            isEmpty(firstName) ||
            firstName.length <= 2 ||
            firstName.length >= nameMaxLength
        ) {
            throw ErrorCode.INVALID_NAME
        }

        if (
            isEmpty(lastName) ||
            lastName.length <= 2 ||
            lastName.length >= nameMaxLength
        ) {
            throw ErrorCode.INVALID_NAME
        }
    },
    phoneNumber(phoneNumber: string): void {
        if (
            isEmpty(phoneNumber) ||
            !validator.isMobilePhone(phoneNumber, languages as any[])
        ) {
            throw ErrorCode.INVALID_PHONE_NUMBER
        }
    },
    email(email: string): void {
        if (isEmpty(email) || !validator.isEmail(email)) {
            throw ErrorCode.INVALID_EMAIL
        }
    },

    password(password: string): void {
        const score = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            returnScore: false,
            pointsPerUnique: 0,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 0,
            pointsForContainingUpper: 0,
            pointsForContainingNumber: 0,
            pointsForContainingSymbol: 0
        })

        if (score === false) {
            throw ErrorCode.WEAK_PASSWORD
        }
    },

    name(name: string): void {
        if (isEmpty(name) || name.length <= 2 || name.length >= nameMaxLength) {
            throw ErrorCode.INVALID_NAME
        }
    },

    date(date: number): void {
        if (!isNumber(date) || !moment(date).isValid()) {
            throw ErrorCode.INVALID_DATE
        }
    },
    appKey(appKey: string) {
        if (isEmpty(appKey) || appKey.length < 64 || appKey.length > 64) {
            throw ErrorCode.INVALID_INPUT
        }
    },
    appSecret(appSecret: string) {
        if (
            isEmpty(appSecret) ||
            appSecret.length < 128 ||
            appSecret.length > 128
        ) {
            throw ErrorCode.INVALID_INPUT
        }
    },
    message(message: string) {
        if (
            isEmpty(message) ||
            message.length === 0 ||
            message.length >= messageMaxLength
        ) {
            throw ErrorCode.INVALID_MESSAGE
        }
    }
}
