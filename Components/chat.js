// Erstellen der Chat-Klasse:
class chat {
    constructor() {
        // Bei Empfang der 'NewMessageList' Nachricht vom Server wird das Chatfenster geleert und mit den neuen Nachrichten aus der 'messageList' gefüllt.
        socket.on('NewMessageList',(messageList)=>{
            document.getElementById('chatfenster').innerHTML = ""
            for(let i=0; i<messageList.length; i++){                    
                document.getElementById('chatfenster').innerHTML += messageList[i]
            }
        })
        // Event Listener für das Drücken der 'Enter' Taste hinzufügen
        let input = document.getElementById("message");
        input.addEventListener("keyup", (event) => {
            // Überprüfen, ob die 'Enter' Taste gedrückt wurde
            if (event.keyCode === 13) {
                // Standardaktion verhindern
                event.preventDefault()
                // Nachricht senden
                this.sendMessage()
            }
        })
        // Die Methode 'sendMessage' wird an das globale Objekt 'window' gebunden, damit sie von anderen Teilen der Anwendung aufgerufen werden kann.
        window.sendMessage = this.sendMessage.bind(this)
    }

    // Die Methode 'sendMessage' sendet eine Nachricht an den Server. Die Nachricht und der Benutzername des Senders werden als Parameter übergeben.
    sendMessage() {
        // Die Nachricht wird aus dem Eingabefeld mit der ID "message" abgerufen.
        let msg = document.getElementById("message").value

        // Wenn der Benutzer eingeloggt ist, wird die Nachricht zusammen mit dem Benutzernamen an den Server gesendet.
        if(appstatus.loginUser != null){
            socket.emit("NewMessage", msg, appstatus.loginUser.username)
        } else{
            // Wenn der Benutzer nicht eingeloggt ist, wird die Nachricht mit dem Benutzernamen "Guest" an den Server gesendet.
            socket.emit("NewMessage",msg,"Guest")
        }
        // Das Eingabefeld wird geleert
        document.getElementById("message").value = ""
    }
}
// Die Klasse 'chat' wird exportiert, damit sie in anderen Teilen der Anwendung verwendet werden kann.
module.exports = chat
