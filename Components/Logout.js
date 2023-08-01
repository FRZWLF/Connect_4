class Logout {

    constructor() {
        window.logout = this.logout.bind(this)
    }

logout() {
    appstatus.loginUser = null;
    document.getElementById("Logout").style.display="block"
    document.getElementById("Login").style.display="none"

    router.gotoView("welcome")
    }




}
module.exports = Logout