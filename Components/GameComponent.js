const Game = require("../Model/Game")
class GameComponent {
    constructor() {
        window.spielZug = this.spielZug.bind(this)
        window.zeigeSteinSpalte = this.zeigeSteinSpalte.bind(this)
        window.blendeSteinAus = this.blendeSteinAus.bind(this)

        socket.on("GameStart", (player1, player2) => {

            this.game = new Game(player1, player2, 6, 7)

            this.user = appstatus.loginUser
            router.gotoView("game")
        })


        this.game = Game
        this.user = appstatus.loginUser

        socket.on("zuggegner", (user, data) => {
            this.game.move(user, data)
            if (this.game.gewinnStatus) {
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren!"
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    }

                }
            }
            document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> " + this.game.aktiverSpieler
            document.getElementById("spielefeld").innerHTML = this.erzeugeSpielfeld()

        }



        )

    }

    getHTML() {
        var body = /*html*/`
        
        <h1>Spiel</h1>
        <p id="spieler"><b>Spieler:</b> ${this.user.username}</p>
        `

        if (this.user.username == this.game.user1) {
            body += /*html*/`<p id="gegner"><b>Spieler:</b> ${this.game.user2}</p>`
        } else {
            body += /*html*/`<p id="gegner"><b>Gegener: </b> ${this.game.user1}</p>`
        }

        body += /*html*/`<p id="amzug"><b>Am Zug: </b> ${this.game.aktiverSpieler}</p>`

        body += /*html*/`<p>Dein Stein:</p>`

        if (this.user.username == this.game.user1) {
            body += /*html*/`<img src="./img/1.gif">`
        } else {
            body += /*html*/`<img src="./img/2.gif">`
        }

        body += /*html*/`<div id="spielefeld">`

        body += this.erzeugeSpielfeld()
        body += /*html*/`</div>`
        body += /*html*/`<h2 id="WinnerMessage"> </h2>`
        return body
    }

    spielZug(spalte) {

        if (this.game.moveGueltig(this.user.username, spalte)) {

            this.game.move(this.user.username, spalte)
            for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {

            }

            if (this.game.gewinnStatus) {
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren!"
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    }
                }
            }

            if (this.game.user1 == this.user.username) {
                socket.emit('zug', this.user.username, this.game.user2, spalte);
            } else {
                socket.emit('zug', this.user.username, this.game.user1, spalte);
            }
            document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> " + this.game.aktiverSpieler
            document.getElementById("spielefeld").innerHTML = this.erzeugeSpielfeld()
        }
    }

    erzeugeSpielfeld() {
        var spielefeld = /*html*/``

        for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {

            if (this.game.moveGueltig(this.user.username, spalte)) {
                spielefeld += /*html*/`<button style="width:50px" id="button-${spalte}" onmouseover="zeigeSteinSpalte(${spalte})"  onmouseout="blendeSteinAus(${spalte})"  onclick="spielZug( ${spalte})"> ${spalte + 1} </button>`
            } else {
                spielefeld += /*html*/`<button style="width:50px" id="button-${spalte}" disabled="true"> ${spalte + 1} </button>`
            }
        }

        spielefeld += /*html*/`<br>`

        for (let zeile = 0; zeile < this.game.maxZeile; zeile++) {


            for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
                if (this.game.spielfeld[zeile][spalte] == 1) {
                    spielefeld += /*html*/`<img id="spalte-${spalte} zeile-${zeile}" onmouseover="zeigeSteinSpalte(${spalte})"  onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" src="./img/1.gif">`
                } else if (this.game.spielfeld[zeile][spalte] == 2) {
                    spielefeld += /*html*/`<img id="spalte-${spalte} zeile-${zeile}"  onmouseover="zeigeSteinSpalte(${spalte})" onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" src="./img/2.gif">`
                } else {
                    spielefeld += /*html*/`<img id="spalte-${spalte} zeile-${zeile}" onmouseover="zeigeSteinSpalte(${spalte})" onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" src="./img/0.gif">`
                }
            }
            spielefeld += /*html*/`<br>`
        }

        return spielefeld
    }

    zeigeSteinSpalte(spalte) {
        if (this.user.username == this.game.aktiverSpieler && !this.game.gewinnStatus) {
            for (let zeilenZahl = this.game.maxZeile - 1; zeilenZahl < this.game.maxZeile; zeilenZahl--) {
                if (this.game.spielfeld[zeilenZahl][spalte] == 0) {
                    if (this.user.username == this.game.user1) {
                        document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).src = "./img/1_transparent.gif"
                    } else {
                        document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).src = "./img/2_transparent.gif"
                    }

                    break
                }
            }
        }
    }

    blendeSteinAus(spalte) {
        if (this.user.username == this.game.aktiverSpieler) {
            for (let zeilenZahl = this.game.maxZeile - 1; zeilenZahl < this.game.maxZeile; zeilenZahl--) {
                if (this.game.spielfeld[zeilenZahl][spalte] == 0) {
                    document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).src = "./img/0.gif"
                    break
                }
            }
        }
    }



}

module.exports = GameComponent