// Importieren der erforderlichen Module
const fs = require('fs');
const User = require('./User')

// Definieren einer Klasse namens UserList
class UserList {
    constructor() {
        // Lesen der Datei "userlist.json" und Speichern des Inhalts in der Eigenschaft "file"
        this.file = fs.readFileSync("./Model/userlist.json", "utf8");
        // Umwandeln des Dateiinhalts in ein JavaScript-Objekt und Speichern in der Eigenschaft "userlist"
        this.userlist = JSON.parse(this.file)

    }

    // Methode zum Hinzufügen eines Benutzers zur Benutzerliste
    addUser(user) {
        try {
            // Hinzufügen des Benutzers zur Benutzerliste
            this.userlist[user.username] = user
            // Umwandeln der Benutzerliste in einen String
            const liststring = JSON.stringify(this.userlist)
            // Schreiben des Strings in die Datei "userlist.json"
            fs.writeFileSync("./Model/userlist.json", liststring)
        }

        catch (err) {
            // Ausgabe einer Fehlermeldung, wenn ein Problem auftritt
            console.log("Es gab ein Problem beim Hinzufügen von Ihnen als Benutzer. Versuchen Sie einen anderen Benutzernamen und füllen Sie alle Felder aus.")
        }
    }

    // Methode zum Abrufen eines Benutzers aus der Benutzerliste
    getUser(username) {
        // Abrufen des Benutzerobjekts aus der Benutzerliste mit dem bereitgestellten Benutzernamen als Schlüssel
        let userJson = this.userlist[username]
        let userObjkt = new User(userJson.username, userJson.password, userJson.firstname, userJson.surname, userJson.email)
        userObjkt.wins = userJson.wins
        userObjkt.loses = userJson.loses
        userObjkt.gamesplayed = userJson.gamesplayed
        userObjkt.wallet = userJson.wallet
        userObjkt.skinEquipped = userJson.skinEquipped
        userObjkt.primaryskin = userJson.primaryskin
        userObjkt.secondaryskin = userJson.secondaryskin
        userObjkt.verified = userJson.verified
        return userObjkt
    }

    //Alternative Methode zum Abrufen einer sortierten Liste der Benutzer, wenn gewählt auch die Alternative in ScoreBoardComponent.js verwenden
    getSortedList() {
        // Umwandlung des userlist-Objekts in ein Array von User objects
        let usersArray = Object.values(this.userlist);

        // Sortieren Sie das Array auf der Grundlage der "wins" jedes Users
        usersArray.sort((a, b) => b.wins - a.wins);

        // Das sortierte Array auf ein neues Array von Objekten mit den Eigenschaften "Rang", "Benutzername" und "Gewinne" abbilden
        let leaderboard = usersArray.map((user, index) => {
            return {
                rank: index + 1,
                username: user.username,
                wins: user.wins
            };
        });

        return leaderboard;
        }
    // Methode zum Überprüfen, ob ein Benutzer in der Benutzerliste vorhanden ist
    containsUser(username) {
        // Überprüfen, ob der Benutzername als Schlüssel in der Benutzerliste vorhanden ist
        return Object.hasOwn(this.userlist, username)
    }
}

// Exportieren der UserList-Klasse für die Verwendung in anderen Modulen
module.exports = UserList;


