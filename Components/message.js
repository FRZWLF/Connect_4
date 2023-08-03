module.exports = class MessageComponent{

    constructor(){
        window.message = this.info.bind(this)
    }

    info(ueberschrift, Nachricht, type){

        
        let messagediv = document.getElementById('alert') 
        messagediv.style.display='block'


        if (type == "fehler") messagediv.style.background = "red"

        messagediv.innerHTML = `<h2>${ueberschrift}  </h2> ${Nachricht}`
        messagediv.style.opacity = 1
       setTimeout(()=>{
        setInterval(() => {
            messagediv.style.opacity = messagediv.style.opacity -0.01
            if (messagediv.style.opacity==0) messagediv.style.display='none'
        }, 100)
       },5000) 
        
        
    }

}