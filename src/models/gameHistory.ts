import {ObjectID} from "mongodb"

type GameHistory=  {
    _id?: ObjectID
    gameId: String
    address: String
    number: Number
    result: String
    payout: Number
    amount: Number
    time: Date
    createdAt: Date
    updateAt: Date
    del: Number
    status: String
    balance: Number
}
export {GameHistory}