module.exports = class Router {

    constructor () {
        this.viewMap = new Map();
        // bind, da Methode als Callback aus der Klasse extrahiert wird
        window.addEventListener('hashchange', this.refresh.bind(this));
        window.addEventListener('load', this.refresh.bind(this));
    }

    addView(viewname, component) {
        this.viewMap.set(viewname, component);
    }

    gotoView(viewname, menue, setActive) {
        if (menue=="logedin") {
            console.log("Logedin")
            document.getElementById("Logout").style.display = "none" // NavBar Ein-/Ausblendung steuern
            document.getElementById("Login").style.display = "flex"
            if(setActive == "lobby") {
                document.getElementById("nutzerdaten").classList.remove('active')
                document.getElementById("spielregelnLogin").classList.remove('active')
                document.getElementById("lobby").classList.add('active')
                document.getElementById("scoreboardlnLogin").classList.remove('active')
                document.getElementById("gameAI").classList.remove('active')
            } else if (setActive == "nutzerdaten") {
                document.getElementById("lobby").classList.remove('active')
                document.getElementById("nutzerdaten").classList.add('active')
                document.getElementById("spielregelnLogin").classList.remove('active')
                document.getElementById("scoreboardlnLogin").classList.remove('active')
                document.getElementById("gameAI").classList.remove('active')
            } else if (setActive == "spielregeln") {
                document.getElementById("lobby").classList.remove('active')
                document.getElementById("nutzerdaten").classList.remove('active')
                document.getElementById("spielregelnLogin").classList.add('active')
                document.getElementById("scoreboardlnLogin").classList.remove('active')
                document.getElementById("gameAI").classList.remove('active')
            } else if (setActive == "scoreboard") {
                document.getElementById("lobby").classList.remove('active')
                document.getElementById("nutzerdaten").classList.remove('active')
                document.getElementById("spielregelnLogin").classList.remove('active')
                document.getElementById("scoreboardlnLogin").classList.add('active')
                document.getElementById("gameAI").classList.remove('active')
            } else if (setActive == "gameAI") {
                document.getElementById("lobby").classList.remove('active')
                document.getElementById("nutzerdaten").classList.remove('active')
                document.getElementById("spielregelnLogin").classList.remove('active')
                document.getElementById("scoreboardlnLogin").classList.remove('active')
                document.getElementById("gameAI").classList.add('active')
            } else if (setActive == "game") {
                document.getElementById("lobby").classList.remove('active')
                document.getElementById("nutzerdaten").classList.remove('active')
                document.getElementById("spielregelnLogin").classList.remove('active')
                document.getElementById("scoreboardlnLogin").classList.remove('active')
                document.getElementById("gameAI").classList.remove('active')
            }
        } else {

            document.getElementById("Logout").style.display = "flex" // NavBar Ein-/Ausblendung steuern
            document.getElementById("Login").style.display = "none"

            if(setActive == "welcome") {
                document.getElementById("welcome").classList.add('active')
                document.getElementById("login").classList.remove('active')
                document.getElementById("registrierung").classList.remove('active')
                document.getElementById("spielregelnLogout").classList.remove('active')
                document.getElementById("scoreboardlnLogout").classList.remove('active')

            } else if (setActive == "login") {
                document.getElementById("welcome").classList.remove('active')
                document.getElementById("login").classList.add('active')
                document.getElementById("registrierung").classList.remove('active')
                document.getElementById("spielregelnLogout").classList.remove('active')
                document.getElementById("scoreboardlnLogout").classList.remove('active')

            } else if (setActive == "registrierung") {
                document.getElementById("welcome").classList.remove('active')
                document.getElementById("login").classList.remove('active')
                document.getElementById("registrierung").classList.add('active')
                document.getElementById("spielregelnLogout").classList.remove('active')
                document.getElementById("scoreboardlnLogout").classList.remove('active')

            } else if (setActive == "spielregeln") {
                document.getElementById("welcome").classList.remove('active')
                document.getElementById("login").classList.remove('active')
                document.getElementById("registrierung").classList.remove('active')
                document.getElementById("spielregelnLogout").classList.add('active')
                document.getElementById("scoreboardlnLogout").classList.remove('active')

            } else if (setActive == "scoreboard") {
                document.getElementById("welcome").classList.remove('active')
                document.getElementById("login").classList.remove('active')
                document.getElementById("registrierung").classList.remove('active')
                document.getElementById("spielregelnLogout").classList.remove('active')
                document.getElementById("scoreboardlnLogout").classList.add('active')
            }
        }
     
     
           document.location.hash = '#' + viewname;

     

    }

    refresh() {
        const component = document.location.hash.slice(1);
        const contententrypoint = document.getElementById('appcontent');

        if (this.viewMap.has(component)) {
            contententrypoint.innerHTML = this.viewMap.get(component).getHTML();
        };
    };

};