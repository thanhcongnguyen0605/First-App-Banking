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
    balance: Int
    createdAt: Date
    updateAt: Date
    amount: Int
}

type FundGet {
    balance: Int
    totalUserCount: Int
    totalGameCount: Int
    totalGameAmount: Int
    totalServerWin: Int
    totalServerLose: Int
    totalUserWin: Int
    totalUserLose: Int
    totalDepositCount: Int
    totalWithdrawCount: Int
    totalWithdrawAmount: Int
}

type UserGame {
    balance: Int
    totalDepositCount: Int
    totalDepositAmount: Int
    totalWithdrawCount: Int
    totalWithdrawAmount: Int
    totalGameCount: Int
    totalGameAmount: Int
    totalUserWin: Int
    totalUserLose: Int
}

type GameHistory {
    gameId: String
    address: String
    number: Int
    result: Int
    payout: Int
    time: Date
}

type Query {
    fund_get(address: String!): FundGet
    user_get(address: String! ): UserInformation
    user_game_history_get(address: String!, pageNumber: Int!, pageSize: Int!): GameHistory
    
}

type Mutation {
    gamePlay(amount: Int!, address: String!): UserInformation
    user_withdraw(amount: Int!, address: String!): UserInformation
}

`