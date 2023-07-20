
class WelcomeComponent {

  // Model
  constructor(year){
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

    document.title = "Webprogrammierung " + this.getYear()
    document.getElementById('h1').innerHTML = "Webprogrammierung " + this.getYear()

   var text = /*html*/`
      <h2> Willkommen zur Projektwoche </h2>
      <h2> im Sommersemester `+ this.getYear() + /*html*/` </h2>
      <button onclick=alertyear() > Ok</button>
      `
    return (text);
  }
}

module.exports = WelcomeComponent


