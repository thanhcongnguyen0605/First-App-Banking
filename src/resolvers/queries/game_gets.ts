
import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';

const game_get = async (root: any, args: any, ctx: any): Promise<{  }> => {
    //   const session = client.startSession()
    try {
        const { address } = args
        let user = await db.collection(collectionNames.users).findOne({ address })

        if (!user) {
            throw new Error(" Game Id not found")
        }

        if (user.del === 1) {
            throw new Error("Game Id  has deteted")
        }
        return user

    } catch (err) {
    
        throw err
    }

}
export { game_get }