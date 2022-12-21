import { IUser } from 'models/user'
import { IRequest, IUserProfile } from 'typings/interfaces'

const ns: string = 'helpers/userHelper'

export default {
    async getProfile(req: IRequest, user: IUser): Promise<IUserProfile> {
        const { logger } = req

        const { _id, firstName, lastName, email, picture, lastLogin } = user

        const userProfile: IUserProfile = {
            _id,
            firstName,
            lastName,
            email,
            picture,
            lastLogin,
            locations: [],
            admin: false
        }

        logger.info(`${ns} userProfile: ${JSON.stringify(userProfile)}`)

        return userProfile
    }
}
