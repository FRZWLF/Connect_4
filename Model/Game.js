// Exportieren der Klasse "Game".
module.exports = class Game {

  //Model
  // Konstruktor der Klasse, der beim Erzeugen eines neuen Spielobjekts aufgerufen wird.
  constructor(user1, user2, maxZeile, maxSpalte) {
    // Initialisieren der Spieler, der maximalen Zeilen und Spalten und des Spielfelds.
    this.syncWins = true
    this.user1 = user1
    this.user2 = user2
    this.maxZeile = maxZeile
    this.gewinnStatus = null
    this.aktiverSpieler = user1 // Der Anfangsspieler ist user1.
    this.maxSpalte = maxSpalte
    // Erstellen eines zweidimensionalen Arrays für das Spielfeld.
    this.spielfeld = new Array(maxZeile).fill(0).map(() => new Array(maxSpalte).fill(0));
  }

  // Controller

  // Methode, um die Nummer des Spielers zu ermitteln.
  getUserNummer(user) {
    let userNummmer
    if (user == this.user1) {
      userNummmer = 1
    } else if (user == this.user2) {
      userNummmer = 2
    } else {
      console.error("Nicht gegeben.")
      return
    }
    return userNummmer
  }

  // Methode, um zu überprüfen, ob ein Zug gültig ist.
  moveGueltig(user, spalte) {
    // Wenn es keinen Gewinner gibt und der aktive Spieler am Zug ist und die gewählte Spalte nicht voll ist, ist der Zug gültig.
    if(!this.gewinnStatus) {
      if (user != this.aktiverSpieler) return false
      if (this.spielfeld[0][spalte] != 0) return false
      return true
    } else {
      return false
    }
  }

  // Methode, um einen Zug auszuführen.
  move(user, spalte) {
    let amZug = this.getUserNummer(user)

    // Wenn der Zug nicht gültig ist, beende die Funktion.
    if(!this.moveGueltig(user, spalte)) return false

    // Füge den Spielstein in die gewählte Spalte ein.
    for (let zeile = this.maxZeile - 1; zeile >= 0; zeile--) {
      if (this.spielfeld[zeile][spalte] == 0 && spalte < this.maxSpalte) {
        this.spielfeld[zeile][spalte] = amZug;

        // Überprüfe, ob der Spieler gewonnen hat.
        this.checkWinner(amZug)

        // Wechsle den aktiven Spieler.
        if (amZug == 1) {
          this.aktiverSpieler = this.user2
        } else {
          this.aktiverSpieler = this.user1
        }
        break
      }
    }
  }

  // Methode, um zu überprüfen, ob ein Spieler gewonnen hat.
  checkWinner(playerID) {
    // Überprüfe horizontal, vertikal und diagonal auf vier aufeinanderfolgende Spielsteine des gleichen Spielers.
    // Wenn ein Spieler gewonnen hat, setze den Gewinnstatus auf den Namen des Gewinners und gib 'true' zurück.
    // horizontally
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
    // vertically
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
    // diagonally
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
    
    // Wenn das Spiel unentschieden ist, setze den Gewinnstatus auf "unentschieden" und gib 'true' zurück.
    // Wenn das Spiel noch nicht beendet ist, gib 'false' zurück.
    if(this.unentschieden()){
      this.gewinnStatus = "unentschieden"
      return true
    }
    return false;
  }
  // Methode, um zu überprüfen, ob das Spiel unentschieden ist.
  unentschieden(){
    // Wenn mindestens eine Spalte noch nicht voll ist, ist das Spiel noch nicht unentschieden.
    // Wenn alle Spalten voll sind, ist das Spiel unentschieden.
    for(let spalte = 0; spalte < this.maxSpalte; spalte++){
      if (this.spielfeld[0][spalte] == 0) {
        return false
        }
    }
    return true
  }

  // Methode, um zu überprüfen, ob ein Spieler aufgegeben hat.
  checkGiveUp(user) {
      //console.log(`Player ${user} gave up.`)
      // Wenn ein Spieler aufgibt, setze den Gewinnstatus auf den anderen Spieler und gib 'true' zurück.
      if(user == this.user1) {
        this.gewinnStatus = this.user2;
      } else {
        this.gewinnStatus = this.user1;
      }
      return true;
  }
}