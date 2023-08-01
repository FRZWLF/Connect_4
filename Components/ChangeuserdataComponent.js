const crypto = require("crypto")
const User = require("../Model/User")
const val = require(`validator`)



class ChangeuserdataComponent {
    constructor() {
        let user = new User("hans", "hgsdfhgsdf", "hans", "müller", "hjdsfhsd")
        user = appstatus.loginUser
        window.change = this.change.bind(this)
    }
   
    getHTML() {
        var text = /*html*/`
        <h2> Nutzerdaten ändern </h2>
        Aktuelles password: <input type="password" id="current_password" required><br>
        Password:<input type="password" id="password" required><br>
        Password again:<input type="password" id="password2" required><br>
        First Name:<input type="text" id="firstname"><br>
        Surname:<input type="text" id="surname"><br>
        E-mail:<input type="email" id="email"><br>
        <button onclick="change()" >Ändern</button>
        `
        return (text)
    }

    change() {
        let password = document.getElementById("password").value
        let password2 = document.getElementById("password2").value
        let current_password = document.getElementById("current_password").value
        let firstname = document.getElementById("firstname").value
        let surname = document.getElementById("surname").value
        let email = document.getElementById("email").value

        var hash_c = crypto.createHash('sha256')
        hash_c.update(current_password)
        let cpwhash = hash_c.digest('hex')

        if (password == "" || current_password == "") {
            alert("Username und Passwort muss angegeben werden")
        } else {
            if(cpwhash == this.loginUser.pwHash) {
                if (password == password2 && val.isEmail(email)) {
                    var hash = crypto.createHash('sha256')
                    hash.update(password)
                    let pwHash = hash.digest('hex')
    
                    let oldUser = appstatus.loginUser

                    let newUser = new User(oldUser.username, pwHash, firstname, surname, email)

            
                    socket.emit("updateUser", newUser, cpwhash)
    
                    socket.on("updateAnswer", (answer) => {
                        if (answer) {
                            alert("Update failed")
                        } else {

                            this.loginUser.pwHash = pwHash
                            this.loginUser.firstname = firstname
                            this.loginUser.surname = surname
                            this.loginUser.email = email
                            alert("Nutzerdaten wurden geändert.")
                        }
                    })  
                }
                else {
                    alert("Passwörter sind ungleich oder die Email ist ungültig.")
                }
            } else {
                alert("User wurde angelegt")
            }
        }
    }
}

module.exports = ChangeuserdataComponent