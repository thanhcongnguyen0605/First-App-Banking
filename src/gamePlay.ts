import { gameEngine } from './gameEngine'

const amount = 2000

let totalMoney = 4000

export function GamePlay () {
    if (totalMoney < amount) {
        throw new Error (" the total Money is not enough")
    }

    totalMoney -= amount

    const data = gameEngine()
    if (data === "Win") {
        console.log("You Win")
        totalMoney += amount * 2
    } else {
        console.log("Lose")
    }
    return totalMoney
}
console.log(GamePlay())