// Importieren der benötigten Module
const crypto = require('crypto') // Modul zur Kryptographie
const User = require('../Model/User') // Benutzermodell
const val = require('validator') // Modul zur Validierung von Eingaben

// Definition der Klasse ChangeuserdataComponent
class ChangeuserdataComponent {
    constructor() {
        // Binden der Methode 'change' an das aktuelle Objekt
        window.change = this.change.bind(this)
    }

    // Methode zur Erzeugung des HTML-Formulars
    getHTML() {
        // Zugriff auf den eingeloggten Benutzer
        this.user = appstatus.loginUser
        // Erzeugung des HTML-Formulars
        var text = /*html*/`
        <h2> Nutzerdaten ändern </h2>
        Aktuelles password: <input type="password" id="current_password" required><br>
        Password:<input type="password" id="password" required><br>
        Password again:<input type="password" id="password2" required><br>
        First Name:<input type="text" id="firstname" value = ${this.user.firstname}><br>
        Surname:<input type="text" id="surname" value=${this.user.surname}><br>
        E-mail:<input type="email" id="email" value= ${this.user.email}><br>
        <button onclick="change()" >Ändern</button>
        `
        // Rückgabe des erzeugten HTML-Textes
        return (text)
    }

    // Methode zur Änderung der Benutzerdaten
    change() {
        // Abrufen der Eingabewerte aus dem Formular
        let current_password = document.getElementById("current_password").value
        let password = document.getElementById("password").value
        let password2 = document.getElementById("password2").value
        let firstname = document.getElementById("firstname").value
        let surname = document.getElementById("surname").value
        let email = document.getElementById("email").value

        // Erzeugung eines Hashes aus dem aktuellen Passwort
        var hash_c = crypto.createHash('sha256')
        hash_c.update(current_password)
        let cpwhash = hash_c.digest('hex')

        // Überprüfung, ob die Passwörter eingegeben wurden
        if (password == "" || current_password == "") {
            alert("Username und Passwort muss angegeben werden")
        } else {
            // Überprüfung, ob die neuen Passwörter übereinstimmen und die E-Mail gültig ist
            if (password == password2 && val.isEmail(email)) {
                // Erzeugung eines Hashes aus dem neuen Passwort
                var hash = crypto.createHash('sha256')
                hash.update(password)
                let pwHash = hash.digest('hex')

                // Erzeugung eines neuen Benutzerobjekts mit den aktualisierten Daten
                let oldUser = appstatus.loginUser
                let newUser = new User(oldUser.username, pwHash, firstname, surname, email)

                // Senden des neuen Benutzerobjekts an den Server zur Aktualisierung
                socket.emit('updateUser', newUser, cpwhash)

                // Empfangen der Antwort vom Server
                socket.on('updateAnswer', (answer) => {
                    if (answer) {
                        // Aktualisierung des eingeloggten Benutzers im Frontend
                        appstatus.loginUser = newUser
                        alert("Update erfolgt!")
                    } else {
                        alert("Update gescheitert.")
                    }
                })
            }
            else {
                alert("Passwörter sind ungleich oder die Email ist ungültig.")
            }
        }
    }
}

// Exportieren der Klasse ChangeuserdataComponent
module.exports = ChangeuserdataComponent