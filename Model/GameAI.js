// Exportieren der Klasse "Game".
module.exports = class GameAI {

  //Model
  // Konstruktor der Klasse, der beim Erzeugen eines neuen Spielobjekts aufgerufen wird.
  constructor(user1, maxZeile, maxSpalte, dif) {
    // Initialisieren der Spieler, der maximalen Zeilen und Spalten und des Spielfelds.
    this.user1 = user1
    this.user2 = "AI"
    this.dif = dif
    this.maxZeile = maxZeile
    this.gewinnStatus = null
    this.aktiverSpieler = user1 // Der Anfangsspieler ist user1.
    this.maxSpalte = maxSpalte
    // Erstellen eines zweidimensionalen Arrays für das Spielfeld.
    this.spielfeld = new Array(maxZeile).fill(0).map(() => new Array(maxSpalte).fill(0));
  }


  // Methode, um die Nummer des Spielers zu ermitteln.
  getUserNummer(user) {
    let userNummmer
    if (user == this.user1) {
      userNummmer = 1
    } else if (user == this.user2) {
      userNummmer = 2
    } else {
  
      return
    }
    return userNummmer
  }

  // Methode, um zu überprüfen, ob ein Zug gültig ist.
  moveGueltig(user, spalte) {
    // Wenn es keinen Gewinner gibt und der aktive Spieler am Zug ist und die gewählte Spalte nicht voll ist, ist der Zug gültig.
    if (!this.gewinnStatus) {
      if (user != this.aktiverSpieler) return false
      if (this.spielfeld[0][spalte] != 0) return false
      return true
    } else {
      return false
    }
  }

  clone() {
    let clone = new GameAI(this.user1, this.maxZeile, this.maxSpalte, this.dif);
    clone.aktiverSpieler = this.aktiverSpieler;
    clone.spielfeld = this.spielfeld.map(row => [...row]);
    clone.gewinnStatus = this.gewinnStatus;
    return clone;
  }

  getPossibleMoves() {
    let moves = [];
    for (let i = 0; i < this.maxSpalte; i++) {
      if (this.moveGueltig(this.aktiverSpieler, i)) {

        moves.push(i);
      } 
    }
  
    return moves;
  }


  bewertung(game) {

    // Überprüfen, ob das Spiel beendet ist
    if (game.gewinnStatus != null) {
      if (game.gewinnStatus == this.user2) {
        return 1000;
      } else if (game.gewinnStatus == this.user1) {
        return -1000;
      } else {
        return 0;
      }
    }

    let score = 0;

    // Bonuspunkte für zwei oder drei in einer Reihe
    if (this.hatInEinerReihe(game, this.user2, 3)) {
      score += 10;
    }
    if (this.hatInEinerReihe(game, this.user2, 2)) {
      score += 5;
    }
    if (this.hatInEinerDiagonalen(game, this.user2, 3)) {
      score += 10;
    }
    if (this.hatInEinerDiagonalen(game, this.user2, 2)) {
      score += 5;
    }

    // Minuspunkte, wenn der Gegner zwei oder drei Steine in einer Reihe u/o Diagonale hat
    if (this.hatInEinerReihe(game, this.user1, 3)) {
      score -= 20;
    }
    if (this.hatInEinerReihe(game, this.user1, 2)) {
      score -= 10;
    }
    if (this.hatInEinerDiagonalen(game, this.user1, 3)) {
      score -= 20;
    }
    if (this.hatInEinerDiagonalen(game, this.user1, 2)) {
      score -= 10;
    }

    if (this.kannGewinnenImNaechstenZug(game, this.user1)) {
      score -= 1000;
    }

    if (this.kannGewinnenImNaechstenZug(game, this.user2)) {
      score += 1000;
    }

    return score;
  }

  kannGewinnenImNaechstenZug(game, spieler) {
    // Überprüfen Sie für jede mögliche Bewegung, ob sie zu einem Gewinn führen würde
    for (let i of this.getPossibleMoves()) {
      let clonedGame = game.clone();
      clonedGame.move(spieler, i);

      if (clonedGame.gewinnStatus == spieler) {
        return true;
      }
    }
    return false;
  }


  hatInEinerDiagonalen(game, spieler, anzahl) {
    var spielerID = game.getUserNummer(spieler)
    // Diagonal (von links oben nach rechts unten)
    for (let y = 0; y < this.maxZeile - anzahl + 1; y++) {
      for (let x = 0; x < this.maxSpalte - anzahl + 1; x++) {
        let games = true;
        for (let i = 0; i < anzahl; i++) {
          if (game.spielfeld[y + i][x + i] !== spielerID) {
            games = false;
            break;
          }
        }
        if (games) return true;
      }
    }

    // Diagonal (von rechts oben nach links unten)
    for (let y = 0; y < this.maxZeile - anzahl + 1; y++) {
      for (let x = anzahl - 1; x < this.maxSpalte; x++) {
        let games = true;
        for (let i = 0; i < anzahl; i++) {
          if (game.spielfeld[y + i][x - i] !== spielerID) {
            games = false;
            break;
          }
        }
        if (games) return true;
      }
    }

    return false;
  }

  hatInEinerReihe(game, spieler, anzahl) {
    // horizontal
    var spielerID = this.getUserNummer(spieler)
    for (let y = 0; y < this.maxZeile; y++) {
      for (let x = 0; x < this.maxSpalte - anzahl + 1; x++) {
        let games = true;
        for (let i = 0; i < anzahl; i++) {
          if (game.spielfeld[y][x + i] !== spielerID) {
            games = false;
            break;
          }
        }
        if (games) return true;
      }
    }

    // vertikal
    for (let x = 0; x < this.maxSpalte; x++) {
      for (let y = 0; y < this.maxZeile - anzahl + 1; y++) {
        let games = true;
        for (let i = 0; i < anzahl; i++) {
          if (game.spielfeld[y + i][x] !== spielerID) {
            games = false;
            break;
          }
        }
        if (games) return true;
      }
    }

    // Diagonalen werden hier nicht berücksichtigt. Sie können sie hinzufügen, wenn es für Ihr Spiel relevant ist.

    return false;
  }


  minimax(game, depth, istMaximierend) {

    // Sobald die depth = Spieltiefe erreicht ist oder der Gewinnstatus erreicht ist, beende den Algorithmus
    if (depth == 0 || game.gewinnStatus) {
      return this.bewertung(game);
    }



    if (istMaximierend) {
      let besterScore = -Infinity;


      for (let move of game.getPossibleMoves()) {

        let newGame = game.clone();

        newGame.move(this.user2, move);
        let score = this.minimax(newGame, depth - 1, false);

        besterScore = Math.max(score, besterScore);
      }
      return besterScore;
    } else {
      let besterScore = Infinity;
      for (let move of game.getPossibleMoves()) {

        let newGame = game.clone();

        newGame.move(this.user1, move);
        let score = this.minimax(newGame, depth - 1, true);
        besterScore = Math.min(score, besterScore);
      }
      return besterScore;
    }

  };

  zugGegner() {
    let moeglicheSpalten = this.getPossibleMoves()
    this.dif = document.getElementById("slide_dif").value

    console.log(this.dif)

    for (let spalte of moeglicheSpalten) {
      if (this.checkForWin(this.clone(), spalte, 2)) {
        this.move(this.user2, spalte)
        return spalte
      }
    }

    for (let spalte of moeglicheSpalten) {
      if (this.checkForWin(this.clone(), spalte, 1)) {
        this.move(this.user2, spalte)
        return spalte
      }
    }

    let hoechsterScore = -Infinity;
    let movePos;
    for (let i of moeglicheSpalten) {
      let newGame = this.clone();
      newGame.move(this.user2, i);
      console.log("rene", this.dif)
      let score = this.minimax(newGame, this.dif, false);

      if (score > hoechsterScore) {
        hoechsterScore = score;
        movePos = i;
      }
    }
    this.move(this.user2, movePos);
    return movePos
  };

  checkForWin(game, spalteZahl, playerID) {
    let tempSpielFeld = game.spielfeld
    // Erstellung eines tempSpielFeld und kontrolle ob bei Platzierung in einer Spalte das Spiel gewonnen wurde
    for (let moegZeile = this.maxZeile - 1; moegZeile >= 0; moegZeile--) {
      if (this.spielfeld[moegZeile][spalteZahl] == 0) {

        // Setze im Test/Tempfeld den Stein auf 1 o. 2
        tempSpielFeld[moegZeile][spalteZahl] = playerID

        for (let zeile = 0; zeile < this.maxZeile; zeile++) {
          for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
            if (tempSpielFeld[zeile][spalte] === playerID && tempSpielFeld[zeile][spalte + 1] === playerID && tempSpielFeld[zeile][spalte + 2] === playerID && tempSpielFeld[zeile][spalte + 3] === playerID) {

              tempSpielFeld[moegZeile][spalteZahl] = 0
              return true;
            }
          }
        }

        // vertically
        for (let spalte = 0; spalte < this.maxSpalte; spalte++) {
          for (let zeile = 0; zeile < this.maxZeile - 3; zeile++) {
            if (tempSpielFeld[zeile][spalte] === playerID && tempSpielFeld[zeile + 1][spalte] === playerID && tempSpielFeld[zeile + 2][spalte] === playerID && tempSpielFeld[zeile + 3][spalte] === playerID) {
              tempSpielFeld[moegZeile][spalteZahl] = 0
              return true;
            }
          }
        }

        //anti diagonally
        for (let zeile = 0; zeile < this.maxZeile - 3; zeile++) {
          for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
            if (tempSpielFeld[zeile][spalte] === playerID && tempSpielFeld[zeile + 1][spalte + 1] === playerID && tempSpielFeld[zeile + 2][spalte + 2] === playerID && tempSpielFeld[zeile + 3][spalte + 3] === playerID) {
              tempSpielFeld[moegZeile][spalteZahl] = 0
              return true;
            }
          }
        }
        // diagonally
        for (let zeile = 3; zeile < this.maxZeile; zeile++) {
          for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
            if (tempSpielFeld[zeile][spalte] === playerID && tempSpielFeld[zeile - 1][spalte + 1] === playerID && tempSpielFeld[zeile - 2][spalte + 2] === playerID && tempSpielFeld[zeile - 3][spalte + 3] === playerID) {
              tempSpielFeld[moegZeile][spalteZahl] = 0
              return true;
            }
          }
        }

        tempSpielFeld[moegZeile][spalteZahl] = 0
        return false
      }
    }
  }

  // Methode, um einen Zug auszuführen.
  move(user, spalte) {
    let amZug = this.getUserNummer(user)

    // Wenn der Zug nicht gültig ist, beende die Funktion.
    if (!this.moveGueltig(user, spalte)) return false

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

        return this
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

          if (playerID == 1) {
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

          if (playerID == 1) {
            this.gewinnStatus = this.user1;
          } else {
            this.gewinnStatus = this.user2;
          }
          return true;
        }

      }
    }
    //anti diagonally
    for (let zeile = 0; zeile < this.maxZeile - 3; zeile++) {
      for (let spalte = 0; spalte < this.maxSpalte - 3; spalte++) {
        if (this.spielfeld[zeile][spalte] === playerID && this.spielfeld[zeile + 1][spalte + 1] === playerID && this.spielfeld[zeile + 2][spalte + 2] === playerID && this.spielfeld[zeile + 3][spalte + 3] === playerID) {

          if (playerID == 1) {
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

          if (playerID == 1) {
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
    if (this.unentschieden()) {
      this.gewinnStatus = "unentschieden"
      return true
    }
    return false;
  }

  // Methode, um zu überprüfen, ob das Spiel unentschieden ist.
  unentschieden() {
    // Wenn mindestens eine Spalte noch nicht voll ist, ist das Spiel noch nicht unentschieden.
    // Wenn alle Spalten voll sind, ist das Spiel unentschieden.
    for (let spalte = 0; spalte < this.maxSpalte; spalte++) {
      if (this.spielfeld[0][spalte] == 0) {
        return false
      }
    }
    return true
  }

  // Methode, um zu überprüfen, ob ein Spieler aufgegeben hat.
  checkGiveUp(user) {
    // Wenn ein Spieler aufgibt, setze den Gewinnstatus auf den anderen Spieler und gib 'true' zurück.
    if (user == this.user1) {
      this.gewinnStatus = this.user2;
    } else {
      this.gewinnStatus = this.user1;
    }
    return true;
  }
}