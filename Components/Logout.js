class Logout {

    constructor() {
        window.logout = this.logout.bind(this) // Für FUnktionszugriff
    }

logout() {
    appstatus.loginUser = null;
    document.getElementById("Logout").style.display="block"
    document.getElementById("Login").style.display="none"

    router.gotoView("welcome")
    }

}
module.exports = Logout