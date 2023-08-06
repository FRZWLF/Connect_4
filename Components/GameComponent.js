const Game = require("../Model/Game")
class GameComponent {
    constructor() {
        window.spielZug = this.spielZug.bind(this)
        window.zeigeSteinSpalte = this.zeigeSteinSpalte.bind(this)
        window.blendeSteinAus = this.blendeSteinAus.bind(this)
        window.beendeSpiel = this.beendeSpiel.bind(this)

        socket.on("GameStart", (player1, player2) => {
            appstatus.state = "inGame"
            this.game = new Game(player1, player2, 6, 7)
            this.user = appstatus.loginUser
            console.log(this.user)
            router.gotoView("game", "inGame", "game")
            if (this.game.aktiverSpieler == appstatus.loginUser.username) {
                this.zugZeitAnzeigen()
            }
            
        })

        socket.on("playerdisconnect", (socketuser) => {
            console.log(socketuser,"test")
            if(this.user.username == socketuser){
                clearInterval(this.seti)
                this.game.checkGiveUp(socketuser)
            }else{
                clearInterval(this.seti)
                this.game.checkGiveUp(socketuser)
            }

        })
        
        socket.on("matchResolve", (playerName) => {
            if (playerName) {
                clearInterval(this.seti)               
                if (!this.game.gewinnStatus) { 
                    this.game.gewinnStatus = this.user.username
                    console.log("Gewini: ",this.game.gewinnStatus)
                    this.sendHighscore()
                    router.refresh()
                    document.getElementById("Game_Leave").style.display = "flex"
                }
            }
        })

        socket.on('zeitgegner', (response) => {
            console.log(this.aufgeben)
            this.zeitabgelaufen = true
            if (response) {
                if (this.game.user1 == this.user.username) {
                    this.game.checkGiveUp(this.game.user2)                   
                } else {
                    this.game.checkGiveUp(this.game.user1)
                }
                this.sendHighscore()
                router.refresh()
                document.getElementById("Game_Leave").style.display = "flex"
                console.log("bin da")
            }
        })

        socket.on("zuggegner", (user, data) => {
            this.game.move(user, data)
            if (this.game.gewinnStatus) {
                //router.refresh()
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("Winbox").style.display = "flex"
                    console.log("ghj")
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    if (this.game.gewinnStatus == this.user.username) {
                        if(loginUser.username == this.game.user1){
                            socket.emit('newWinner', this.user.username, this.game.user2)
                        } else{
                            socket.emit('newWinner', this.user.username, this.game.user1)
                        }
                        document.getElementById("Winbox").style.display = "flex"
                        console.log("lhg")
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch. "
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                        this.sendHighscore()
                    } else {
                        document.getElementById("Winbox").style.display = "flex"
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

    sendHighscore(){
        if(this.game.gewinnStatus==this.user.username) {
            if (this.game.syncWins) {
                this.game.syncWins = false
                if (appstatus.loginUser.username == this.game.user1) socket.emit("winTracker", this.game.user1, this.game.user2)          
                if (appstatus.loginUser.username == this.game.user2) socket.emit("winTracker", this.game.user2, this.game.user1)
            }
        }
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
                
                this.game.checkGiveUp(appstatus.loginUser.username)
                router.refresh()
                clearInterval(this.seti)
                timerElement.style.display="none"


                if (this.game.user1 == this.user.username) {
                    socket.emit("Zeitabgelaufen", this.game.user2);
                    router.refresh()
                    clearInterval(this.seti)
                    timerElement.style.display="none"

                } else {
                    socket.emit('Zeitabgelaufen', this.game.user1);
                    router.refresh()
                    clearInterval(this.seti)
                    timerElement.style.display="none"
                }
                return
            }
        }, 1000);
    }

    getHTML() {
        console.log("bin in gethtml")
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
                        <div class="Lobby-button Back-Button"><button class="forms_button-action" onclick='javascript:beendeSpiel(); spielstarten()'>Back to Lobby</button></div>
                    </div>
        
            <div class="mitte Connect4">`

        body += /*html*/`<div class="Amzug"><p id="amzug"><b>Am Zug: </b> ${this.game.aktiverSpieler}</p></div>`
        body += /*html*/`<div id="spielefeld">`

        body += this.erzeugeSpielfeld()
        body += /*html*/`</div>`
        console.log("Gewinnstatus: " + this.game.gewinnStatus)
        if (!this.game.gewinnStatus) {
            body += /*html*/`<div id="Winbox"><h2 id="WinnerMessage"> </h2></div><br> `
        } else if (this.game.gewinnStatus == this.user.username) {

            this.sendHighscore()
            
            body += /*html*/`<div id="Game_TextBox"><h2 id="WinnerMessage"> Gewonnen! Herzlichen Glückwunsch.</h2></div><br>`
            
        } else if (this.game.gewinnStatus == "unentschieden") {
            body += /*html*/`<div id="Game_TextBox"><h2 id="WinnerMessage"> Unentschieden, keep trying! </h2></div><br>`
        } else {
            body += /*html*/`<div id="Game_TextBox"><h2 id="WinnerMessage"> Du hast verloren! </h2></div><br>`
        }
        if(this.zeitabgelaufen)
        body += /*html*/` <div id="Game_Leave" ><h2 id = "LoosingMessage">Dein Gegner hat gepennt!</h2></div>`
  
        body += /*html*/` <div id="Game_Leave"><h2 id = "LeavingMessage">Dein Gegner hat das Spiel verlassen!</h2></div>`


        this.aufgeben = false

        body += /*html*/`
            </div>
            <div class="rechts rechts-game">
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
            document.getElementById('timer').style.display="none"

            this.game.move(this.user.username, spalte)
            for (let spalte = 0; spalte < this.game.maxSpalte; spalte++) {

            }

            if (this.game.gewinnStatus) {
                //router.refresh()
                if (this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("Winbox").style.display = "flex"
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                    document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                } else {
                    
                    if (this.game.gewinnStatus == this.user.username) {
                        document.getElementById("Winbox").style.display = "flex"
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                        document.getElementById("amzug").innerHTML = "<b>Am Zug:</b> -"
                        this.sendHighscore()
                    } else {
                        document.getElementById("Winbox").style.display = "flex"
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