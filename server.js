const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const SocketIO = require('socket.io')
const io = SocketIO(server)
const UserList = require('./Model/userlist.js');


var port = 5555
let userList = new UserList()



io.on("connection", (socket) => {
    console.log("Socket.IO-Verbindung eröffnet!")


    socket.on("registration",(data) =>{
    
  
    
        let answer = userList.containsUser(data.username)
        if(!answer){
            userList.addUser(data)
        }
        socket.emit("regisanswer",answer)
    })

    socket.on("login",(pwHash,userName)=>{
        let userExist=  userList.containsUser(userName)


        let loginValid=false
        if(userExist){
            // if(userList.getPw(userName)==pwHash) {

            //     loginValid=true
                

            // }else{
            //     loginValid=false

            // }
            let user = userList.getUser(userName)
            loginValid = user.checkpassword(pwHash)

        }
            
        

        socket.emit("loginAnswer",loginValid, userExist, user)
        

    })
}
)





// Server lauscht
server.listen(port, () => console.log("http://localhost:5555/index.html"));

// Angefragte Ressource liefern
app.get("*", function (req, res) {
    console.log('sonstige Anfrage', req.originalUrl);

    res.sendFile(req.originalUrl, { root: __dirname + '/public' }, function (err) {
        if (err) res.status(404).send('Du Depp! Die Seite gibt es garnicht!');
    });
});
