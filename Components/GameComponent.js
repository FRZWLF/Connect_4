const Game = require("../Model/Game")
class GameComponent {
    constructor() {
        socket.on("GameStart",(player1,player2)=>{

                this.game = new Game(player1,player2,6,7)
            
            this.user = appstatus.loginUser
            router.gotoView("game")
        })
        


        socket.on("zuggegner", (user, data) => {
            this.game.move(user, data)
            if(this.game.gewinnStatus) {
                if(this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                } else {
                    if(this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren!"
                    }

                }
            }  
            
            
            var spielfeldupdated = document.getElementById("spielefeld")
            spielfeldupdated.innerHTML = this.erzeugeSpielfeld()
        })
        window.spielZug = this.spielZug.bind(this)
    }

    getHTML() {
        var body = /*html*/`

        <br><br><br><br>
        
        <h1>Spiel</h1>
        <p id="spieler"><b>Spieler:</b> ${this.user.username}</p>
        `

        if(this.user.username == this.game.user1) {
            body += /*html*/`<p id="gegner"><b>Gegener:</b> ${this.game.user2}</p>`
        } else {
            body += /*html*/`<p id="gegner"><b>Gegener: </b> ${this.game.user1}</p>`
        }

        body += /*html*/`<p>Dein Stein:</p>`

        if(this.user.username == this.game.user1) {
           body += /*html*/`<img src="./img/1.gif">`
        } else {
            body += /*html*/`<img src="./img/2.gif">`
        }

        

        body += this.erzeugeSpielfeld()
        body += /*html*/`<h2 id="WinnerMessage"> </h2>`
        return body
    }

    spielZug(spalte) {

        if(this.game.moveGueltig(this.user.username, spalte)) {

            this.game.move(this.user.username, spalte)
            for(let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
                
            }

            if(this.game.gewinnStatus) {
                if(this.game.gewinnStatus == "unentschieden") {
                    document.getElementById("WinnerMessage").innerHTML = "Leider kein Gewinner."
                } else {
                    if(this.game.gewinnStatus == this.user.username) {
                        document.getElementById("WinnerMessage").innerHTML = "Gewonnen! Herzlichen Glückwunsch."
                    } else {
                        document.getElementById("WinnerMessage").innerHTML = "Du hast verloren!"
                    }
                }
            } 

            if(this.game.user1 == this.user.username) {
                socket.emit('zug', this.user.username, this.game.user2, spalte);
            } else {
                socket.emit('zug', this.user.username, this.game.user1, spalte);
            }  

            var spielfeldupdated = document.getElementById("spielefeld")
            spielfeldupdated.innerHTML = this.erzeugeSpielfeld()
        }      
    }

    erzeugeSpielfeld() {
        var spielefeld = /*html*/`<div id="spielefeld">`
        
        for(let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
            spielefeld += /*html*/`<button style="width:50px" id="button-${spalte}" onclick="spielZug( ${spalte})"> ${spalte+1} </button>`
        }
        
        spielefeld += /*html*/`<br>`

        for(let zeile = 0; zeile < this.game.maxZeile; zeile++) {
            

            for(let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
                if(this.game.spielfeld[zeile][spalte] == 1) {
                    spielefeld += /*html*/`<img src="./img/1.gif">`
                } else if(this.game.spielfeld[zeile][spalte] == 2) {
                    spielefeld += /*html*/`<img src="./img/2.gif">`
                } else {
                    spielefeld += /*html*/`<img src="./img/0.gif">`
                }
            }
            spielefeld += /*html*/`<br>`
        }

        spielefeld += /*html*/`</div>`

        return spielefeld
    }




}

module.exports = GameComponent