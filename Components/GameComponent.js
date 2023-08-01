class GameComponent {
    constructor(Game) {
        this.game = Game
    }

    getHTML() {
        var spielefeld = this.erzeugeSpielfeld()
    }

    erzeugeSpielfeld() {
        var spielefeld = /*html*/``

        for(let zeile = 0; zeile < this.game.maxZeile; zeile++) {
            for(let spalte = 0; spalte < this.game.maxSpalte; spalte++) {
                if(this.game.spielfeld[zeile][spalte] == 1) {
                    spielefeld += /*html*/`<img src="../public/img/1.gif">`
                } else if(this.game.spielfeld[zeile][spalte] == 2) {
                    spielefeld += /*html*/`<img src="../public/img/2.gif">`
                } else {
                    spielefeld += /*html*/`<img src="../public/img/0.gif">`
                }
            }
            spielefeld += /*html*/`<br>`
        }

        return spielefeld
    }
}