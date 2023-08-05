// Erstellen der Chat-Klasse:
class chat {
    constructor() {
        // Bei Empfang der 'NewMessageList' Nachricht vom Server wird das Chatfenster geleert und mit den neuen Nachrichten aus der 'messageList' gefüllt.
        socket.on('NewMessageList', (messageList) => {
            document.getElementById('chatfenster').innerHTML = ""
            for (let i = 0; i < messageList.length; i++) {
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
        window.showchatbox = this.showchatbox.bind(this)
        window.hidechatbox = this.hidechatbox.bind(this)
        window.setchatbox = this.setchatbox.bind(this)
        this.chatboxVisible = false
        window.delchat = this.delchat.bind(this)
        
    }

    showchatbox() {
        if (!this.chatboxVisible) {
            document.getElementById("chatfenster").style.display = "block";
            document.getElementById("chatfenster").style.transform = "translateY(0)";
        }
    }
    
    hidechatbox() {
        if (!this.chatboxVisible) {
            document.getElementById("chatfenster").style.display = "none";
            document.getElementById("chatfenster").style.transform = "translateY(100%)";
        }
    }
    
    setchatbox() {
        this.chatboxVisible = true;
        if (this.chatboxVisible) {
            document.getElementById("chatfenster").style.display = "block";
            document.getElementById("chatfenster").style.transform = "translateY(0)";
        }
    }


    delchat(e) {
                if (e.target.id != "message" && e.target.id !="chatfenster" && e.target.id !="chatbtn") {
                document.getElementById("chatfenster").style.display = "none"
                this.chatboxVisible = false
                } 
    }
    // Die Methode 'sendMessage' sendet eine Nachricht an den Server. Die Nachricht und der Benutzername des Senders werden als Parameter übergeben.
    sendMessage() {
        // Referenz zum Nachrichtenfeld wird in der Variable "messageField" gespeichert
        let messageField = document.getElementById("message");
        // Der Nachrichtentext wird abgerufen und in "msg" gespeichert
        let msg = messageField.value;
    
        // Wenn "msg" kein leerer String ist, wird der folgende Code ausgeführt
        if (msg != "") {
            // Der Benutzername wird bestimmt: Wenn "appstatus.loginUser" wahr ist (d.h., der Benutzer ist eingeloggt), 
            // wird "appstatus.loginUser.username" als Benutzername verwendet; andernfalls wird "Guest" verwendet.
            let username = appstatus.loginUser ? appstatus.loginUser.username : "Guest";
            // Das "NewMessage"-Ereignis wird mit dem Nachrichtentext und dem Benutzernamen ausgelöst
            socket.emit("NewMessage", msg, username);
            // Das Nachrichtenfeld wird geleert
            messageField.value = "";
        }
    }    
}

// Die Klasse 'chat' wird exportiert, damit sie in anderen Teilen der Anwendung verwendet werden kann.
module.exports = chat
