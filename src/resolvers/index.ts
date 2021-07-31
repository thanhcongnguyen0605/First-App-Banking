import { gamePlay } from "./mutations/gamePlay"
import { user_get } from "./queries/user_get"
import { user_withdraw } from "./mutations/user_withdraw"
import { user_game_history_get } from "./queries/user_game_history_get"
import { depositAccount } from "./mutations/depositAccount"
import { fund_get } from "./queries/fund_get"

const resolvers = {
    Query: {
        user_get,
        user_game_history_get,
        fund_get
    },
    Mutation: {
        gamePlay,
        user_withdraw, 
        depositAccount,
        
    },
    // Subscription: {}
}

export { resolvers }