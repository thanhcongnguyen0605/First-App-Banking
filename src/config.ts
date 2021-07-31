import { config } from "dotenv";

config()

if (!process.env.ADMIN_KEY) throw new Error(`admin key must be provided`)
export const ADMIN_KEY = process.env.ADMIN_KEY

if (!process.env.MONGO_URI) throw new Error(`mongo uri must be provided`)
export const mongoUri = process.env.MONGO_URI

if (!process.env.ADDRESS_TRX_SERVER) throw new Error(`ADDRESS_TRX_SERVER port must be provided`)
export const ADDRESS_TRX_SERVER = process.env.ADDRESS_TRX_SERVER

if (!process.env.GRAPHQL_PORT) throw new Error(`graphql port must be provided`)
export const graphqlPort = process.env.GRAPHQL_PORT

if (!process.env.PRIVATE_TRX_KEY) throw new Error(`PRIVATE_TRX_KEY port must be provided`)
export const PRIVATE_TRX_KEY = process.env.PRIVATE_TRX_KEY

