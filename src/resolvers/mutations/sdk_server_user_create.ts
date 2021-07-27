import UUIDAPIKey from "uuid-apikey";
import { ADMIN_KEY } from "../../config";
import { client, collectionNames, db } from "../../mongo";

const sdk_server_user_create = async (root: any, args: any, ctx: any): Promise<{ slug: string, apiKey: string, createdAt: Date }> => {
    const session = client.startSession()
    session.startTransaction()

    try {
        console.log({ args });

        const { slug, adminKey } = args

        if (!adminKey) throw new Error(`adminKey must be provided`)

        if (adminKey !== ADMIN_KEY) throw new Error(`adminKey is invalid`)

        const { apiKey } = UUIDAPIKey.create({ noDashes: false })

        console.log({ apiKey });

        const foundSlug = await db.collection(collectionNames.users).findOne({ slug }, { session })
        if (foundSlug) throw new Error(`slug is existed`)

        const foundApiKey = await db.collection(collectionNames.users).findOne({ apiKey }, { session })
        if (foundApiKey) throw new Error(`foundApiKey is existed`)

        const createdAt = new Date()

        const { insertedId } = await db.collection(collectionNames.users).insertOne({ slug, apiKey, createdAt }, { session })

        console.log({ insertedId });

        await session.commitTransaction()
        
        return { slug, apiKey, createdAt }
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}

export { sdk_server_user_create }