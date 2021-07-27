import { gamePlay } from "./mutations/gamePlay"
import { user_get } from "./queries/user_get"
import { user_withdraw } from "./mutations/user_withdraw"

const resolvers = {
    Query: {
        user_get
    },
    Mutation: {
        gamePlay,
        user_withdraw
    },
    // Subscription: {}
}

export { resolvers }