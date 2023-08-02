var Router = require('./Components/router')
var game = require('./Model/Game')
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

var registrationComponent = require("./Components/registrationComponent")
var registrationcomponent = new registrationComponent()
router.addView("registrierung", registrationcomponent)

var User = require("./Model/User")
let user = new User('daniel', '123456', 'firstname', 'surname', 'emai@outlook.com')
appstatus.loginUser = user
socket.emit('create', user.username);

let match = new game(user.username, "Lukas", 8, 8)

var gameComponent = require("./Components/GameComponent")
var gamecomponent = new gameComponent(user, match)
router.addView("game", gamecomponent)
//Startsteite




// Test Comment to be deleted
//hi
//hallo wie geht es dir

var SpielregelnComponent = require('./Components/SpielregelnComponent')
var spielregelnComponent = new SpielregelnComponent()
router.addView('spielregeln', spielregelnComponent)

var ImpressumComponent = require('./Components/ImpressumComponent')
var impressumComponent = new ImpressumComponent()
router.addView('impressum', impressumComponent)

router.gotoView('game');
console.log("Willkommen zur Projektwoche 2023!")

