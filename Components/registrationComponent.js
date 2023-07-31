const crypto = require("crypto")
const User = require("../Model/User")
const val = require(`validator`)



class RegistrationComponent {

    constructor() {
        window.register = this.register.bind(this)
    }

    getHTML() {
        var text = /*html*/`
    <h2> Registrierung </h2>
    Username:<input type="text" id="username" required><br>
    Password:<input type="password" id="password" required><br>
    Password again:<input type="password" id="password2" required><br>
    First Name:<input type="text" id="firstname"><br>
    Surname:<input type="text" id="surname"><br>
    E-mail:<input type="email" id="email"><br>

    
    <button onclick="register()" >Registrieren</button>
    `

        return (text)
    }

    register() {

        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let password2 = document.getElementById("password2").value
        let firstname = document.getElementById("firstname").value
        let surname = document.getElementById("surname").value
        let email = document.getElementById("email").value

        if (username == "" || password == "") {
            alert("Username und Passwort muss angegeben werden")
        } else {

            if (password == password2 && val.isEmail(email)) {
                var hash = crypto.createHash('sha256')
                hash.update(password)
                let pwHash = hash.digest('hex')

                const user = new User(username, pwHash, firstname, surname, email)

                socket.emit("registration", user)

                socket.on("regisanswer", (answer) => {
                    if (answer) {
                        alert("Registration fehlgeschlagen")
                    } else {
                        alert("User wurde angelegt")
                    }
                })



            }
            else {
                alert("Passwörter sind ungleich oder die Email ist ungültig!")
            }

        }


    }
}

module.exports = RegistrationComponent