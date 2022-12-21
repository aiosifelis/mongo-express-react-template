import config from 'config/server'
import moment from 'moment'

const {
    general: { dateTimeFormat, dateFormat, timeFormat }
} = config

export default {
    create() {
        return moment().unix()
    },
    createFromMillis(millis: number) {
        return moment(millis).unix()
    },
    resolve(seconds: number) {
        return moment(seconds * 1000).toDate()
    },
    isValid(seconds: number): boolean {
        return moment(seconds).isValid()
    },
    formatDate(seconds: number): string {
        return moment(seconds * 1000).format(dateFormat)
    },
    formatDateTime(seconds: number): string {
        return moment(seconds * 1000).format(dateTimeFormat)
    },
    formatTime(seconds: number): string {
        return moment(seconds * 1000).format(timeFormat)
    }
}
