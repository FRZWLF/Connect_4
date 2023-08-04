class ShopComponent {
    constructor() {
        // this.balance = appstatus.loginUser.wallet + " G"
        window.register = this.buyPoker.bind(this)
        window.register = this.buyDollar.bind(this)
    }


    getHTML() {
        appstatus.loginUser.wallet +=100
        var text = /*html*/`
        <br>
        <h1>THE SHOP</h1>
        <br>
        `
        text += "Your balance: " + appstatus.loginUser.wallet +" G"
        text += /*html*/`<br><h2>Royal Flush Set</h2><br>
        <img src="./img/Poker_1.gif">
        <img src="./img/Poker_2.gif">`
        if (appstatus.loginUser.primaryskin.includes("./img/Poker_1.gif")) {
            text += /*html*/`<br>` + "Out of Stock"
        } else if (appstatus.loginUser.wallet < 50) {
            text += "Kosten: 50 G"
        } else {
            text += /*html*/`
            <br>
            <button onclick="buyPoker()" id="Pokey">Kaufen für 50 G</button>`
        }
        return (text)
    }

    buyPoker() {
        const Poker = document.getElementById('Pokey');
        Poker.style.display = 'none'
        appstatus.loginUser.wallet -= 50
        appstatus.loginUser.addSkin("./img/Poker_1.gif", "./img/Poker_2.gif")
        socket.emit("userUpdated",appstatus.loginUser)
        router.refresh()
    }
    buyDollar() {

    }
}
module.exports = ShopComponent
