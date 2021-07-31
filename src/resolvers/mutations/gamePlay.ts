import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { GameHistory } from '../../models/gameHistory';

type Result = {
    gameId?: String,
    address: String,
    number?: number,
    result: String,
    payout: number,
    amount: number,
    del?: number
    time?: Date,
    createdAt: Date,
    updateAt: Date
}

const gamePlay = async (root: any, args: any, ctx: any) => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()

        const { address, amount } = args

        tronWeb.trx.getBalance(address).then(result => console.log(result))

        let user = await db.collection(collectionNames.users).findOne({ address }, { session })

        if (!user) {
            throw new Error(" User not found")
        }

        if (user.del === 1) {
            throw new Error("User has deleted")
        }

        if (user.balance < amount) {
            throw new Error(" the total Money is not enough")
        }

        await db.collection(collectionNames.users).findOneAndUpdate({ address: address }, {
            $set: { updatedAt: date },
            $inc: { totalGameCount: 1, balance: -amount }
        }, { session })

        const data = gameEngine()

        if (data === "Win") {
            console.log("You Win")
            
            let dataGame = await db.collection(collectionNames.gameHistory).insertOne({
                address: address,
                time: date,
                del: 0,
                result: "win",
                payout: amount * 2,
                amount: amount
            }, { session })
            await db.collection(collectionNames.users).findOneAndUpdate({ address }, {
                $set: { balance: user.balance += amount * 2, updatedAt: date },
                $inc: { totalUserWin: 1, totalServerWin: amount }
            }, { session })

            await session.commitTransaction()
            
            return dataGame.ops[0]
        } else {
            const dataGame = await db.collection(collectionNames.gameHistory).insertOne({
                address: address,
                time: date,
                del: 0,
                payout: 0,
                amount: amount,
                result: "lose",
            }, { session })
            await db.collection<User>(collectionNames.users).findOneAndUpdate({ address }, {
                $set: { updatedAt: date },
                $inc: { totalUserLose: 1, totalServerLose: amount }
            }, { session })
            await session.commitTransaction()
            return dataGame.ops[0]
        }

    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { gamePlay }
