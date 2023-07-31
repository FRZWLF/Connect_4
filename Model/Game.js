class Game {

  //Model
  constructor(user1, user2, maxZeile, maxSpalte) {
    this.user1 = user1
    this.user2 = user2
    this.maxZeile = maxZeile
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

  move(user, spalte) {
    let amZug = this.getUserNummer(user)

    if (user != this.aktiverSpieler) {
      console.error("Nicht am Zug.")
      return
    }

    for (let zeile = this.maxZeile - 1; zeile >= 0; zeile--) {
      if (this.spielfeld[zeile][spalte] == 0) {
        this.spielfeld[zeile][spalte] = amZug;

        if (amZug == 1) {
          this.aktiverSpieler = this.user2
        } else {
          this.aktiverSpieler = this.user1
        }
        return
      }
    }
  }

  checkWinner(maxZeile, maxSpalte, playerID) {
    //horizontally
    for (zeile = 0; zeile < maxZeile; zeile++) {
      for (spalte = 0; spalte < maxSpalte - 3; spalte++) {
        if (spielfeld[zeile][spalte] = ' ') {
          if (spielfeld[zeile][spalte] === playerID && spielfeld[zeile][spalte + 1] === playerID && spielfeld[zeile][spalte + 2] === playerID && spielfeld[zeile][spalte + 3] === playerID) {
            //setWinner(zeile,spalte)
            return true;
          }
        }
      }
    }
    //vertically
    for (spalte = 0; spalte < maxSpalte; spalte++) {
      for (zeile = 0; zeile < maxZeile - 3; zeile++) {
        if (spielfeld[zeile][spalte] = ' ') {
          if (spielfeld[zeile][spalte] === playerID && spielfeld[zeile + 1][spalte] === playerID && spielfeld[zeile + 2][spalte] === playerID && spielfeld[zeile + 3][spalte] === playerID) {
            //setWinner(zeile,spalte)
            return true;
          }
        }
      }
    }
    //anti diagonally
    for (zeile = 0; zeile < maxZeile - 3; zeile++) {
      for (spalte = 0; spalte < maxSpalte - 3; spalte++) {
        if (spielfeld[zeile][spalte] = ' ') {
          if (spielfeld[zeile][spalte] === playerID && spielfeld[zeile + 1][spalte + 1] === playerID && spielfeld[zeile + 2][spalte + 2] === playerID && spielfeld[zeile + 3][spalte + 3] === playerID) {
            //setWinner(zeile,spalte)
            return true;
          }
        }
      }
    }
    //diagonally
    for (zeile = 3; zeile < maxZeile; zeile++) {
      for (spalte = 0; spalte < maxSpalte - 3; spalte++) {
        if (spielfeld[zeile][spalte] = ' ') {
          if (spielfeld[zeile][spalte] === playerID && spielfeld[zeile - 1][spalte + 1] === playerID && spielfeld[zeile - 2][spalte + 2] === playerID && spielfeld[zeile - 3][spalte + 3] === playerID) {
            //setWinner(zeile,spalte)
            return true;
          }
        }
      }
    }
    return false;
  }

  checkGiveUp() {
    if (eingabe === 'give-up') {
      console.log("Player %d left the game.", playerID)
      setWinner()
      return 0;
    }
  }

  setWinner() {

  }
}