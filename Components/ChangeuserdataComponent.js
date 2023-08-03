// Importieren der benötigten Module
const crypto = require('crypto') // Modul zur Kryptographie
const User = require('../Model/User') // Benutzermodell
const val = require('validator') // Modul zur Validierung von Eingaben

// Definition der Klasse ChangeuserdataComponent
class ChangeuserdataComponent {
    constructor() {
        // Binden der Methode 'change' an das aktuelle Objekt
        window.change = this.change.bind(this)
        window.changeView = this.changeView.bind(this)
    }

    // Methode zur Erzeugung des HTML-Formulars
    getHTML() {
        // Zugriff auf den eingeloggten Benutzer
        this.user = appstatus.loginUser
        // Erzeugung des HTML-Formulars
        var text = /*html*/`
        <div class="profil-page">
        <section class="glass">
                    <div class="dashboard">
                        <div class="user">
                            <img src="./img/nouser.png" alt="">
                            <h3>${this.user.firstname} ${this.user.surname}</h3>
                            <p>${this.user.username}<p>
                        </div>
                        <div class="links">
                            <div class="link">
                                <h2 id="uebersicht" class="active" onclick="changeView('uebersicht')">Übersicht</h2>
                            </div>
                            <div class="link">
                                <h2 id="userdata" onclick="changeView('profil')">Profil bearbeiten</h2>
                            </div>
                            <div class="link">
                                <h2>Daten und Datenschutz</h2>
                            </div>
                            <div class="link">
                                <h2>Sicherheit</h2>
                            </div>
                            <div class="link">
                                <h2>Zahlungen</h2>
                            </div>
                        </div>
                    </div>
                    <div class="profil-view">
                        <div id="status_uebersicht">
                            <div class="status">
                                <h1>Übersicht</h1>
                                <input type="text">
                            </div>
                            <div class="cards">
                                <div class="card">
                                    <div class="card-info">
                                        <h2>Deine Stats</h2>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="status_userdata" style ="display: none;">
                            <div class="status" >
                                <h1>Nutzerdaten ändern</h1>
                                <input type="text">
                            </div>
                            <div class="cards">
                                <div class="card">
                                    <div class="card-info">
                                        <div class="userdata_inputs">
                                            <div class="userdata_field">
                                                <p>Username</p> ${this.user.username}
                                            </div>
                                            <div class="userdata_field">
                                                <p>Aktuelles Passwort</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="password" id="current_password" class="forms_field-input user_field-input" required>
                                                </div>
                                            </div>
                                            <div class="userdata_field">
                                                <p>Neues Passwort</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="password" placeholder="Passwort" class="forms_field-input user_field-input" id="password" required>
                                                </div>
                                            </div>
                                            <div class="userdata_field">
                                                <p>Passwort wiederholen</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="password" placeholder="Passwort wiederholen" class="forms_field-input user_field-input" id="password2" required>
                                                </div>
                                            </div>
                                            <div class="userdata_field">
                                                <p>Vorname</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="text" id="firstname" class="forms_field-input user_field-input" value = ${this.user.firstname}>
                                                </div>
                                            </div>
                                            <div class="userdata_field">
                                                <p>Nachname</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="text" id="surname" class="forms_field-input user_field-input" value=${this.user.surname}>
                                                </div>
                                            </div>
                                            <div class="userdata_field">
                                                <p>E-Mail</p>
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="email" id="email" class="forms_field-input user_field-input" value= ${this.user.email}>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="forms_buttons profil_buttons">
                                            <button class="forms_button-action user_button-action" onclick="change()" >Ändern</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <div class="circle1"></div>
            <div class="circle2"></div>
        </div>
        

        
        `
        // Rückgabe des erzeugten HTML-Textes
        return (text)
    }

    changeView(submenue) {
        console.log("Ich mach was")
        if(submenue == "uebersicht"){
            document.getElementById("status_uebersicht").style.display = "block";
            document.getElementById("status_userdata").style.display = "none";
            document.getElementById("uebersicht").classList.add("active");
            document.getElementById("userdata").classList.remove("active");
        } else {
            document.getElementById("status_uebersicht").style.display = "none";
            document.getElementById("status_userdata").style.display = "block";
            document.getElementById("uebersicht").classList.remove("active");
            document.getElementById("userdata").classList.add("active");
        }
        
    }

    //Muss noch Seite refreshen für Änderungen!!!

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

        // Überprüfung, ob das aktuelle Passwort eingegeben wurde
        if (current_password == "") {
            alert("Aktuelles Passwort muss angegeben werden")
        } else {
            // Überprüfung, ob die E-Mail gültig ist
            if (val.isEmail(email)) {
                // Erzeugung eines Hashes aus dem neuen Passwort, falls eingegeben
                let pwHash = password !== "" && password === password2 ? crypto.createHash('sha256').update(password).digest('hex') : appstatus.loginUser.password;

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
                alert("Die Email ist ungültig.")
            }
        }
    }
}
// Exportieren der Klasse ChangeuserdataComponent
module.exports = ChangeuserdataComponent