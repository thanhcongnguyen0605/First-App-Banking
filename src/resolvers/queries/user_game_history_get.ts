
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const user_game_history_get = async (root: any, args: any, ctx: any) => {

    try {
        const { address, pageSize, pageNumber } = args
        const [data, total] = await Promise.all([
            await db.collection(collectionNames.gameHistory)
                .find({address})
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .toArray(),
            await db.collection(collectionNames.gameHistory)
                .countDocuments({address})
        ])

        console.log(data)

        return {
            messege: "Done",
            pageNumber,
            pageSize,
            total,
            data: data
        }

    } catch (e) {

        throw e
    } finally {
    }

}
export { user_game_history_get }