const GameAI = require("../Model/GameAI")
class GameComponentAI {
    constructor() {
        window.spielKIStarten = this.spielKIStarten.bind(this)
        window.restartSpiel = this.restartSpiel.bind(this)
        window.spielZug = this.spielZug.bind(this)
        window.zeigeSteinSpalte = this.zeigeSteinSpalte.bind(this)
        window.blendeSteinAus = this.blendeSteinAus.bind(this)        
    }

    spielKIStarten() {
        this.game = new GameAI(appstatus.loginUser.username, 6, 7, 3)
        this.user = appstatus.loginUser
        router.gotoView("gameAI", "logedin", "gameAI")
    }

    getHTML() {
        var body = /*html*/`
        <div class="Game">
            <div class="spielregeln-window game-window">
                <div class="gameContent">
                    <div class="links">
                        <div class="You_Player">`
        body += /*html*/`<p>Dein Stein:</p>`
        body += /*html*/`<img src="./img/1.gif">`
        body += /*html*/`<p id="timer"></p>`

        body += /*html*/` 
                        </div>
                    </div>
        
            <div class="mitte Connect4">`

        body += /*html*/`<p id="amzug"><b>Am Zug: </b> </p>`
        body += /*html*/`<input id="slide_dif" type="range" min="2" max="5" step="1" value="3">
        <div id="sliderAmount"></div><div id="spielefeld">`

        body += this.erzeugeSpielfeld()
        body += /*html*/`</div>`
     
        if (!this.game.gewinnStatus) {
            body += /*html*/`<h2 id="WinnerMessage"> </h2><br> <button onclick='restartSpiel()'>Restart Game</button>`
        } else if (this.game.gewinnStatus == this.user.username) {
            body += /*html*/`<h2 id="WinnerMessage"> Gewonnen! Herzlichen Glückwunsch.</h2><br> <button onclick='restartSpiel()'>Restart Game</button>`
            if(this.aufgeben){
            body += /*html*/` <div id = "LeavingMessage"><h2>Dein Gegner hat das Spiel verlassen!</h2></div>`
            }
        } else if (this.game.gewinnStatus == "unentschieden") {
            body += /*html*/`<h2 id="WinnerMessage"> Unentschieden, keep trying! </h2><br> <button onclick='restartSpiel()'>Restart Game</button>`
        } else {
            body += /*html*/`<h2 id="WinnerMessage"> Du hast verloren! </h2><br> <button onclick='restartSpiel()'>Restart Game</button>`
        }
        body += /*html*/` <div id = "LoosingMessage" style = "display:none;"><h2>Dein Gegner hat gepennt!</h2></div>`

        this.aufgeben = false

        body += /*html*/`
            </div>
            <div class="rechts">`

        if (this.user.username == this.game.user1) {

            body += /*html*/`<p id="gegner"><b>Gegner:</b> ${this.game.user2}</p>`
        } else {
            body += /*html*/`<p id="gegner"><b>Gegner: </b> ${this.game.user1}</p>`
        }

        body += /*html*/` 
            </div>
            
            `
            
        body += /*html*/`
        </div>
        </div>
        </div>
        `


        return body
    }

    spielZug(spalte) {
        if (this.game.moveGueltig(this.user.username, spalte)) {
            try { clearInterval(this.seti) } catch { }
            document.getElementById('timer').innerHTML = ""

            this.game.move(this.user.username, spalte)


            if (this.game.gewinnStatus) {
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren! "
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    }
                }
            } else {
               this.game.zugGegner()
               if (this.game.gewinnStatus) {
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren! "
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    }
                }
            }
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
        } 2
    }

    restartSpiel() {
        delete(this.game)
        this.spielKIStarten()
        router.refresh()
    }

}

module.exports = GameComponentAI