import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { GameHistory } from '../../models/gameHistory';
import { PubSub, withFilter } from "apollo-server";
const pubSub = new PubSub()

type Result = {
    gameId?: String,
    address: String,
    number?: number,
    result: String,
    payout: number,
    amount: number,
    del?: number,
    time?: Date,
    createdAt: Date,
    updateAt: Date
}

const gamePlay = async (address: string, amount: number) => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()

        tronWeb.trx.getBalance(address).then(result => console.log("Tron balance", result / 100000))

        let user = await db.collection(collectionNames.users).findOne({ address }, { session })

        if (!user) {
            throw new Error(" User not found")
        }

        if (user.idLock === true) {
            throw new Error(" The account has been locked before ")
        }

        if (user.balance < amount) {
            throw new Error(" The total Money is not enough")
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
                number: 1,
                result: "Win",
                payout: amount * 2,
                amount: amount
            }, { session })
            await db.collection(collectionNames.users).findOneAndUpdate({ address }, {
                $set: { balance: user.balance += amount * 2, updatedAt: date },
                $inc: { totalUserWin: 1, totalServerWin: amount }
            }, { session })

            await session.commitTransaction()
           // pubSub.publish(GAME_PLAY, { subGame: dataGame.ops[0] })

            return dataGame.ops[0]
        } else {
            const dataGame = await db.collection(collectionNames.gameHistory).insertOne({
                address: address,
                time: date,
                del: 0,
                number: 0,
                payout: 0,
                amount: amount,
                result: "lose",
            }, { session })
            await db.collection<User>(collectionNames.users).findOneAndUpdate({ address }, {
                $set: { updatedAt: date },
                $inc: { totalUserLose: 1, totalServerLose: amount }
            }, { session })
            await session.commitTransaction()

         //   pubSub.publish(GAME_PLAY, { subGame: dataGame.ops[0] })
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
