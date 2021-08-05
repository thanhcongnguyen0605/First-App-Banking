
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { User } from "../../models/User";

const user_get = async (root: any, args: any, ctx: any): Promise<User> => {
    //   const session = client.startSession()
    try {
        const { address } = args
        let user = await db.collection(collectionNames.users).findOne({ address })

        if (!user) {
            throw new Error("User not found")
        } 
        return user as User

    } catch (err) {
    
        throw err
    }

}
export { user_get }
