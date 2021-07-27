import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";

const gamePlay = async (root: any, args: any, ctx: any): Promise<{ balance: number, createdAt: Date }> => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()

        const { userId, amount } = args

        let user = await db.collection(collectionNames.users).findOne({ userId }, { session })

        if (user.del === 1) {
            throw new Error("User has deleted")
        }

        if (user.balance < amount) {
            throw new Error(" the total Money is not enough")
        }

        await db.collection(collectionNames.users).updateOne({ user }, {
            $set: { updatedAt: date },
            $inc: { totalGameCount: 1, balance: -amount }
        }, { session })

        const data = gameEngine()

        if (data === "Win") {
            console.log("You Win")
            await db.collection(collectionNames.gameHistory).insertOne({ userId: userId, updateAt: date, del: 0, status: "win", balance: user.balance, amount: amount, totalMoney: user.balance += amount * 2 })
            await db.collection(collectionNames.users).updateOne({ user }, {
                $set: { balance: user.balance += amount * 2, updatedAt: date },
                $inc: { totalUserWin: 1 }
            })
        } else {
            await db.collection(collectionNames.gameHistory).insertOne({ userId: userId, updateAt: date, del: 0, balance: user.balance, amount: amount, status: "lose", totalMoney: user.balance, }, { session })
            await db.collection(collectionNames.users).updateOne({ user }, {
                $set: { updatedAt: date },
                $inc: { totalUserLose: 1 }
            })
            console.log("Lose")
        }

        await session.commitTransaction()
        return { ...user, amount }

    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { gamePlay }
