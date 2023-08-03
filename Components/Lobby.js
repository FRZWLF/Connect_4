module.exports = class Lobby {
    
    
    // View 
    getHTML(){
    var text = /* html */`
    
        <div class="lobby-page">
            <div class="forms-window lobby_window">
                <h1 class="Headline_Game">Connect4</h1>
            <div class="play_button">
                <button class="forms_button-action" onclick="spielstarten()"> Spiel starten! </button>
             </div>
            </div>
        </div>
`
    return text
    }
}