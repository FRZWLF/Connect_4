const socket = io();
// Bei Weiterleitung zur LoadingPage.html, auf Verbindung mit dem Server warten
  socket.on('connect', () => {
    console.log('Verbunden mit dem Server');
  });

function Recover(){
    let password = document.getElementById("password").value
    let password2 = document.getElementById("password2").value

    if (password == ""|| password2 == "") {
        message("Achtung", "Passwort muss angegeben werden", "fehler")
    } else if (password != "") {
        const missingRequirements = [];
        if (!password || password.length < 8) {
            missingRequirements.push("min 8 Zeichen")
        }
        if (!/[a-z]/.test(password)) { 
            missingRequirements.push("min einem Kleinbuchstaben");
        }
        if (!/[A-Z]/.test(password)) {
            missingRequirements.push("min einem Großbuchstaben");
        }
        if (!/\d/.test(password)) {
            missingRequirements.push("min einer Zahl");
        }
        if (!/[!#$%^&*()+\=\[\]{};':"\\|,<>\/?_\-]/.test(password)) {
            missingRequirements.push("min einem Sonderzeichen");
        }
        if (missingRequirements.length > 0) {
            message("Achtung", `Passwort braucht noch:<br>${missingRequirements.map(requirement => `&nbsp;&nbsp; - ${requirement}`).join('<br>')}`, "fehler");

        } else if (password == password2) {
                var hash = CryptoJS.SHA256(password);
                let pwHash = hash.toString();
        
                    socket.emit("Recover", pwHash)

                  socket.on("Recovered", (answer) => {
                    if(answer) {
                        document.getElementById("passwordsecond").style.display = "block"
                        document.getElementById("passwordfirst").style.display = "none"
                    } else {
                        message("Achtung", "Fehler beim Passwort neusetzen. Try again!", "fehler")
                    }
                  })
                
        } else {
                message("Achtung", "Passwörter sind ungleich oder die Email ist ungültig!", "fehler")
            }
    }
}


function closemessage() {
    console.log("test")
    let messagediv = document.getElementById('alert')
    messagediv.style.display = 'none'
}


function message(ueberschrift, Nachricht, type) {

    try { clearInterval(this.setI) } catch { }
    try { clearTimeout(this.setT) } catch { }
    let messagediv = document.getElementById('alert')
    messagediv.style.display = 'flex'


    if (type == "fehler") messagediv.style.background = "red"
    else
        if (type == "info") messagediv.style.background = "rgb(52, 141, 201)"
        else
            messagediv.style.background = "rgba(38, 255, 0, 0.63)"

    messagediv.innerHTML = `<h2 class="alertheadline">${ueberschrift} <button onclick="closemessage()" id="close" >X</button> </h2>  ${Nachricht}`

    messagediv.style.opacity = 1
    this.setT = setTimeout(() => {
        this.setI = setInterval(() => {
            messagediv.style.opacity = messagediv.style.opacity - 0.01
            if (messagediv.style.opacity == 0) {
                messagediv.style.display = 'none'
                clearInterval(this.setI)
                clearTimeout(this.setT)
            }
        }, 10)
    }, 3000)


}
