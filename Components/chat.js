//Create Chat Event Handlers:
//You need to create event handlers for chat-related events. These events include a user connecting to the chat, a user sending a message, and a user disconnecting from the chat.
class chat {
    constructor() {
        socket.on('NewMessageList',(messageList)=>{
            document.getElementById('chatfenster').innerHTML = ""
            for(let i=0; i<messageList.length; i++){                    
                document.getElementById('chatfenster').innerHTML += messageList[i]
            }
        })
        window.sendMessage = this.sendMessage.bind(this)
     }

    sendMessage() {

        let msg = document.getElementById("message").value

        if(appstatus.loginUser != null){
            socket.emit("NewMessage", msg, appstatus.loginUser.username)
        } else{
            socket.emit("NewMessage",msg,"Guest")
        }
    }
}

module.exports = chat