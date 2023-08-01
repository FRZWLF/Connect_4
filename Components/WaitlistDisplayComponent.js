
class WaitlistDisplayComponent{
    constructor(){
        socket.on("NewWList",(wlist)=>{
            alert(wlist)
            this.waitinglist = wlist
            //document.getElementById("Waiting").innerHTML = this.waitinglist
            console.log(this.waitinglist)
            router.refresh()
        }) 

        window.spielstarten = this.spielstarten.bind(this)
        
    }

    spielstarten(){
        socket.emit("Newplayer",appstatus.loginUser.username)
        router.gotoView('waitlist')
    }
    
    getHTML(){ let text = /*html*/`
    <br>
        <h2 id="Waiting">Waitingslist</h2>
    `
    this.waitinglist.forEach(element => {
        text+= element 
        text+= /*html*/`
            <br>
        `
    });
    
       
    return text
    }

}
module.exports = WaitlistDisplayComponent