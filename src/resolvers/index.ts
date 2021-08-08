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

const USER_GAME = 'OK'


const resolvers = {
  Query: {
    user_get,
    user_game_history_get,
    fund_get
  },
  Mutation: {
    gamePlay: async (parent: any, args: any) => {
      try {
        const {address, amount } = args;
        const result = await gamePlay(address, amount);
        pubsub.publish(USER_GAME, { userSubGame: result})
        return result;
      } catch (error) {
        throw error;
      }
    },
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
        
        () => pubsub.asyncIterator([USER_GAME]),
        
        (payload, args) => {
          console.log(USER_GAME)
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
}

export { resolvers }