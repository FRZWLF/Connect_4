
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

//Startsteite
router.gotoView('welcome');
console.log("Willkommen zur Projektwoche 2023!")

//ein lustiger Kommentar
//hallo wie geht es dir

//wow, Dies ist eine Änderung von Marvin!
// Test Comment to be deleted
//hi
