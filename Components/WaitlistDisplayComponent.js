
class WaitlistDisplayComponent{
    constructor(){
        socket.on("NewWList",(wlist)=>{
            this.waitinglist = wlist
            router.refresh()
        }
        ) 
        window.spielstarten = this.spielstarten.bind(this)
        window.startGame = this.startGame.bind(this)
        
    }

    spielstarten(){
        socket.emit("Newplayer",appstatus.loginUser.username)
        router.gotoView('waitlist', 'logedin', "waitlist")
    }
    
    getHTML(){ let text = /*html*/`
    <br>
    <div class="Waiting">
        <h2 id="Waiting">Waitingslist</h2>
    
        
    `
    this.waitinglist.forEach(element => {
        if(element==appstatus.loginUser.username){
            text += element
        } 
        else{
            text+= "<a href='javascript:startGame(\""+element+"\")'>" + element + "</a>"
        }
        text+= /*html*/`
            <br>
        `
    });
    text += /*html*/`
    </div>
    `
       
    return text
    }
    startGame(opponent){
        socket.emit("startNewGame",appstatus.loginUser.username,opponent)
    }

}
module.exports = WaitlistDisplayComponent