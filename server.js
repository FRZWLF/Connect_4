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

// Festlegen des Ports
var port = 5555
// Erstellen einer neuen Benutzerliste
var userList = new UserList()

// Funktion zur Umwandlung eines Benutzers in ein Benutzerobjekt
function objectify(user) {
    return new User(user.username, user.password, user.firstname, user.surname, user.email)
}

// Erstellen einer neuen Warteliste
let waitlist = new WaitList()

// Bei einer neuen Socket.IO-Verbindung
io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")

    let socketuser
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
        io.emit("NewWList", waitlist.getUsers())
    })

    // Bei einer Anfrage zum Erstellen eines neuen Raums
    socket.on("create", (data) => {
        socket.join(data)
    })
    //Spielstart zwischen 2 Spielern
    socket.on("startNewGame",(player1,player2)=>{
        console.log(player1 + " "+player2)
        waitlist.removeUserFromWaitingList(player1)
        waitlist.removeUserFromWaitingList(player2)
        io.to(player1).emit("GameStart",player1,player2)
        io.to(player2).emit("GameStart",player1,player2)
        io.emit("NewWList",waitlist.getUsers())
    })
    // Bei einer Anmeldeanfrage
    socket.on("login", (pwHash, username) => {
        let userExists = userList.containsUser(username)
        let loginValide = false
        let user
        if (userExists) {

            user = userList.getUser(username) // Indikator des Objekts
            loginValide = user.checkpassword(pwHash)

            if (loginValide){
            socketuser = username
            console.log('1',socketuser)
            socket.emit("loginValide", loginValide, userExists, user)
            } else
            socket.emit("loginUnvalide", loginValide, userExists)    
        }

        socket.emit("loginUnvalide", loginValide, userExists)
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
    
    socket.on('disconnect', () => {
        waitlist.removeUserFromWaitingList(socketuser)
        io.emit("NewWList", waitlist.getUsers())
        console.log('Ein Nutzer hat die Verbindung getrennt')
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
