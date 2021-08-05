import {ObjectID} from "mongodb"

interface User  {
    _id?: ObjectID
    balance: Number
    totalDepositCount: Number
    totalDepositAmount: Number
    totalWithdrawCount: Number
    totalWithdrawAmount: Number
    totalGameCount: Number
    totalGameAmount: Number
    totalUserWin: Number
    totalUserLose: Number
    createdAt: Date
    updateAt: Date
    idLock: Boolean
}
export {User}

