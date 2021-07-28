
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

// const game_history = async (root: any, args: any, ctx: any): Promise<{ totalMoney: Number, createdAt: Date }> => {
//     //   const session = client.startSession()
//     try {
//         const { userId, limit, skip } = args
//         // let gameHistory = await db.collection(collectionNames.gameHistory).find({ userId }).limit(limit).skip(skip)

//         // return gameHistory

        

//     } catch (e) {
//         //if (session.inTransaction()) await session.abortTransaction()
//         throw e
//     } finally {
//         // await session.endSession()
//     }

// }
// export { game_history }