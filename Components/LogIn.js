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
            <h2 id="Headline_Login"> Login </h2>
                Username:<input type="text" id="username" required><br>
                Password:<input type="password" id="password" required><br>

                <button onclick="login()" >Login</button>
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
                message("Login", "erfolgreich")
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