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
import { GameHistory } from "../models/gameHistory"

const pubsub = new PubSub();

const USER_GAME = "USER_GAME"
const USER_WITHDRAW = "USER_WITHDRAW"
const USER_DEPOSIT = "USER_DEPOSIT"


const resolvers = {
  Query: {
    user_get,
    user_game_history_get,
    fund_get
  },
  Mutation: {
    gamePlay: async (parent: any, args: any) => {
      try {
        const { address, amount } = args;
        const result = await gamePlay(address, amount);
        pubsub.publish(USER_GAME, { gamePlay: result })
        return result;
      } catch (error) {
        throw error;
      }
    },
    user_withdraw: async (parent: any, args: any) => {
      try {
        const { address, amount } = args;
        const result = await user_withdraw(address, amount);

        pubsub.publish(USER_WITHDRAW, { user_withdraw: result })
        return result;
      } catch (error) {
        throw error;
      }
    },
    depositAccount: async (parent: any, args: any) => {
      try {
        const { address, amount } = args;
        const result = await depositAccount(address, amount);

        pubsub.publish(USER_DEPOSIT, { depositAccount: result })
        return result;
      } catch (error) {
        throw error;
      }
    },
    user_lock,
    user_unlock,
    server_unlock,
    server_lock
  },

  Subscription: {
    // subGame: {
    //   subscribe: () => pubsub.asyncIterator(USER_GAME),
    // },
    subGame: {
      subscribe: withFilter(

        () => pubsub.asyncIterator(USER_GAME),

        (payload, args) => {
          return (payload.gamePlay.address === args.address);
        },
      ),
      resolve: (payload) => {
        console.log(payload)
        
        return payload.gamePlay
      }
    }, 
    subDeposit: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_DEPOSIT),
        (payload, args) => {
          return (payload.depositAccount.address === args.address);
        },
      ),
      resolve: (payload) => {
        return payload.depositAccount
      }
    },
    subWithDraw: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_WITHDRAW),
        (payload, args) => {
          return (payload.user_withdraw.address === args.address);
        },
      ),
      resolve: (payload) => {
        return payload.user_withdraw
      }
    },
  },
}

export { resolvers }