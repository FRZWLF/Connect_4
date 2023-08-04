// Definieren einer Klasse namens ScoreboardComponent
class ScoreboardComponent {
    constructor() {
        this.scoreboard = [];
        window.highscore = this.highscore.bind(this)
    }

    // Methode zum Abrufen der Highscores
    highscore() {
        socket.emit("highscore", true)
        if(appstatus.loginUser) router.gotoView("scoreboard", 'logedin', 'scoreboard')
        else router.gotoView("scoreboard", 'scoreboard')        
        socket.on("newBoard", (liste) => {
            // empfangene Liste direkt this.scoreboard zuweisen 
            this.scoreboard = liste;
            router.refresh()
        })
    }

    // Methode zum Generieren des HTML-Codes für das Scoreboard
    getHTML() {
        // Erstellen des HTML-Codes für jede Zeile des Scoreboards
        // Direkter Zugriff auf die Eigenschaften der einzelnen Benutzerobjekte
        let scoreboardHTML = this.scoreboard.map(element => {
            return `<tr><td>${element.rank}</td><td>${element.username}</td><td>${element.wins}</td></tr>`;
        }).join('');
    
        var text = /*html*/`
        <div class="login-page">
            <h1 id="Scoreboardh1">Scoreboard</h1>
            <div id="scoreboard-div"> 
                <table class="scoreboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scoreboardHTML}
                    </tbody>
                </table>
            </div>
        </div>    
        `
        return (text)
    }    
}

module.exports = ScoreboardComponent;
