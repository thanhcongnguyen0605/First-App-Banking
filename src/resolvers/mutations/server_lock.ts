import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { PRIVATE_TRX_KEY, ADDRESS_TRX_SERVER } from '../../config';

const server_lock = async (root: any, args: any, ctx: any): Promise<{}> => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()

        const count = await db.collection(collectionNames.users)
            .countDocuments({ idLock: false })

        if (count === 0) {
            throw new Error("All user has lock before")
        }

        const dataUser = await db.collection(collectionNames.users).updateMany({ idLock: false },
            {
                $set: { idLock: true, updateAt: date },

            }, { session }
        )
        if (!dataUser) {
            throw new Error(" user not found")
        }
        await session.commitTransaction()

        console.log(dataUser)

        return {
            count, message: "Done"
        }
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { server_lock }
