import { gameEngine } from './gameEngine'
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from '../../models/User';
import { PRIVATE_TRX_KEY, ADDRESS_TRX_SERVER } from '../../config';

const user_withdraw = async (root: any, args: any, ctx: any): Promise<{  }> => {
    const session = client.startSession()
    session.startTransaction()
    try {
        const date = new Date()
        const { address, amount } = args
        let user = await db.collection(collectionNames.users).findOne({ address }, { session })
            ;

        if (!user) {
            throw new Error (" user not found")
        }
        
            if (user.del === 1) {
            throw new Error("User has delted")
        }

        if (user.balance < amount) {
            throw new Error(" total Money not Enough")
        }

        //tronWeb.trx.sendTransaction(address, 1000, PRIVATE_TRX_KEY)
        // create object transaction => sign = private key => boardcast

        const dataUser = await db.collection(collectionNames.users).findOneAndUpdate({ address },
            {
                $set: { balance: user.balance -= amount, updateAt: date },
                $inc: { totalWithDrawCount: 1 }
            }, { session }
        )

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
