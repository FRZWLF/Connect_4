// Die Klasse 'chatlist' repräsentiert eine Liste von Chatnachrichten.
class chatlist {
    // Der Konstruktor initialisiert die Chatliste als leeres Array.
    constructor() {
        this.chatlist =[]
    }

    // Die Methode 'addChatlist' fügt eine neue Nachricht am Ende der Chatliste hinzu.
    addChatlist(message){
        this.chatlist.push(message)
    }
}

// Die Klasse 'chatlist' wird exportiert, damit sie in anderen Teilen der Anwendung verwendet werden kann.
module.exports = chatlist
