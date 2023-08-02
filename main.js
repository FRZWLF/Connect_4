
var Router = require('./Components/router')
window.router = new Router()
// Router ist global bekannt und kann überall genutzt werden

var Appstatus = require('./Model/appstatus')
window.appstatus = new Appstatus()

const io = require('socket.io-client')
window.socket = io();

socket.on("connect",  () => {
    console.log("Socket.IO-Verbindung eröffnet")
})

var WelcomeComponent = require('./Components/WelcomeComponent')
var welcomeComponent = new WelcomeComponent(2023)
router.addView('welcome', welcomeComponent);

var WelcomeLogin = require('./Components/LogIn.js')
var welcomeLogin = new WelcomeLogin(2023)
router.addView('login', welcomeLogin);

var registrationComponent = require("./Components/registrationComponent")
var registrationcomponent = new registrationComponent()
router.addView("registrierung", registrationcomponent)

var GameComponent = require("./Components/GameComponent")
var gameComp = new GameComponent()
router.addView("game",gameComp)
//Startsteite

var Message = require("./Components/message")
var message = new Message()


// Test Comment to be deleted
//hi
//hallo wie geht es dir
var WaitlistDisplayComponent = require("./Components/WaitlistDisplayComponent")
var WLComponent = new WaitlistDisplayComponent()
router.addView("waitlist",WLComponent)


var ChangeuserdataComponent = require("./Components/ChangeuserdataComponent")
var changeuserdataComponent = new ChangeuserdataComponent()
router.addView("nutzerdaten_aendern", changeuserdataComponent)

var SpielregelnComponent = require('./Components/SpielregelnComponent')
var spielregelnComponent = new SpielregelnComponent()
router.addView('spielregeln', spielregelnComponent)

var ImpressumComponent = require('./Components/ImpressumComponent')
var impressumComponent = new ImpressumComponent()
router.addView('impressum', impressumComponent)

router.gotoView('waitlist');

router.gotoView('welcome');
console.log("Willkommen zur Projektwoche 2023!")

