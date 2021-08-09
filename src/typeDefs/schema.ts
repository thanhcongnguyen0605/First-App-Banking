import { gql } from "apollo-server";

export const typeDefs = gql`

scalar ObjectID
scalar Date
scalar JSON

enum WatchStatus {
    watch
    unwatch
    all
}

type UserInformation {
    balance: Int,
    address: String,
    totalUserCount: Int,
    totalGameCount: Int,
    totalGameAmount: Int,
    totalServerWin: Int,
    totalServerLose: Int,
    totalUserWin: Int,
    totalUserLose: Int,
    totalDepositCount: Int,
    totalWithdrawCount: Int,
    totalWithdrawAmount: Int,
    createdAt: Date,
    updateAt: Date,
    idLock: Boolean,
}

type UserGame {
    balance: Int,
    totalDepositCount: Int
    totalDepositAmount: Int,
    totalWithdrawCount: Int,
    totalWithdrawAmount: Int,
    totalGameCount: Int,
    totalGameAmount: Int
    totalUserWin: Int,
    totalUserLose: Int,
    createdAt: Date,
    updateAt: Date
}

type GameHistory {
    gameId: String,
    address: String,
    number: Int,
    result: String,
    payout: Int,
    amount: Int,
    del: Int
    time: Date,
}

type ServerLock {
    message: String
    count: Int
}

type GetHistory {
    messgae: String,
    totalPage: Int
    page: Int,
    pageSize: Int,
    total: Int
    data: [GameHistory],
}

type userGamePlay {
    dataUser: [UserGame]
}

type gameSub {
    address: String,
    number: Int,
    result: Int,
    balance: Int,
    payout: Int,
  }

type Query {
    fund_get(address: String!): UserInformation
    user_get(address: String! ): UserInformation
    user_game_history_get(address: String!, page: Int!, pageSize: Int!): GetHistory
}

type Mutation {
    user_lock(address: String!): UserInformation
    user_unlock(address: String!): UserInformation
    server_lock: ServerLock
    server_unlock: ServerLock
    gamePlay(amount: Int!, address: String!): GameHistory
    user_withdraw(amount: Int!, address: String!): UserInformation
    depositAccount(address: String!, amount: Int): UserInformation
}

type Subscription {
    subUser: UserInformation
    subDeposit: UserInformation
    subGame: UserInformation
    subWithDraw: UserInformation
    depositAccount: UserInformation
}

`