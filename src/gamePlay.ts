import { gameEngine } from './gameEngine'

const amount = 2000

let totalMoney = 0

export function GamePlay () {

    const data = gameEngine()
    if (data === "Win") {
        console.log("You Win")
        totalMoney += amount * 2
    } else {
        console.log(" Lose")
    }
    return totalMoney
}
console.log(GamePlay())