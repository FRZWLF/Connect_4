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

}

var p = new Game('Frizzy','Peter', 6, 7)
p.move()
