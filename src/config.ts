import { config } from "dotenv";

config()

if (!process.env.ADMIN_KEY) throw new Error(`admin key must be provided`)
export const ADMIN_KEY = process.env.ADMIN_KEY

if (!process.env.MONGO_URI) throw new Error(`mongo uri must be provided`)
export const mongoUri = process.env.MONGO_URI

if (!process.env.GRAPHQL_PORT) throw new Error(`graphql port must be provided`)
export const graphqlPort = process.env.GRAPHQL_PORT

// if (!process.env.GRPC_PORT) throw new Error(`grpc port must be provided`)
// export const grpcPort = process.env.GRPC_PORT

// if (!process.env.COIN_KAFKA_CLIENT_ID) throw new Error(`Kafka client id must be provided`)
// if (!process.env.COIN_KAFKA_BROKERS) throw new Error(`Kafka brokers must be provided`)

// export const coinKafkaConfig = {
//     clientId: process.env.COIN_KAFKA_CLIENT_ID,
//     brokers: process.env.COIN_KAFKA_BROKERS,
//     topic: {
//         consume: {},
//         produce: {
//             btc: 'btc',
//             bch: 'bch',
//             ltc: 'ltc',
//             eth: 'eth',
//             etc: 'etc',
//             trx: 'trx'
//         }
//     }
// }

