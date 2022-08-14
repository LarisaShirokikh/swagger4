
import {settings} from "../settings";
import jwt from 'jsonwebtoken'
import {CommentType, UsersType, UsersWithHashType} from "../types";
import {ObjectId} from "mongodb";
import {usersService} from "../domain/users-servise";

export const jwtService = {

    async createJWT(user: UsersWithHashType, password: string) {
        const passwordHash = await usersService._generateHash(password,
            user.passwordSalt)

           // const token = jwt
             //   .sign({userId: user.id, },
           //         settings.JWT_SECRET, {expiresIn: '10h'})

            return passwordHash


    },

    async getUserIdByToken (token: string) {
        try {
            //const result: any = jwt.decode(token)
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }
}