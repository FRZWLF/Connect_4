const { time } = require("console");

class Game {

    //Model
    constructor(user1, user2, maxZeile, maxSpalte){
        this.user1 = user1
        this.user2 = user2
        this.spielfeld = new Array(maxZeile).fill(0).map(()=>new Array(maxSpalte).fill(0));
      }
      // Controller
      move(user, spalte){
        
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

var p = new Game('Frizzy','Peter', 6, 7)
p.move()