
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { User } from "../../models/User";

const game_get = async (root: any, args: any, ctx: any): Promise<User> => {
    try {
        const { address } = args
        let user = await db.collection<User>(collectionNames.users).findOne({ address })

        if (!user) {
            throw new Error(" Game Id not found")
        }

        return user

    } catch (err) {
    
        throw err
    }

}
export { game_get }