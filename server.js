const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js');
const User = require('./Model/User.js')


var port = 5555
var userList = new UserList()

function objectify(user){
   return new User(user.username,user.password,user.firstname,user.surname,user.email)    
}



io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")


    socket.on("registration",(data) =>{
        let answer = userList.containsUser(data.username)
        if(!answer){
            userList.addUser(data)
        }
        socket.emit("regisanswer",answer)  
    })

    socket.on("login", (pwHash, username) => {
        let userExists = userList.containsUser(username)
        let loginValide = false
        let user
        if (userExists) {
                user = userList.getUser(username)
                
                userObj = new User(user.username,user.password,user.firstname,user.surname,user.email)
                loginValide = userObj.checkpassword(pwHash)
        } 
        socket.emit("loginAnswer", loginValide, userExists, user)
    })

    socket.on("updateUser", (newUser, cpwhash) => {
       

        let oldUser = objectify(userList.getUser(newUser.username))
        console.log(oldUser)
     
        if (oldUser && oldUser.checkpassword(cpwhash)) {
            // oldUser.password = newUser.password;
            // oldUser.firstname = newUser.firstname;
            // oldUser.surname = newUser.surname;
            // oldUser.email = newUser.email;

            // Update the JSON file
            userList.addUser(newUser)
            socket.emit("updateAnswer", true);
        } else {
            socket.emit("updateAnswer", false);
        }
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
