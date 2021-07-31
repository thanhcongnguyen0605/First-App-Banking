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
    updateAt: Date
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

type GetHistory {
    messgae: String,
    pageNumber: Int,
    pageSize: Int,
    total: Int
    data: [GameHistory],
}

type userGamePlay {
    dataUser: [UserGame]
}

type Query {
    fund_get(address: String!): UserInformation
    user_get(address: String! ): UserInformation
    user_game_history_get(address: String!, pageNumber: Int!, pageSize: Int!): GetHistory
}

type Mutation {
    gamePlay(amount: Int!, address: String!): GameHistory
    user_withdraw(amount: Int!, address: String!): UserInformation
    depositAccount(address: String!): UserGame
}

`