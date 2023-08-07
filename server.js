// Importieren der benötigten Module
const express = require('express')
const app = express()
const path = require("path");
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js')
const WaitList = require('./Model/WaitingList.js')
const User = require('./Model/User.js')
const Chatlist = require('./Model/chatlist.js')
const mailer = require("./Components/Mailer.js");
require('dotenv').config();


// Festlegen des Ports
var port = 5555
// Erstellen einer neuen Benutzerliste
var userList = new UserList()

// Erstellen einer neuen Warteliste
let waitlist = new WaitList()

// Erstellen einer neuen Chatliste
let chatlist = new Chatlist()

let PasswordRecovery_username
// Bei einer neuen Socket.IO-Verbindung
io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")

    let socketuser
    let spieler1
    let spieler2

    // Bei einer Registrierungsanfrage
    socket.on("registration", async (data) => {
        let answer = userList.containsUser(data.username)
        // Wenn der Benutzer nicht existiert, wird er zur Benutzerliste hinzugefügt, nach Klick auf Link in Mail
        if (!answer) {
            try {
                await mailer.sendOptInMail(data.email, data.username);
            } catch (error) {
                // falls etwas schiefgeht.
                console.error("Fehler beim Versenden der E-Mail:", error);
                // Möglicherweise möchtest du hier den Benutzer aus der userList wieder entfernen,
                // wenn die E-Mail nicht gesendet werden konnte.
            }
            userList.addUser(data)
        }
        socket.emit("regisanswer", answer)
    })

    socket.on("reboot", async (email, username) => {
        let answer = userList.containsUser(username)
        let emailValide = false
        let user
        if (answer) {
            user = userList.getUser(username)
            emailValide = user.checkEmail(email)
            if (emailValide) {
                try {
                    await mailer.sendRebootMail(email, username);
                } catch (error) {
                    console.error("Fehler beim Versenden der E-Mail:", error);
                }
            } socket.emit("userUnvalid", answer, emailValide)
        } socket.emit("userUnvalid", answer, emailValide)
    })

    socket.on("Recover", (pwHash) => {
        let OldUser = userList.getUser(PasswordRecovery_username)
        let pwcheck = true

        if (OldUser) {
            pwcheck = OldUser.checkpassword(pwHash)
            if (!pwcheck) {
                let NewUser = new User(PasswordRecovery_username, pwHash, OldUser.firstname, OldUser.surname, OldUser.email)
                NewUser.verified = OldUser.verified
                NewUser.wallet = OldUser.wallet;
                NewUser.skinEquipped = OldUser.skinEquipped
                NewUser.primaryskin = OldUser.primaryskin
                NewUser.secondaryskin = OldUser.secondaryskin
                NewUser.wins = OldUser.wins
                NewUser.loses = OldUser.loses
                NewUser.gamesplayed = OldUser.gamesplayed
                userList.addUser(NewUser)
                // Die Antwort wird an den Client gesendet
                socket.emit('Recovered', true, pwcheck);
            } else {
                socket.emit('Recovered', true, pwcheck);
            }

        } else {
            socket.emit('Recovered', false, pwcheck);
        }
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
        let accVerified = false
        let user
        if (userExists) {
            accVerified = userList.getUser(username).verified
            if (accVerified) {
                user = userList.getUser(username) // Indikator des Objekts
                loginValide = user.checkpassword(pwHash)
                // Wenn der Login gültig ist, wird der Benutzername gespeichert und die Antwort an den Client gesendet
                if (loginValide) {
                    socketuser = username
                    console.log('ich bin engeloggt', socketuser)
                    socket.emit("loginValide", loginValide, userExists, user)
                } else
                    // Wenn der Login ungültig ist, wird die Antwort an den Client gesendet
                    socket.emit("loginUnvalide", loginValide, userExists, accVerified)
            } socket.emit("loginUnvalide", loginValide, userExists, accVerified)
        }
        socket.emit("loginUnvalide", loginValide, userExists, accVerified) // war doppelt?!?
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
        winUser.gamesplayed += 1
        console.log("Winner Games: ", winUser.gamesplayed)
        winUser.wallet += 20
        console.log("Winner Wallet: ", winUser.wallet)
        lossUser.loses += 1
        lossUser.gamesplayed += 1
        userList.addUser(lossUser)
        userList.addUser(winUser)
        console.log("Users changed!")
    })

    socket.on("Tietracker", (gamer1, gamer2) => {
        gamer1User = userList.getUser(gamer1)
        gamer2User = userList.getUser(gamer2)
        gamer1User.gamesplayed += 1
        gamer1User.wallet += 10
        gamer2User.gamesplayed += 1
        gamer2User.wallet += 10
        userList.addUser(gamer1User)
        userList.addUser(gamer2User)
        console.log("Tie tracked")
    })

    // Bei einer Socket.IO-Verbindungsunterbrechung
    socket.on('disconnect', () => {
        console.log("Gamer: ", spieler1, socketuser)
        if (spieler1 == socketuser) {
            io.to(spieler2).emit("matchResolve", socketuser)
        } else {
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

app.get("/verify/:username", (req, res) => {
    let userName = req.params.username;
    console.log(userName)
    let userverify = userList.getUser(userName)
    userverify.verified = true
    userList.addUser(userverify)
    console.log("Account active")
    return res.status(200).send({
        msg: "Account activated",
    });
});

app.get("/change/:username", (req, res) => {
    PasswordRecovery_username = req.params.username
    console.log("Nen User huhu: ", PasswordRecovery_username)
    res.sendFile(path.join(__dirname + "/public" + "/PasswordRecovery.html"), function (err) {
        if (err) res.status(404).send('Du Depp! Die Seite gibt es garnicht!');
    });
});

// Server starten und auf dem festgelegten Port lauschen
server.listen(port, () => console.log("http://localhost:5555/index.html"));

// Liefern der angefragten Ressource
app.get("*", function (req, res) {
    console.log('sonstige Anfrage', req.originalUrl);
    res.sendFile(req.originalUrl, { root: __dirname + '/public' }, function (err) {
        if (err) res.status(404).send('Du Depp! Die Seite gibt es garnicht!');
    });
});
