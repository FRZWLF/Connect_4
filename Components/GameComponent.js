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
            
            if (playerName) {
                
                router.refresh()
                clearInterval(this.seti)

                if (!this.game.gewinnStatus) { 
                    console.log('dadadad')
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                    this.game.gewinnStatus = this.user.username
                    this.aufgeben = true
                }
            }
            
        })

        socket.on('zeitgegner', (response) => {
            console.log(this.aufgeben)
            if (response) {
                if (this.game.user1 == this.user.username) {
                    this.game.checkGiveUp(this.game.user2)
                } else {
                    this.game.checkGiveUp(this.game.user1)
                }
                router.refresh()
                document.getElementById("LoosingMessage").style.display = "flex"
            }
        })


        socket.on("zuggegner", (user, data) => {


            this.game.move(user, data)
            if (this.game.gewinnStatus) {
                //router.refresh()
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
            timerElement.style.display="flex"
            timerElement.innerText = 'Automatischer Abbruch in:  ' + this.zugzeit;

            if (this.zugzeit <= 0) {
                
                timerElement.innerText = " ";
                timerElement.style.display="none"
                this.game.checkGiveUp(appstatus.loginUser.username)
                router.refresh()
                clearInterval(this.seti)


                if (this.game.user1 == this.user.username) {
                    socket.emit("Zeitabgelaufen", this.game.user2);
                    router.refresh()
                    clearInterval(this.seti)

                } else {
                    socket.emit('Zeitabgelaufen', this.game.user1);
                    router.refresh()
                    clearInterval(this.seti)
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

        body += /*html*/`<div class="Amzug"><p id="amzug"><b>Am Zug: </b> ${this.game.aktiverSpieler}</p></div>`
        body += /*html*/`<div id="spielefeld">`

        body += this.erzeugeSpielfeld()
        body += /*html*/`</div>`
        console.log(this.game.gewinnStatus)
        if (!this.game.gewinnStatus) {
            body += /*html*/`<div class="Game_Textbox Winbox"><h2 id="WinnerMessage"> </h2><br> <div class="Lobby-button"><button class="forms_button-action" onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button></div>`
        } else if (this.game.gewinnStatus == this.user.username) {
            body += /*html*/`<div class="Game_TextBox"><h2 id="WinnerMessage"> Gewonnen! Herzlichen Glückwunsch.</h2></div><br> <div class="Lobby-button"><button  class="forms_button-action" onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button></div>`
            if(this.aufgeben){
            body += /*html*/` <div class="Game_Leave"><h2 id = "LeavingMessage">Dein Gegner hat das Spiel verlassen!</h2></div>`
            }
        } else if (this.game.gewinnStatus == "unentschieden") {
            body += /*html*/`<div class="Game_TextBox"><h2 id="WinnerMessage"> Unentschieden, keep trying! </h2></div><br> <div class="Lobby-button"><button  class="forms_button-action" onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button></div>`
        } else {
            body += /*html*/`<div class="Game_TextBox"><h2 id="WinnerMessage"> Du hast verloren! </h2></div><br> <div class="Lobby-button"><button  class="forms_button-action" onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button></div>`
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

    spielZug(spalte) {

        if (this.game.moveGueltig(this.user.username, spalte)) {

            try { clearInterval(this.seti) } catch { }
            document.getElementById('timer').innerHTML = ""

            this.game.move(this.user.username, spalte)
            for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {

            }

            if (this.game.gewinnStatus) {
                //router.refresh()
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

        // for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {

        //     if (this.game.moveGueltig(this.user.username, spalte)) {
        //         spielefeld += /*html*/`<button style="width:50px" id="button-${spalte}" onmouseover="zeigeSteinSpalte(${spalte})"  onmouseout="blendeSteinAus(${spalte})"  onclick="spielZug( ${spalte})"> ${spalte + 1} </button>`
        //     } else {
        //         spielefeld += /*html*/`<button style="width:50px" id="button-${spalte}" disabled="true"> ${spalte + 1} </button>`
        //     }
        // }

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

    zeigeSteinSpalte(spalte) {
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

    blendeSteinAus(spalte) {
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