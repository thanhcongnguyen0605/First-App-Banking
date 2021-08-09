import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { PRIVATE_TRX_KEY, ADDRESS_TRX_SERVER } from '../../config';
import { PubSub, withFilter } from "apollo-server";
const pubSub = new PubSub()

const user_withdraw = async (address: string, amount: number) => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()
        
        let user = await db.collection(collectionNames.users).findOne({ address: address }, { session });

        if (!user) {
            throw new Error(" user not found")
        }

        if (user.idLock === true) {
            throw new Error(" The account has been locked before ")
        }

        if (user.balance < amount) {
            throw new Error(" total Money not Enough")
        }

        tronWeb.trx.sendTransaction(address, 1000, PRIVATE_TRX_KEY)
        // create object transaction => sign = private key => boardcast

        const dataUser = await db.collection(collectionNames.users).findOneAndUpdate({ ADDRESS_TRX_SERVER },
            {
                $set: { balance: user.balance -= amount, updateAt: date },
                $inc: { totalWithDrawCount: 1, totalWithdrawAmount: amount }
            }, { session }
        )

//        pubSub.publish(USER_GAME, { subWithDraw: dataUser})

        await session.commitTransaction()

        console.log(dataUser)

        return dataUser.value

    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }

}
export { user_withdraw }
