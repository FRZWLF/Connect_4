const GameAI = require("../Model/GameAI")
class GameComponentAI {
    constructor() {
        window.spielKIStarten = this.spielKIStarten.bind(this)
        window.restartSpiel = this.restartSpiel.bind(this)
        window.spielZugAI = this.spielZugAI.bind(this)
        window.zeigeSteinSpalteAI = this.zeigeSteinSpalteAI.bind(this)
        window.blendeSteinAusAI = this.blendeSteinAusAI.bind(this)
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
                    <div class="links links-game">
                        <div class="You_Player">
                            <p id="spieler"><b class="Player-font">Spieler</b> <p class="Game-Username">${this.user.username}</p></p>`
        body += /*html*/`<div id="Player-Stone"><p class="Player-Stone">Dein Stein</p>`

        if (this.user.username == this.game.user1) {
            body += /*html*/`<div class="tile yellow-piece"></div>`
        } else {
            body += /*html*/`<div class="tile red-piece"></div>`
        }
        body += /*html*/`</div>`
        body += /*html*/`<p id="timer"></p>`

        body += /*html*/` 
                       
                    </div>
                    </div>
        
            <div class="mitte Connect4">`

        body += /*html*/`<div class="Amzug"><p id="amzug"><b>Schwierigkeit:</b> <input id="slide_dif" type="range" min="2" max="5" step="1" value="3"></p> </div>`
        body += /*html*/`
        <div id="spielefeld">`

        body += this.erzeugeSpielfeld()
        body += /*html*/`</div>`
        console.log("Gewinnstatus: " + this.game.gewinnStatus)
        if (!this.game.gewinnStatus) {
            body += /*html*/`<div class="Game_Textbox Winbox"><h2 id="WinnerMessage"> </h2></div><br> <div class="Lobby-button"><button class="forms_button-action" onclick='javascript:restartSpiel()'>Restart</button></div>`
        } else if (this.game.gewinnStatus == this.user.username) {

            this.sendHighscore()

            body += /*html*/`<h2 id="WinnerMessage"> Gewonnen! Herzlichen Glückwunsch.</h2><br> <button onclick='javascript:restartSpiel()'>Restart</button>`
            if (this.aufgeben) {
                body += /*html*/` <div class="Game_Leave"><h2 id = "LeavingMessage">Dein Gegner hat das Spiel verlassen!</h2></div>`
            }
        } else if (this.game.gewinnStatus == "unentschieden") {
            body += /*html*/`<div class="Game_TextBox"><h2 id="WinnerMessage"> Unentschieden, keep trying! </h2></div><br> <div class="Lobby-button"><button  class="forms_button-action" onclick='javascript:restartSpiel()'>Restart</button></div>`
        } else {
            body += /*html*/`<div class="Game_TextBox"><h2 id="WinnerMessage"> Du hast verloren! </h2></div><br> <div class="Lobby-button"><button  class="forms_button-action" onclick='javascript:restartSpiel()'>Restart</button></div>`
        }
        body += /*html*/` <div class="Game_Leave" style = "display:none;"><h2 id = "LoosingMessage">Dein Gegner hat gepennt!</h2></div>`

        this.aufgeben = false

        body += /*html*/`
            </div>
            <div class="rechts links-game">
                <div class="Opp_Player">`
        if (this.user.username == this.game.user1) {

            body += /*html*/`<p id="gegner"><b class="Player-font">Gegner</b> <p class="Game-Username">${this.game.user2}</p></p>`
        } else {
            body += /*html*/`<p id="gegner"><b class="Player-font">Gegner </b> <p class="Game-Username">${this.game.user1}</p></p>`
        }

        body += /*html*/` 
                    </div>
            </div>`
        body += /*html*/`
        </div>
        </div>
        </div>
        `


        return body
    }

    spielZugAI(spalte) {
        if (this.game.moveGueltig(this.user.username, spalte)) {
            try { clearInterval(this.seti) } catch { }
            document.getElementById('timer').innerHTML = ""

            this.game.move(this.user.username, spalte)


            if (this.game.gewinnStatus) {
                //router.refresh()
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."

                } else {

                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."

                        this.sendHighscore()
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren! "

                    }
                }

            } else {

                this.game.zugGegner()
                if (this.game.gewinnStatus) {
                    if (this.game.gewinnStatus == "unentschieden") {
                        document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."

                    } else {

                        if (this.game.gewinnStatus == this.user.username) {
                            document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."

                            this.sendHighscore()
                        } else {
                            document.getElementById("WinnerMessage").innerHTML = "Du hast verloren! "

                        }
                    }
                }
                document.getElementById("spielefeld").innerHTML = this.erzeugeSpielfeld()
            }
        }
    }

    erzeugeSpielfeld() {
        var spielefeld = /*html*/``
        spielefeld += /*html*/`<br>`

        for (let zeile = 0; zeile < this.game.maxZeile; zeile++) {


            for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
                if (this.game.spielfeld[zeile][spalte] == 1) {
                    spielefeld += /*html*/`<div id="spalte-${spalte} zeile-${zeile}" onmouseover="zeigeSteinSpalte(${spalte})"  onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" class="tile yellow-piece"></div>`
                } else if (this.game.spielfeld[zeile][spalte] == 2) {
                    spielefeld += /*html*/`<div id="spalte-${spalte} zeile-${zeile}"  onmouseover="zeigeSteinSpalte(${spalte})" onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" class="tile red-piece"></div>`
                } else {
                    spielefeld += /*html*/`<div id="spalte-${spalte} zeile-${zeile}" onmouseover="zeigeSteinSpalte(${spalte})" onmouseout="blendeSteinAus(${spalte})" onClick="spielZug( ${spalte})" class="tile"></div>`
                }
            }
            spielefeld += /*html*/`<br>`
        }

        return spielefeld
    }

    zeigeSteinSpalteAI(spalte) {
        if (this.user.username == this.game.aktiverSpieler && !this.game.gewinnStatus) {
            for (let zeilenZahl = this.game.maxZeile - 1; zeilenZahl < this.game.maxZeile; zeilenZahl--) {
                if (this.game.spielfeld[zeilenZahl][spalte] == 0) {
                    if (this.user.username == this.game.user1) {
                        document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).classList.add("yellow-piece-trans")
                    } else {
                        document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).classList.add("red-piece-trans")
                    }

                    break
                }
            }
        }
    }

    blendeSteinAusAI(spalte) {
        if (this.user.username == this.game.aktiverSpieler) {
            for (let zeilenZahl = this.game.maxZeile - 1; zeilenZahl < this.game.maxZeile; zeilenZahl--) {
                if (this.game.spielfeld[zeilenZahl][spalte] == 0) {
                    document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).classList.add("tile")
                    document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).classList.remove("red-piece-trans")
                    document.getElementById("spalte-" + spalte + " zeile-" + zeilenZahl).classList.remove("yellow-piece-trans")
                    break
                }
            }
        } 2
    }

    restartSpiel() {
        delete (this.game)
        this.spielKIStarten()
        router.refresh()
    }

}

module.exports = GameComponentAI