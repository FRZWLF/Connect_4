const crypto = require('crypto')



class WelcomeLogIn {

    constructor() {
        window.login = this.login.bind(this)
    }
    getHTML() {
        var text = /*html*/`
            <h2> Login </h2>
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

        
        socket.emit("login",pwHash, username)
        socket.on("loginAnswer",(loginValid,userExists, user)=>{ 
            if(loginValid && userExists){
                alert("Login erfolgreich")
                appstatus.loginUser = user
                document.getElementById("Logout").style.display="none" // NavBar Ein-/Ausblendung steuern
                document.getElementById("Login").style.display="block"

            }else if(!loginValid && userExists){
                alert("Passwort ist Falsch!")
            }else if(!userExists){
                alert("Nicht registriert")
                router.gotoView("registrierung")

            }
        })


    }

}

module.exports = WelcomeLogIn