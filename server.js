// Importieren der benötigten Module
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js')
const WaitList = require('./Model/WaitingList.js')
const User = require('./Model/User.js')
const Chatlist = require('./Model/chatlist.js')


// Festlegen des Ports
var port = 5555
// Erstellen einer neuen Benutzerliste
var userList = new UserList()

// Erstellen einer neuen Warteliste
let waitlist = new WaitList()

// Erstellen einer neuen Chatliste
let chatlist = new Chatlist()

// Bei einer neuen Socket.IO-Verbindung
io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")

    let socketuser
    let spieler1
    let spieler2

    // Bei einer Registrierungsanfrage
    socket.on("registration", (data) => {
        let answer = userList.containsUser(data.username)
        // Wenn der Benutzer nicht existiert, wird er zur Benutzerliste hinzugefügt
        if (!answer) {
            userList.addUser(data)
        }
        socket.emit("regisanswer", answer)
    })

    // Bei einer Anfrage für einen neuen Spieler
    socket.on("Newplayer", (user) => {

        // Wenn der Benutzer nicht in der Warteliste ist, wird er hinzugefügt und dem Raum beigetreten
        if (!(waitlist.getUsers().includes(user))) {
            waitlist.addUsertoWatingList(user),
                socket.join(user)
        }
        // Senden der aktualisierten Warteliste an alle Clients
        io.emit("NewWList", waitlist.getUsers())
    })

    // Bei einer Anfrage zum Erstellen eines neuen Raums
    socket.on("create", (data) => {
        // Der Client tritt dem angegebenen Raum bei
        socket.join(data)
    })
    //Spielstart zwischen 2 Spielern
    socket.on("startNewGame", (player1, player2) => {
        console.log(player1 + " " + player2)
        spieler1 = player1
        spieler2 = player2
        waitlist.removeUserFromWaitingList(player1)
        waitlist.removeUserFromWaitingList(player2)
        io.to(player1).emit("GameStart", player1, player2)
        io.to(player2).emit("GameStart", player1, player2)
        io.emit("NewWList", waitlist.getUsers())
    })
    // Bei einer Anmeldeanfrage überprüfen, ob der Benutzer existiert und ob das Passwort korrekt ist
    socket.on("login", (pwHash, username) => {
        let userExists = userList.containsUser(username)
        let loginValide = false
        let user
        if (userExists) {
            user = userList.getUser(username) // Indikator des Objekts
            loginValide = user.checkpassword(pwHash)
            // Wenn der Login gültig ist, wird der Benutzername gespeichert und die Antwort an den Client gesendet
            if (loginValide) {
                socketuser = username
                console.log('ich bin engeloggt', socketuser)
                socket.emit("loginValide", loginValide, userExists, user)
            } else
                // Wenn der Login ungültig ist, wird die Antwort an den Client gesendet
                socket.emit("loginUnvalide", loginValide, userExists)
        }
        socket.emit("loginUnvalide", loginValide, userExists) // war doppelt?!?
    })

    // Bei einer Anfrage zur Aktualisierung der Benutzerdaten
    socket.on("updateUser", (newUser, cpwhash) => {
        // Überprüfen, ob das alte Passwort korrekt ist
        let oldUser = userList.getUser(newUser.username)
        if (oldUser && oldUser.checkpassword(cpwhash)) {
            // Wenn das alte Passwort korrekt ist, werden die Benutzerdaten aktualisiert
            userList.addUser(newUser)
            // Die Antwort wird an den Client gesendet
            socket.emit('updateAnswer', true);
        } else {
            // Wenn das alte Passwort nicht korrekt ist, wird die Antwort an den Client gesendet
            socket.emit('updateAnswer', false);
        }
    })

    // Bei einer Anfrage für einen Spielzug
    socket.on("zug", (user, opp, data) => {
        // Der Spielzug wird an den Gegner gesendet
        socket.to(opp).emit("zuggegner", user, data);
    })


    socket.on("matchtResolveToServer", (playername, opp) => {
        io.to(opp).emit("matchResolve", playername)
    })
    //Aktualisierung des Highscores bei Spielende
    socket.on("winTracker", (winner, loser) => {
        winUser = userList.getUser(winner)
        lossUser = userList.getUser(loser)
        winUser.wins += 1
        if (lossUser.wins > 0) {
            lossUser.wins -= 1
            userList.addUser(lossUser)
        }
        userList.addUser(winUser)
        console.log("Users changed!")
    })
    // Bei einer Socket.IO-Verbindungsunterbrechung
    socket.on('disconnect', () => {
        console.log("Gamer1: ", spieler1, socketuser)
        console.log("Gamer2: ", spieler2, socketuser)
        if (spieler1 == socketuser) {
            io.to(spieler2).emit("matchResolve", socketuser)
        } else if (spieler2 == socketuser) {
            io.to(spieler1).emit("matchResolve", socketuser)
        }
        // io.emit("playerdisconnect",socketuser)
        // Der Benutzer wird aus der Warteliste entfernt
        waitlist.removeUserFromWaitingList(socketuser)
        // Die aktualisierte Warteliste wird an alle Clients gesendet
        io.emit("NewWList", waitlist.getUsers())
        // Eine Meldung wird in der Konsole ausgegeben
        console.log('Ein Nutzer hat die Verbindung getrennt')
    })

    socket.on('Zeitabgelaufen', (gewinner) => {
        console.log(gewinner)
        socket.to(gewinner).emit("zeitgegner", true)


    })


    // Bei einer neuen Nachricht
    socket.on("NewMessage", (text, username) => {
        // Die Nachricht wird zur Chatliste hinzugefügt
        let message = "<b>" + username + "</b>:" + text + "<br>"
        chatlist.addChatlist(message)
        // Wenn die Chatliste mehr als 20 Nachrichten enthält, wird die älteste Nachricht entfernt
        if (chatlist.chatlist.length > 100) chatlist.chatlist.shift()
        // Die aktualisierte Chatliste wird an alle Clients gesendet
        io.emit("NewMessageList", chatlist.chatlist)
    })

    socket.on("highscore", () => {
        socket.emit("newBoard", userList.getSortedList())
    })

    // Bei einer Anfrage für die Chatliste
    socket.on("newWinner", (winner, looser) => {
        socket.emit("newBoard", winner, looser)
    })
})

// Server starten und auf dem festgelegten Port lauschen
server.listen(port, () => console.log("http://localhost:5555/index.html"));

// Liefern der angefragten Ressource
app.get("*", function (req, res) {
    console.log('sonstige Anfrage', req.originalUrl);
    res.sendFile(req.originalUrl, { root: __dirname + '/public' }, function (err) {
        if (err) res.status(404).send('Du Depp! Die Seite gibt es garnicht!');
    });
});
