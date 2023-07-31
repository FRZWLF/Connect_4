module.exports = class Game {

  //Model
  constructor(user1, user2, maxZeile, maxSpalte) {
    this.user1 = user1
    this.user2 = user2
    this.maxZeile = maxZeile
    this.gewinnStatus = null
    this.aktiverSpieler = user1 // Anfangsspieler
    this.maxSpalte = maxSpalte
    this.spielfeld = new Array(maxZeile).fill(0).map(() => new Array(maxSpalte).fill(0));
  }
  // Controller

  getUserNummer(user) {
    let userNummmer
    if (user == this.user1) {
      userNummmer = 1
    } else if (user == this.user2) {
      userNummmer = 2
    } else {
      console.error("Not geben.")
      return
    }
    return userNummmer
  }

  moveGueltig(user, spalte) {
    if(!this.gewinnStatus) {
      if (user != this.aktiverSpieler) return false
      if (this.spielfeld[0][spalte] != 0) return false
      return true
    } else {
      return false
    }
  }

  move(user, spalte) {
    let amZug = this.getUserNummer(user)

    if(!this.moveGueltig(user, spalte)) return false

    for (let zeile = this.maxZeile - 1; zeile >= 0; zeile--) {
      if (this.spielfeld[zeile][spalte] == 0 && spalte < this.maxSpalte) {
        this.spielfeld[zeile][spalte] = amZug;

        this.checkWinner(amZug)

        if (amZug == 1) {
          this.aktiverSpieler = this.user2
        } else {
          this.aktiverSpieler = this.user1
        }

        break
      }
    }
  }

  checkWinner(playerID) {
    //horizontally
    for (let zeile = 0; zeile < this.maxZeile; zeile++) {
      for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
          if (this.spielfeld[zeile][spalte] === playerID && this.spielfeld[zeile][spalte + 1] === playerID && this.spielfeld[zeile][spalte + 2] === playerID && this.spielfeld[zeile][spalte + 3] === playerID) {

            if(playerID == 1) {
              this.gewinnStatus = this.user1;
            } else {
              this.gewinnStatus = this.user2;
            }
            return true;
          }
        
      }
    }
    //vertically
    for (let spalte = 0; spalte < this.maxSpalte; spalte++) {
      for (let zeile = 0; zeile < this.maxZeile - 3; zeile++) {

          if (this.spielfeld[zeile][spalte] === playerID && this.spielfeld[zeile + 1][spalte] === playerID && this.spielfeld[zeile + 2][spalte] === playerID && this.spielfeld[zeile + 3][spalte] === playerID) {

            if(playerID == 1) {
              this.gewinnStatus = this.user1;
            } else {
              this.gewinnStatus = this.user2;
            }
            console.log(this.gewinnStatus)
            return true;
          }
        
      }
    }
    //anti diagonally
    for (let zeile = 0; zeile < this.maxZeile - 3; zeile++) {
      for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
          if (this.spielfeld[zeile][spalte] === playerID && this.spielfeld[zeile + 1][spalte + 1] === playerID && this.spielfeld[zeile + 2][spalte + 2] === playerID && this.spielfeld[zeile + 3][spalte + 3] === playerID) {
     
            if(playerID == 1) {
              this.gewinnStatus = this.user1;
            } else {
              this.gewinnStatus = this.user2;
            }
            return true;
          }
        
      }
    }
    //diagonally
    for (let zeile = 3; zeile < this.maxZeile; zeile++) {
      for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {

          if (this.spielfeld[zeile][spalte] === playerID && this.spielfeld[zeile - 1][spalte + 1] === playerID && this.spielfeld[zeile - 2][spalte + 2] === playerID && this.spielfeld[zeile - 3][spalte + 3] === playerID) {

            if(playerID == 1) {
              this.gewinnStatus = this.user1;
            } else {
              this.gewinnStatus = this.user2;
            }
            return true;
          }
        
      }
    }
    if(this.unentschieden()){
      this.gewinnStatus = "unentschieden"
      return true
    }
    return false;
  }

  unentschieden(){
    for(let spalte = 0; spalte < this.maxSpalte; spalte++){
      if (this.spielfeld[0][spalte] == 0) {
        return false
        }
    }
    return true
  }

  checkGiveUp(user) {
      console.log(`Player ${user} gave up.`)
      if(user == this.user1) {
        this.gewinnStatus = this.user2;
      } else {
        this.gewinnStatus = this.user1;
      }
      return true;
  }

}