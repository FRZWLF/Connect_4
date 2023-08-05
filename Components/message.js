module.exports = class MessageComponent {

    constructor() {
        window.message = this.info.bind(this)
        window.closemessage = this.close.bind(this)
    }
    close() {
        console.log("test")
        let messagediv = document.getElementById('alert')
        messagediv.style.display = 'none'
    }


    info(ueberschrift, Nachricht, type) {

        try { clearInterval(this.setI) } catch { }
        try { clearTimeout(this.setT) } catch { }
        let messagediv = document.getElementById('alert')
        messagediv.style.display = 'flex'


        if (type == "fehler") messagediv.style.background = "red"
        else
            if (type == "info") messagediv.style.background = "rgb(52, 141, 201)"
            else
                messagediv.style.background = "rgba(38, 255, 0, 0.63)"
    
        messagediv.innerHTML = `<h2 class="alertheadline">${ueberschrift} <button onclick="closemessage()" id="close" >X</button> </h2>  ${Nachricht}`

        messagediv.style.opacity = 1
        this.setT = setTimeout(() => {
            this.setI = setInterval(() => {
                messagediv.style.opacity = messagediv.style.opacity - 0.01
                if (messagediv.style.opacity == 0) {
                    messagediv.style.display = 'none'
                    clearInterval(this.setI)
                    clearTimeout(this.setT)
                }
            }, 10)
        }, 3000)


    }

}