
import { client, collectionNames, db } from "../../mongo";


const fund_get = async (root: any, args: any, ctx: any): Promise<{  }> => {
    //   const session = client.startSession()
    try {
        const { address } = args
        let user = await db.collection(collectionNames.users).findOne({ address })

        if (!user) {
            throw new Error(" User not found")
        }

        if (user.del === 1) {
            throw new Error("User has deteted")
        }
        return user

    } catch (err) {
    
        throw err
    }

}
export { fund_get }