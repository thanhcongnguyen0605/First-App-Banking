import { gamePlay } from "./mutations/gamePlay"
import { user_get } from "./queries/user_get"
import { user_withdraw } from "./mutations/user_withdraw"
import { user_game_history_get } from "./queries/user_game_history_get"

const resolvers = {
    Query: {
        user_get,
        user_game_history_get
    },
    Mutation: {
        gamePlay,
        user_withdraw
    },
    // Subscription: {}
}

export { resolvers }