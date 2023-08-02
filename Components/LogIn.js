const crypto = require('crypto')



class WelcomeLogIn {

    constructor() {
        window.login = this.login.bind(this)
        window.logout = this.logout.bind(this) // Für FUnktionszugriff0
    }


    logout() {
        alert("Du bist ausgeloggt")
        appstatus.loginUser = null;
        router.gotoView("welcome", "","welcome")

    }

    getHTML() {
        var text = /*html*/`
            <div class="login-page">
                <div id="login-window">
                    <h2 id="Headline_Login"> Login </h2>


                   <div class="login_field">
                        <input type="text" placeholder="Benutzername" id="username" class=login_field-input required><br>
                   </div>

                   <div class="login_field">
                        <input type="password" placeholder="Passwort" id="password" class=login_field-input required><br>
                   </div>
                   
                   <div class="login_buttons">
                            <button class="login_button-forgot">Passwort vergessen?</button>
                            <button class="login_button-action" onclick="login()" >Login</button>
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
                alert("Login erfolgreich")
                appstatus.loginUser = user
                //spielstarten() //--> falls direkt Waitinglist
                router.gotoView("spielregeln", "logedin", "spielregeln")
            }

        })

        socket.on("loginUnvalide", (loginValid, userExists) => {
            if (!loginValid && userExists) {
                alert("Passwort oder Benutzername ist Falsch!")
                //Soll login "refreshen"
                router.gotoView("registrierung")
                router.gotoView("login", "", "login")
            } else if (!userExists) {
                alert("Nicht registriert")
                router.gotoView("registrierung", "", "registrierung")
            }

        })
    }
}
module.exports = WelcomeLogIn