import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { PRIVATE_TRX_KEY, ADDRESS_TRX_SERVER } from '../../config';

const user_unlock = async (root: any, args: any, ctx: any): Promise<User> => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()
        const { address } = args
        let user = await db.collection<User>(collectionNames.users).findOne({ address }, { session })
            ;

        if (!user) {
            throw new Error(" user not found")
        }

        if (user.idLock === false) {
            throw new Error(" The account has been locked before ")
        }

        const dataUser = await db.collection<User>(collectionNames.users).findOneAndUpdate({ address },
            {
                $set: { idLock: false, updateAt: date },


            }, { session }
        )

        await session.commitTransaction()

        console.log(dataUser)

        return dataUser.value as User

    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { user_unlock }
