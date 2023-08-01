class GameComponent {
    constructor(Game) {
        this.game = Game

    }

    getHTML() {
        var spielefeld = this.erzeugeSpielfeld()
        
        return spielefeld
    }

    erzeugeSpielfeld() {
        var spielefeld = /*html*/`<br><br><br><br><br>`
        
        for(let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
            spielefeld += /*html*/`<button style="width:50px">`+ String(spalte+1)+ /*html*/`</button>`
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

        return spielefeld
    }
}

module.exports = GameComponent