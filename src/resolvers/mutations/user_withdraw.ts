import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const user_withdraw = async (root: any, args: any, ctx: any): Promise<{ totalMoney: Number, createdAt: Date }> => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()
        const { userId, amount } = args
        let user = await db.collection(collectionNames.users).findOne({ userId }, { session })

        if (user.del === 1) {
            throw new Error("User has delted")
        }

        if (user.balance < amount) {
            throw new Error(" total Money not Enough")
        }

        await db.collection(collectionNames.users).updateOne({ user },
            {
                $set: { balance: user.balance -= amount, updateAt: date },
                $inc: { totalWithDrawCount: 1 }
            }, { session }
        )

        await session.commitTransaction()

        return user

    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { user_withdraw }
