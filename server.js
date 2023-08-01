const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js');
const WaitList = require("./Model/WaitingList.js")
const User = require('./Model/User.js')


var port = 5555
let userList = new UserList()
let waitlist = new WaitList()


io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")


    socket.on("registration",(data) =>{
        let answer = userList.containsUser(data.username)
        if(!answer){
            userList.addUser(data)
        }
        socket.emit("regisanswer",answer)
    
    })
    socket.on("Newplayer",(user)=>{
        console.log(user)
        waitlist.addUsertoWatingList(user),

        socket.join(user) //?

        console.log(waitlist.getUsers())
        socket.emit("NewWList",waitlist.getUsers())
    })
    
    socket.on("login", (pwHash, username) => { // Neu eingegebenes pwHash
        let userExists = userList.containsUser(username)
        let loginValide = false // Gültigkeit des Logins
        let user
        if (userExists) {
                user = userList.getUser(username) // Indikator des Objekts
                
                userObj = new User(user.username,user.password,user.firstname,user.surname,user.email) // Neues UserObjekt zum Nutzen der Funktion
                loginValide = userObj.checkpassword(pwHash)
        } 
        socket.emit("loginAnswer", loginValide, userExists, user) // An Login.js
        
    })
})

// Server lauscht
server.listen(port, () => console.log("http://localhost:5555/index.html"));

// Angefragte Ressource liefern
app.get("*", function (req, res) {
    console.log('sonstige Anfrage', req.originalUrl);

    res.sendFile(req.originalUrl, { root: __dirname + '/public' }, function (err) {
        if (err) res.status(404).send('Du Depp! Die Seite gibt es garnicht!');
    });
});


