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

type Query {
    user_get(userId: Int! ): UserInformation
}

type Mutation {
    gamePlay(amount: Int!, userId: Int!): UserInformation
    user_withdraw(amount: Int!, userId: Int!): UserInformation
}

`