
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const user_get = async (root: any, args: any, ctx: any): Promise<{ totalMoney: number, createdAt: Date }> => {
    //   const session = client.startSession()
    try {
        const { userId, amount } = args
        let user = await db.collection(collectionNames.users).findOne({ userId })

        if (user.del === 1) {
            throw new Error("User has deteted")
        }
        return user

    } catch (e) {
        //if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        // await session.endSession()
    }

}
export { user_get }
