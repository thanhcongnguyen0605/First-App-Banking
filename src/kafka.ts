import { Kafka } from "kafkajs"
import { ADDRESS_TRX_SERVER } from "./config"
import { depositAccount } from "./resolvers/mutations/depositAccount"

const kafkaClientId = "Kafka"
const kafkaBrokers = ["AddressKafka"]
const kafkaGroupId = "GroupKapfa"
const topicName = "transaction"

const kafka = new Kafka({
    clientId: kafkaClientId,
    brokers: kafkaBrokers,
    ssl: false,
    sasl: undefined,
    connectionTimeout: 5000,
    requestTimeout: 60000,
})

const kafkaConsumer = kafka.consumer({ groupId: kafkaGroupId })

// producer la nguoi gui
// consumer nguoi nhan

export const connectKafkaConsumer = async () => {
    try {

        await kafkaConsumer.subscribe({ topic: topicName, fromBeginning: true })
        console.log(`️🎉  consumer subscribed topic: ${topicName}`)

        await kafkaConsumer.run({

            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const value = message?.value?.toString()

                    if (!value) throw new Error(`Cannot get value of in topic ${topic}`)

                    const parseValue = JSON.parse(value)

                    resolveMessage(parseValue)

                    // if (parseValue.assetName === 'trx' && parseValue.result === 'SUCCESS' && parseValue.toaddress === address) {
                    //     console.log(parseValue)
                    //     return parseValue
                    // }

                } catch (e) {
                    throw e
                }
            }
        })
    } catch (e) {
        throw e
    }
}

const resolveMessage = (parseValue) => {
    const {toAddress,fromAddress,assetName, result,assetAmount}=parseValue
    if( assetName === "trx" && result === "SUCCESS" && toAddress === ADDRESS_TRX_SERVER    ) {
        console.log("Đã nhận được Kafka")
        console.log(fromAddress)
        console.log(parseValue)
        depositAccount(fromAddress,assetAmount)
    }
}
