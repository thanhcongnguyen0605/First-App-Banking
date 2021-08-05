import { connectDb } from "./mongo"
// import { connectCoinProducer } from "./kafka"
import { ApolloServer } from "apollo-server"
import { typeDefs } from "./typeDefs/schema"
import { resolvers } from "./resolvers"
import { ADDRESS_TRX_SERVER, graphqlPort } from "./config"
import { connectKafkaConsumer } from "./kafka"
//import { PubSub } from "graphql-subscriptions"
import { PubSub, withFilter } from 'apollo-server';

//import { makeExecutableSchema } from '@graphql-tools/schema';


const pubsub = new PubSub();


const initApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        subscriptions: { path: '/' }
    })

    const { url } = await server.listen({ port: graphqlPort })

    console.log(`🚀 Apollo server ready at ${url}`);
}

const start = async () => {
    try {
        await connectDb()
//        await initTronWeb()
        await initApolloServer()
        await connectKafkaConsumer()

    } catch (e) {
        throw e
    }
}



start()

