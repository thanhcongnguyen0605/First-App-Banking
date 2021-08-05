import { gamePlay } from "./mutations/gamePlay"
import { user_get } from "./queries/user_get"
import { user_withdraw } from "./mutations/user_withdraw"
import { user_game_history_get } from "./queries/user_game_history_get"
import { depositAccount } from "./mutations/depositAccount"
import { fund_get } from "./queries/fund_get"
import { user_lock } from "./mutations/user_lock"
import { user_unlock } from "./mutations/user_unlock"
import { server_lock } from "./mutations/server_lock"
import { server_unlock } from "./mutations/server_unlock"
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

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
        user_lock,
        user_unlock,
        server_unlock,
        server_lock
    },
    Subscription: {
        subUser: {
          subscribe: () => pubsub.asyncIterator(['CREATE_USER']),
        },
        subDeposit: {
          subscribe: withFilter(
            () => pubsub.asyncIterator('USER_DEPOSIT'),
            (payload, args) => {
              return (payload.userSubDeposit.fromAddress === args.address);
            },
          ),
        },
        subGame: {
          subscribe: withFilter(
            () => pubsub.asyncIterator('USER_GAME'),
            (payload, args) => {
              return (payload.userSubGame.address === args.address);
            },
          ),
        },
        subWithDraw: {
          subscribe: withFilter(
            () => pubsub.asyncIterator('USER_WITHDRAW'),
            (payload, args) => {
              return (payload.userSubWithdraw.address === args.address);
            },
          ),
        },
      },
    // Subscription: {
    //     gameSub: () => pubsub.asyncIterator(['GAME_PLAY']),
    //     userSubDeposit: {
    //         subscribe: withFilter(
    //             () => pubsub.asyncIterator('USER_DEPOSIT'),
    //             (payload, variables) => {
    //                 return (payload.userSubDeposit.fromAddress === variables.address);
    //             },
    //         ),
    //     },


    //     userSubDeposit: () => pubsub.asyncIterator(['DEPOSIT_ACCOUNT']),
    // },
}

export { resolvers }