const crypto = require('crypto')
const val = require(`validator`)

class WelcomeLogIn {

    constructor() {
        window.login = this.login.bind(this)
        window.logout = this.logout.bind(this) // Für FUnktionszugriff0
        window.reboot = this.reboot.bind(this)
        window.anfordern = this.anfordern.bind(this)
    }


    logout() {
        message("Logout","Du bist ausgeloggt","info")
        appstatus.loginUser = null;
        router.gotoView("welcome", "","welcome")

    }

    getHTML() {
        var text = /*html*/`
            <div class="login-page">
                <div class="forms-window" id="Login_window">
                    <h2 class="Headline_Forms"> Login </h2>


                   <div class="forms_field">
                        <input type="text" placeholder="Benutzername" id="username" class="forms_field-input" required><br>
                   </div>

                   <div class="forms_field">
                        <input type="password" placeholder="Passwort" id="password" class="forms_field-input" required><br>
                   </div>
                   
                   <div class="forms_buttons">
                            <button class="forms_button-forgot" onclick="reboot()">Passwort vergessen?</button>
                            <button class="forms_button-action" onclick="login()" >Login</button>
                   </div>
                 </div>
                 <div class="forms-window" id="password_reboot" style ="display: none;">
                    <h2 class="Headline_Forms"> Passwort Änderung  </h2>

                    <div class="forms_field">
                        <input type="text" placeholder="Benutzername" id="username1" class="forms_field-input" required><br>
                   </div>
                   <div class="forms_field">
                        <input type="text" placeholder="E-Mail" id="email" class="forms_field-input" required><br>
                   </div>
                   
                   <div class="forms_buttons">
                            <button class="forms_button-action" onclick="anfordern()" >Senden</button>
                   </div>
                 </div>
            </div>     
                
                `
        return (text);
    }

    reboot(){
        document.getElementById("password_reboot").style.display ="block"
        document.getElementById("Login_window").style.display = "none"
    }

    anfordern(){
        let username = document.getElementById("username1").value
        let email = document.getElementById("email").value

        if(username == " " || email == " ") {
            message("Achtung", "E-Mail und Benutzername muss angegeben werden", "fehler")
            router.refresh()
        } else if(val.isEmail(email)) {
            socket.emit("reboot", email, username)
            socket.on("userUnvalid", (answer, emailValide) => {
                if(!answer || (answer && !emailValide)){
                    message("Achtung", "Nutzername oder E-Mail falsch", "fehler")
                    router.refresh()
                } else {
                    message("Achtung", "Passwort in E-Mail ändern", "info")
                    router.refresh()
                }
            })
        } else {
            message("Achtung", "Gültige E-Mail muss angegeben werden", "fehler")
            router.refresh()
        }
    }

    login() {
        console.log("login")
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        var hash = crypto.createHash('sha256')
        hash.update(password)
        let pwHash = hash.digest('hex')


        socket.emit("login", pwHash, username)
        socket.on("loginValide", (loginValid, userExists, user) => {
            if (loginValid && userExists) {
                message("Login erfolgreich", "")
                appstatus.loginUser = user
                //spielstarten() //--> falls direkt Waitinglist
                router.gotoView("lobby", "logedin", "lobby")
            }

        })

        socket.on("loginUnvalide", (loginValid, userExists, accVerified) => {
            if(userExists && !accVerified){
                message("Achtung", "Bestätige deinen Account in der E-Mail", "fehler")
                router.refresh()
            } else if (!loginValid && userExists) {
                message("Achtung","Passwort oder Benutzername ist Falsch!", "fehler")
                //Soll login "refreshen"
                router.refresh()
            } 
            else if (!userExists) {
                message("Achtung","Nicht registriert","fehler")
                router.gotoView("registrierung", "", "registrierung")
            }

        })
    }
}
module.exports = WelcomeLogIn