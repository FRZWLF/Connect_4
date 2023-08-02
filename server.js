// Importieren der benötigten Module
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js');
const WaitList = require("./Model/WaitingList.js")
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

    // Bei einer Registrierungsanfrage
    socket.on("registration", (data) => {
        let answer = userList.containsUser(data.username)
        if (!answer) {
            userList.addUser(data)
        }
        socket.emit("regisanswer", answer)
    })

    // Bei einer Anfrage für einen neuen Spieler
    socket.on("Newplayer", (user) => {
        if (!(waitlist.getUsers().includes(user))) {
            waitlist.addUsertoWatingList(user),
                socket.join(user)
        }
        socket.emit("NewWList", waitlist.getUsers())
    })

    // Bei einer Anfrage zum Erstellen eines neuen Raums
    socket.on("create", (data) => {
        socket.join(data)
    })

    // Bei einer Anmeldeanfrage
    socket.on("login", (pwHash, username) => {
        let userExists = userList.containsUser(username)
        let loginValide = false
        let user
        if (userExists) {

            user = userList.getUser(username) // Indikator des Objekts
            loginValide = user.checkpassword(pwHash)

        }
        socket.emit("loginAnswer", loginValide, userExists, user)
    })

    socket.on("updateUser", (newUser, cpwhash) => {

        let oldUser = userList.getUser(newUser.username)
        console.log(oldUser)

        if (oldUser && oldUser.checkpassword(cpwhash)) {
            userList.addUser(newUser)
            socket.emit('updateAnswer', true);
        } else {
            socket.emit('updateAnswer', false);
        }
    })

    // Bei einer Anfrage für einen Spielzug
    socket.on("zug", (user, opp, data) => {
        socket.to(opp).emit("zuggegner", user, data);
    })

    // Bei einer neuen Nachricht
    socket.on("NewMessage", (text, username) => {
        let message = username + ":" + text + "<br>"
        chatlist.addChatlist(message)
        
        if (chatlist.chatlist.length > 20) chatlist.chatlist.shift()
        io.emit("NewMessageList", chatlist.chatlist) 
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
