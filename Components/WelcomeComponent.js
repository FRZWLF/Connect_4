
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
    // document.getElementById('h1').innerHTML = " Test " + this.getYear()


    var text = /*html*/`
    
    <div class="welcome-page">
      <!-- <h2> Willkommen zur Projektwoche </h2> -->
      <br><br><br><br>
      <h1><u> Willkommen zum 4 Gewinnt Spiel </u> <h1>
      <h2><i> aus Sommersemester `+ this.getYear() + /*html*/`</i> </h2>
      <!-- <button onclick=alertyear() > Ok</button> -->
      <p>Wir wünschen euch beim Spielen viel Spaß!!! <br>
        Möge der Beste von euch Gewinnen! </p>
    </div>     
          `
    return (text);
  }
}

module.exports = WelcomeComponent


