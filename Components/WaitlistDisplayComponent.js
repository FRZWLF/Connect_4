class WaitlistDisplayComponent{
    constructor(){
        socket.on("NewWList",(wlist)=>{
            this.waitinglist = wlist
            if(appstatus.state == "waiting"){
                router.refresh()
            }

        }
        ) 
        window.spielstarten = this.spielstarten.bind(this)
        window.startGame = this.startGame.bind(this)
        
    }

    spielstarten(){
        appstatus.state = 'waiting'
        socket.emit("Newplayer",appstatus.loginUser.username)
        router.gotoView('waitlist', 'logedin', "waitlist")
    }
    
    getHTML(){ let text = /*html*/`
    <br>
    <div class="Waiting">
        <div class="forms-window waiting-window">
            <h2 class="Headline_Game Headline_Waiting">Spielersuche</h2>
                <div class="Waiting_list">
        
    `
    this.waitinglist.forEach(element => {
        if(element==appstatus.loginUser.username){
            text += "<div class='Waiting_Player'>"+element+"</div>"
        } 
        else{
            text+= "<div class='Waiting_Player'><a id='Player_Link' href='javascript:startGame(\""+element+"\")'>" + element + "</a></div>"
        }
        text+= /*html*/`
            <br>
        `
    });
    text += /*html*/`
    </div>
            <div class="loader">
                <span class="loader_letter">W</span>
                <span class="loader_letter">a</span>
                <span class="loader_letter">i</span>
                <span class="loader_letter">t</span>
                <span class="loader_letter">i</span>
                <span class="loader_letter">n</span>
                <span class="loader_letter">g</span>
            </div>
    </div>
    </div>
    `
       
    return text
    }
    startGame(opponent){
        

        socket.emit("startNewGame",appstatus.loginUser.username,opponent)
    }

}
module.exports = WaitlistDisplayComponent