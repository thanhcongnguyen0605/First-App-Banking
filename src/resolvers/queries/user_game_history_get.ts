
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { GameHistory } from "../../models/gameHistory";

const user_game_history_get = async (root: any, args: any, ctx: any) => {

    try {
        const { address, pageSize, page } = args

        const data = await db.collection<GameHistory>(collectionNames.gameHistory)
            .find({ address })
            .skip(page * pageSize)
            .limit(pageSize)
            .toArray()
        const total = await db.collection(collectionNames.gameHistory)
            .countDocuments({ address })

        return {
            totalPage: Math.ceil(total / pageSize),
            messege: "Done",
            page,
            pageSize,
            total,
            data
        }

    } catch (e) {

        throw e
    } finally {
    }

}
export { user_game_history_get }

// import { client, collectionNames, db } from "../../mongo";
// import { Session } from 'inspector';
// import { GameHistory } from "../../models/gameHistory";

// const user_game_history_get = async (root: any, args: any, ctx: any) => {

//     try {
//         const { address, pageSize, page } = args
//         const [data, total] = await Promise.all([
//             await db.collection<GameHistory>(collectionNames.gameHistory)
//                 .find({address})
//                 .skip(page * pageSize)
//                 .limit(pageSize)
//                 .toArray(),
//             await db.collection(collectionNames.gameHistory)
//                 .countDocuments({address})
//         ])

//         console.log(data)

//         return {
//             totalPage: Math.ceil(total / pageSize),
//             messege: "Done",
//             page,
//             pageSize,
//             total,
//             data
//         }

//     } catch (e) {

//         throw e
//     } finally {
//     }

// }
// export { user_game_history_get }