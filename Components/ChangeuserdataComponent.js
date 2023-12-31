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
                                <h2 id="userdata" class="active">Profil bearbeiten</h2>
                            </div>
                        </div>
                    </div>
                    <div class="profil-view">
                        <div id="status_userdata">
                            <div class="status" >
                                <h1>Nutzerdaten ändern</h1>
                                <input type="text" class="disable">
                            </div>
                            <div class="cards">
                                <div class="card">
                                    <div class="card-info">
                                        <div class="userdata_box">
                                        <div class="userdata_text">
                                            <div class="userdata_field">
                                                <p>Username</p>                                                
                                            </div>
                                            <div class="userdata_field">
                                                <p>Aktuelles Passwort</p>                                                
                                            </div>
                                            <div class="userdata_field">
                                                <p>Neues Passwort</p>                                                
                                            </div>
                                            <div class="userdata_field">
                                                <p>Passwort wiederholen</p>                                                
                                            </div>
                                            <div class="userdata_field">
                                            <p>Vorname</p>                                             
                                            </div>
                                            <div class="userdata_field">
                                            <p>Nachname</p>                                              
                                            </div>
                                            <div class="userdata_field">
                                            <p>E-Mail</p>                                              
                                            </div>
                                        </div>

                                        <div class="userdata_inputs">

                                        <div class="userdata_field">
                                            <div class="forms_field_username">
                                                    <input type="text" id="current_username" placeholder="Benutzername" class="username_field-input" value = ${this.user.username} required>
                                            </div>
                                            </div>

                                            <div class="userdata_field">
                                            <div class="forms_field forms_field_userdata">
                                                    <input type="password" id="current_password" placeholder="Aktuelles Passwort" class="forms_field-input user_field-input" required>
                                            </div>
                                            </div>
                                           
                                            <div class="userdata_field">
                                            <div class="forms_field forms_field_userdata">
                                                    <input type="password" placeholder="Passwort" class="forms_field-input user_field-input" id="password" required>
                                            </div>
                                            </div>

                                            <div class="userdata_field">                                                
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="password" placeholder="Passwort wiederholen" class="forms_field-input user_field-input" id="password2" required>
                                                </div>
                                            </div>

                                            <div class="userdata_field">                                                
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="text" id="firstname" placeholder="Vorname" class="forms_field-input user_field-input" value = ${this.user.firstname}>
                                                </div>
                                            </div>

                                            <div class="userdata_field">                                                
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="text" id="surname" placeholder="Nachname" class="forms_field-input user_field-input" value=${this.user.surname}>
                                                </div>
                                            </div>

                                            <div class="userdata_field">                                               
                                                <div class="forms_field forms_field_userdata">
                                                    <input type="email" id="email" placeholder="E-Mail" class="forms_field-input user_field-input" value= ${this.user.email}>
                                                </div>
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
            message("Achtung", "Aktuelles Passwort muss angegeben werden", "fehler")
        } else if (password == password2 && val.isEmail(email)) {
                    var hash = crypto.createHash('sha256')
                    hash.update(password)
                    let pwHash = hash.digest('hex')

                    // Erzeugung eines neuen Benutzerobjekts mit den aktualisierten Daten
                    let oldUser = appstatus.loginUser
                    let newUser = new User(oldUser.username, pwHash, firstname, surname, email)
                    newUser.wallet = oldUser.wallet
                    newUser.skinEquipped = oldUser.skinEquipped
                    newUser.primaryskin = oldUser.primaryskin
                    newUser.secondaryskin = oldUser.secondaryskin
                    newUser.wins = oldUser.wins
                    // Senden des neuen Benutzerobjekts an den Server zur Aktualisierung
                    socket.emit('updateUser', newUser, cpwhash)
                    router.refresh()
                    // Empfangen der Antwort vom Server
                    socket.on('updateAnswer', (answer) => {
                        if (answer) {
                            // Aktualisierung des eingeloggten Benutzers im Frontend
                            appstatus.loginUser = newUser
                            message("Update erfolgt!", "Nutzerdaten wurden geändert")
                        } else {
                            message("Achtung", "Update gescheitert. Aktuelles Passwort falsch", "fehler")
                        }
                    })
                } else {
                    message("Achtung", "Passwörter sind ungleich oder Email ist ungültig.", "fehler")
                }
        }
    }
// Exportieren der Klasse ChangeuserdataComponent
module.exports = ChangeuserdataComponent