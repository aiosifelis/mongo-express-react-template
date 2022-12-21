import { ErrorCode } from 'typings/enums'

export default (errorCode: ErrorCode | unknown): number => {
    switch (errorCode) {
        case ErrorCode.ACCESS_DENIED:
            return 401
        case ErrorCode.UNAUTHORIZED:
            return 403
        case ErrorCode.JWT_EXPIRED:
            return 401
        default:
            return 400
    }
}
