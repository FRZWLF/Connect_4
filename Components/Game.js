class Game {

    //Model
    constructor(user1, user2, maxZeile, maxSpalte){
        this.user1 = user1
        this.user2 = user2
        this.spielfeld = this.erzeugeSpielfeld(maxZeile, maxSpalte);
      }

      // Controller
      erzeugeSpielfeld(maxZeile, maxSpalte) {
        spielfeld = [[],[],[]]
        for(zeile= 0; zeile < maxZeile; zeile++) {
            for(spalte = 0; spalte < maxSpalte; spalte++) {

            }
        }
      }

}