import {refreshTokensBlackListCollection} from "../settingses/db";

export const refreshRepository = {
    async addRefreshTokenToBlackList(token: string) {
        const result = await refreshTokensBlackListCollection.insertOne({refreshToken: token})
        return result
    },

    async checkTokenInBlackList(refreshToken: string) {
        const result  = await refreshTokensBlackListCollection
            .findOne({refreshToken}, {projection: {_id: 0}})
        return result;
    },
    async deleteAllTokensInBlackList(): Promise<boolean> {
        await refreshTokensBlackListCollection.deleteMany({})
        return true
    }
}