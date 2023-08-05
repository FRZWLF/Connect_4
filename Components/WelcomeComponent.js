
class WelcomeComponent {

  // Model
  constructor(year) {
    this.year = year
    window.alertyear = this.alertyear.bind(this)
  }

  // Controller
  getYear() {
    return this.year
  }

  alertyear() {
    alert(this.year)
  }

  //View
  getHTML() {

    document.title = " 4 Gewinnt" + this.getYear()


    var text = /*html*/`
    
    <div class="welcome-page">
      <!-- <h2> Willkommen zur Projektwoche </h2> -->
      <h1 style="font-family:verdana">Willkommen zum 4 Gewinnt Spiel <h1>
      <h2> </h2>
      <br>
      <br>
      <!-- <button onclick=alertyear() > Ok</button> -->
      <p>Wir wünschen euch viel Spaß beim Spielen ! <br>
        Möge der Beste von euch Gewinnen! </p>
    </div>     
          `
    return (text);
  }
}

module.exports = WelcomeComponent


