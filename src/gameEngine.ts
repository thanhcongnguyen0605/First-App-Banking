export function gameEngine() {
    let reuslt = Math.round(Math.random())
    console.log(reuslt)

    if (reuslt === 0) {
        return "Win"
    } else {
        return "Lose"
    }
}
