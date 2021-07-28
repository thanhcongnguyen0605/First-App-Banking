
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const user_game_history_get = async (root: any, args: any, ctx: any): Promise<{  }> => {

    try {
        const { userId, pageSize, pageNumber } = args
        let gameHistory = await db.collection(collectionNames.gameHistory).find({ userId }).limit(pageSize).skip(pageNumber * pageSize)

        return gameHistory

    } catch (e) {

        throw e
    } finally {
    }

}
export { user_game_history_get }