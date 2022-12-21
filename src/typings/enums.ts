export const enum Language {
    EN = 'en-GB',
    EL = 'el-GR'
}

export const enum SocketEvent {
    SOCKET_CONNECT = 'connection',
    SOCKET_DISCONNECT = 'disconnect',
    SOCKET_ERROR = 'SOCKET_ERROR'
}

export const enum Channel {
    WEB = 'web',
    MOBILE = 'mobile'
}

export const enum ErrorCode {
    ACCESS_DENIED = 'ACCESS_DENIED',
    UNAUTHORIZED = 'UNAUTHORIZED',
    BAD_REQUEST = 'BAD_REQUEST',
    MAX_ATTEMPTS = 'MAX_ATTEMPTS',
    EMPTY_INPUT = 'EMPTY_INPUT',
    INVALID_INPUT = 'INVALID_INPUT',
    INVALID_NAME = 'INVALID_NAME',
    INVALID_TOKEN = 'INVALID_TOKEN',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_DATE = 'INVALID_DATE',
    INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
    NOT_FOUND = 'NOT_FOUND',
    ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    COMPANY_EXISTS = 'COMPANY_EXISTS',
    INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
    INVALID_UPLOAD_TYPE = 'INVALID_UPLOAD_TYPE',
    INACTIVE_USER = 'INACTIVE_USER',
    WEAK_PASSWORD = 'WEAK_PASSWORD',
    INVALID_MESSAGE = 'INVALID_MESSAGE',
    INVALID_PIN = 'INVALID_PIN',
    INVALID_ROOM = 'INVALID_ROOM',
    RECORD_EXISTS = 'RECORD_EXISTS',
    JWT_EXPIRED = 'jwt expired',
    PURCHASE_REQUIRED = 'PURCHASE_REQUIRED',
    INVALID_CONNECTION = 'INVALID_CONNECTION'
}

export const enum EmailTemplate {
    DEFAULT = 'default',
    REGISTER = 'register',
    WELCOME = 'welcome',
    RESET_PASSWORD = 'reset-password',
    ORDER = 'order',
    ORDER_PROGRESS = 'order-progress'
}

export const enum TokenType {
    REGISTER = 'register',
    RESET_PASSWORD = 'reset-password',
    SESSION = 'session'
}
