const crypto = require("crypto")
const User = require("../Model/User")
const val = require(`validator`)



class RegistrationComponent {

    constructor() {
        window.register = this.register.bind(this)
        window.reset = this.reset.bind(this)
    }

    getHTML() {
        var text = /*html*/`
    <div class="registrierung-page">
                <div class="forms-window register-window">
                   <h2 class="Headline_Forms Headline_Register"> Registrierung </h2>
                   <form id="form">
                    	<div class="forms_field">
                    	     <input type="text" placeholder="Vorname" id="firstname" class=forms_field-input value="" required><br>
                    	</div>
                    	<div class="forms_field">
                    	     <input type="text" placeholder="Nachname" id="surname" class=forms_field-input value="" required><br>
                    	</div> 
                    	<div class="forms_field">
                    	     <input type="text" placeholder="Benutzername" id="username" class=forms_field-input value="" required><br>
                    	</div>
                    	<div class="forms_field">
                    	     <input type="text" placeholder="E-Mail" id="email" class=forms_field-input value="" required><br>
                    	</div>
                    	<div class="forms_field">
                    	     <input type="password" placeholder="Passwort" id="password" class=forms_field-input value="" required><br>
                    	</div>
                    	<div class="forms_field">
                    	     <input type="password" placeholder="Passwort wiederholen" id="password2" class=forms_field-input value="" required><br>
                    	</div>
                   </form>
                   <div class="forms_buttons register_buttons">
                            <button class="forms_button-forgot" onclick="reset()">Clear</button>
                            <button class="forms_button-action" onclick="register()" >Registrieren</button>
                   </div>
                 </div>
            </div>     
    `

        return (text)
    }

    reset(){
        // Das Formular-Element abrufen
        const form = document.getElementById("form");

        // Alle Input-Elemente im Formular zurücksetzen
        const inputElements = form.querySelectorAll("input");
        inputElements.forEach((input) => {
          if (input.type === "text" || input.type === "password") {
            // Nur Text- und Passwort-Felder zurücksetzen
            input.value = "";
          }
        });
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
                        router.gotoView("login"," ", "login")
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