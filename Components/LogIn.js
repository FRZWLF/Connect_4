const crypto = require('crypto')



class WelcomeLogIn {

    constructor() {
        window.login = this.login.bind(this)
        window.logout = this.logout.bind(this) // Für FUnktionszugriff0
    }


    logout() {
        alert("Du bist ausgeloggt")
        appstatus.loginUser = null;
        document.getElementById("Logout").style.display = "flex"
        document.getElementById("Login").style.display = "none"
        router.gotoView("welcome")

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
        socket.on("loginAnswer", (loginValid, userExists, user) => {
            if (loginValid && userExists) {
                alert("Login erfolgreich")
                appstatus.loginUser = user
                document.getElementById("Logout").style.display = "none" // NavBar Ein-/Ausblendung steuern
                document.getElementById("Login").style.display = "flex"
                //spielstarten() //--> falls direkt Waitinglist
                router.gotoView("spielregeln")
            } else if (!loginValid && userExists) {
                alert("Passwort ist Falsch!")
                //Soll login "refreshen"
                router.gotoView("registrierung")
                router.gotoView("login")
            } else if (!userExists) {
                alert("Nicht registriert")
                router.gotoView("registrierung")

            }
        })


    }

}

module.exports = WelcomeLogIn