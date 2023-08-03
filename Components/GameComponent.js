const Game = require("../Model/Game")
class GameComponent {
    constructor() {
        window.spielZug = this.spielZug.bind(this)
        window.zeigeSteinSpalte = this.zeigeSteinSpalte.bind(this)
        window.blendeSteinAus = this.blendeSteinAus.bind(this)
        window.beendeSpiel = this.beendeSpiel.bind(this)

        socket.on("GameStart", (player1, player2) => {
            this.game = new Game(player1, player2, 6, 7)
            this.user = appstatus.loginUser
            router.gotoView("game")
            if (this.game.aktiverSpieler == appstatus.loginUser.username) {
                this.zugZeitAnzeigen()
            }
        })

        socket.on("matchResolve", (playerName) => {
            console.log("hello")
            if (!this.game.gewinnStatus) {
                document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                document.getElementById("WinnerMessage").innerHTML = "Gewonnen, der Gegener hat das Spiel verlassen! Herzlichen Glückwunsch. "
                this.game.gewinnStatus = this.user.username

            }
        })

        socket.on('zeitgegner', (response) => {
          
            if (response) {
                if (this.game.user1 == this.user.username) {
                    this.game.checkGiveUp(this.game.user2)
                } else {
                    this.game.checkGiveUp(this.game.user1)
                }
                router.refresh()
                document.getElementById("LoosingMessage").style.display ="flex"
            }
        })


        socket.on("zuggegner", (user, data) => {
            
            this.game.move(user, data)
           //try { clearInterval(this.seti) } catch { }
            if (this.game.gewinnStatus) {
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch. "
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren!"
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    }

                }
            } else {
                document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> " + this.game.aktiverSpieler
                this.zugZeitAnzeigen()
            }
            document.getElementById("spielefeld").innerHTML = this.erzeugeSpielfeld()
        })
    }

    zugZeitAnzeigen() {
        try { clearInterval(this.seti) } catch { }
        this.zugzeit = 10

        //Timer Start
        this.seti = setInterval(() => {
            const timerElement = document.getElementById('timer');
            this.zugzeit--;
            timerElement.innerText = 'Automatischer Abbruch in:' + this.zugzeit;

            if (this.zugzeit <= 0) {
                timerElement.innerText = " ";
                this.game.checkGiveUp(appstatus.loginUser.username)
                router.refresh()
                clearInterval(this.seti)


                if (this.game.user1 == this.user.username) {
                    socket.emit("Zeitabgelaufen", this.game.user2);
                } else {
                    socket.emit('Zeitabgelaufen', this.game.user1);
                }
                return
            }
        }, 1000);
    }

    getHTML() {
        var body = /*html*/`
        <div class="Game">
            <div class="spielregeln-window game-window">
                <div class="gameContent">
                    <div class="links">
                        <div class="You_Player">
                            <p id="spieler"><b>Spieler:</b> ${this.user.username}</p>`
                            body += /*html*/`<p>Dein Stein:</p>`

                            if (this.user.username == this.game.user1) {
                                body += /*html*/`<img src="./img/1.gif">`
                            } else {
                                body += /*html*/`<img src="./img/2.gif">`
                            }
                            body += /*html*/`<p id="timer"></p>`
                                    
                            body += /*html*/` 
                        </div>
                    </div>
        
            <div class="mitte Connect4">`

                body += /*html*/`<p id="amzug"><b>Am Zug: </b> ${this.game.aktiverSpieler}</p>`
                body += /*html*/`<div id="spielefeld">`

                body += this.erzeugeSpielfeld()
                body += /*html*/`</div>`
                console.log(this.game.gewinnStatus)
                if (!this.game.gewinnStatus) {
                    body += /*html*/`<h2 id="WinnerMessage"> </h2><br> <button onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button>`
                } else if (this.game.gewinnStatus == this.user.username) {
                    body += /*html*/`<h2 id="WinnerMessage"> Gewonnen! Herzlichen Glückwunsch. </h2><br> <button onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button>`
                } else if (this.game.gewinnStatus == "unentschieden") {
                    body += /*html*/`<h2 id="WinnerMessage"> Unentschieden, keep trying! </h2><br> <button onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button>`
                } else {
                    body += /*html*/`<h2 id="WinnerMessage"> Du hast verloren! </h2><br> <button onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button>`
                }
                    body += /*html*/` <div id = "LoosingMessage" style = "display:none;"><h2>Dein Gegner hat gepennt!</h2></div>`

                body += /*html*/`
            </div>
            <div class="rechts">`
                
                if (this.user.username == this.game.user1) {

                    body += /*html*/`<p id="gegner"><b>Gegner:</b> ${this.game.user2}</p>`
                } else {
                    body += /*html*/`<p id="gegner"><b>Gegner: </b> ${this.game.user1}</p>`
                }

                body += /*html*/` 
            </div>`
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
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren! "
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
        } 2
    }

    beendeSpiel() {
        if (this.user.username == this.game.user1) {
            socket.emit('matchtResolveToServer', this.user.username, this.game.user2)
        } else {
            socket.emit('matchtResolveToServer', this.user.username, this.game.user1)
        }
        delete (this.game)
    }

}

module.exports = GameComponent