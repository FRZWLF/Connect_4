const crypto = require('crypto')



class WelcomeLogIn {

    constructor() {
        window.login = this.login.bind(this)
        window.logout = this.logout.bind(this) // Für FUnktionszugriff0
    }


    logout() {
        message("Logout","Du bist ausgeloggt","info")
        appstatus.loginUser = null;
        router.gotoView("welcome", "","welcome")

    }

    getHTML() {
        var text = /*html*/`
            <div class="login-page">
                <div class="forms-window">
                    <h2 class="Headline_Forms"> Login </h2>


                   <div class="forms_field">
                        <input type="text" placeholder="Benutzername" id="username" class="forms_field-input" required><br>
                   </div>

                   <div class="forms_field">
                        <input type="password" placeholder="Passwort" id="password" class="forms_field-input" required><br>
                   </div>
                   
                   <div class="forms_buttons">
                            <button class="forms_button-forgot">Passwort vergessen?</button>
                            <button class="forms_button-action" onclick="login()" >Login</button>
                   </div>
                 </div>
            </div>     
                
                `
        return (text);
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