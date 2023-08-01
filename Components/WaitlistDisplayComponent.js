
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
        socket.emit("Newplayer","BerndXD")
        router.gotoView('waitlist')
    }
    
    getHTML(){ let text = /*html*/`
    <br>
        <h2 id="Waiting">Waitingslist</h2>
    `
    text += this.waitinglist
       
    return text
    }

}
module.exports = WaitlistDisplayComponent