
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const user_get = async (root: any, args: any, ctx: any): Promise<{ address: String }> => {
    //   const session = client.startSession()
    try {
        const { address } = args
        let user = await db.collection(collectionNames.users).findOne({ address })

        if (user.del === 1) {
            throw new Error("User has deteted")
        }
        return user

    } catch (err) {
    
        throw err
    }

}
export { user_get }
