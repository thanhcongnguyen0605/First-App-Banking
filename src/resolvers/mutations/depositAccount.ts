import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from "../../models/User";
import { connectKafkaConsumer } from "../../kafka";
import { PubSub, withFilter } from "apollo-server";
const pubSub = new PubSub()



const depositAccount = async (address: String, amount: any) => {

    try {
        console.log("Start Deposit Account")
        const date = new Date()
        
        //Tìm xem đã có user nào có address bằng address chưa
        //Neus chưa có thì tạo mới 1 user có balance=amount address=address
        //Nếu có thì phải tăng balance tăng thêm amount

        //await connectKafkaConsumer(address)

        let user = await db.collection(collectionNames.users).findOne({ address: address });

        if (!user) {
            console.log("Insert  Account")
            let dataUser = await db.collection(collectionNames.users).insertOne({
                balance: amount / 1000000,
                totalGameCount: 0,
                totalUserCount: 0,
                totalUserWin: 0,
                totalUserLose: 0,
                totalGameAmount: 0,
                totalWithdrawAmount: 0,
                idLock: false,
                totalWithdrawCount: 0,
                totalDepositAmount: amount / 1000000,
                totalDepositCount: 1,
                totalServerLose: 0,
                totalServerWin: 0,
                address: address,
                createdAt: new Date(),
                updateAt: new Date()
            })

            return dataUser

        } else {
            if (user.idLock === true) {
                throw new Error(" The account has been locked before ")
            }
            console.log("Update Account")
            let dataUser = await db.collection(collectionNames.users).findOneAndUpdate(
                { address: address },
                {
                    $inc: {
                        balance: amount / 1000000,
                        totalDepositCount: 1,
                        totalDepositAmout: amount / 1000000
                    }
                })
                pubSub.publish('DEPOSIT_ACCOUNT', { subDepositAccount: dataUser})

            return dataUser
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}
export { depositAccount }
