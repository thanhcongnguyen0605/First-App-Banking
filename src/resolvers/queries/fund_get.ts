
import { ADDRESS_TRX_SERVER } from "../../config";
import { User } from "../../models/User";
import { client, collectionNames, db } from "../../mongo";


const fund_get = async (root: any, args: any, ctx: any): Promise<User> => {
    //   const session = client.startSession()
    try {

        let user = await db.collection(collectionNames.users).findOne<User>({ address: ADDRESS_TRX_SERVER })

        if (!user) {
            throw new Error(" User not found")
        }

        return user as User

    } catch (err) {
    
        throw err
    }

}
export { fund_get }