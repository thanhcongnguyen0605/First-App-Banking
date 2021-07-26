import { connectDb } from "./mongo"
// import { connectCoinProducer } from "./kafka"
import { ApolloServer } from "apollo-server"
import { typeDefs } from "./typeDefs/schema"
import { resolvers } from "./resolvers"
import { graphqlPort } from "./config"

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
        await initApolloServer()
    } catch (e) {
        throw e
    }
}

start()