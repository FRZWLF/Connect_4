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


      checkWinner(maxZeile, maxSpalte, playerID){
        	//horizontally
          for(zeile = 0; zeile< maxZeile; zeile++) {
            for(spalte = 0; spalte < maxSpalte -3; spalte++){
              if(spielfeld[zeile][spalte] = ' '){
                if(spielfeld[zeile][spalte] === playerID && spielfeld[zeile][spalte+1] === playerID && spielfeld[zeile][spalte+2] === playerID && spielfeld[zeile][spalte+3] === playerID) {
                  //setWinner()
                  return true;
                }
            }
          }
        }
          //vertically
          for(zeile = 0; zeile< maxZeile; zeile++) {
            for(spalte = 0; spalte < maxSpalte -3; spalte++){
              if(spielfeld[zeile][spalte] = ' '){
                if(spielfeld[zeile][spalte] === playerID && spielfeld[zeile][spalte+1] === playerID && spielfeld[zeile][spalte+2] === playerID && spielfeld[zeile][spalte+3] === playerID) {
                  //setWinner()
                  return true;
                }
            }
          }
        }
          //anti diagonally
          for(zeile = 0; zeile< maxZeile; zeile++) {
            for(spalte = 0; spalte < maxSpalte -3; spalte++){
              if(spielfeld[zeile][spalte] = ' '){
                if(spielfeld[zeile][spalte] === playerID && spielfeld[zeile][spalte+1] === playerID && spielfeld[zeile][spalte+2] === playerID && spielfeld[zeile][spalte+3] === playerID) {
                  //setWinner()
                  return true;
                }
            }
          }
        }
          //diagonally
          for(zeile = 0; zeile< maxZeile; zeile++) {
            for(spalte = 0; spalte < maxSpalte -3; spalte++){
              if(spielfeld[zeile][spalte] = ' '){
                if(spielfeld[zeile][spalte] === playerID && spielfeld[zeile][spalte+1] === playerID && spielfeld[zeile][spalte+2] === playerID && spielfeld[zeile][spalte+3] === playerID) {
                  //setWinner()
                  return true;
                }
            }
          }
        }
      }
    
    }