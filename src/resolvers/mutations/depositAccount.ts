import { client, collectionNames, db } from "../../mongo";
import { Session } from 'inspector';
import { tronWeb } from '../../tronweb';
import { User } from "../../models/User";
import { connectKafkaConsumer } from "../../kafka";



const depositAccount = async (address: String, amount: Number) => {
    const session = client.startSession()
    session.startTransaction()
    try {
        console.log("Start Deposit Account")
        const date = new Date()
        //Tìm xem đã có user nào có address bằng address chưa
        //Neus chưa có thì tạo mới 1 user có balance=amount address=address
        //Nếu có thì phải tăng balance tăng thêm amount


        //await connectKafkaConsumer(address)

        let user = await db.collection(collectionNames.users).findOne({ address: address }, { session });

        if (!user) {
            console.log("Insert  Account")
            let dataUser = await db.collection(collectionNames.users).insertOne({
                balance: amount,
                totalGameCount: 0,
                totalUserCount: 0,
                totalUserWin: 0,
                totalUserLose: 0,
                totalGameAmount: 0,
                totalWithdrawAmount: 0,
                totalWithdrawCount: 0,
                totalDepositAmount: 0,
                totalDepositCount: 0,
                totalServerLose: 0,
                totalServerWin: 0,
                del: 0, 
                address: address,
                createdAt: new Date (),
                updateAt: new Date ()
            }, { session })

            await session.commitTransaction()

            return dataUser

        } else {
            console.log("Update Account")
            let dataUser = await db.collection(collectionNames.users).findOneAndUpdate(
            { address: address }, { $inc: {balance: amount} },
                { session })

            await session.commitTransaction()

            return dataUser
        }
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
export { depositAccount }
