class SpielregelnComponent {

    //View
    getHTML() {
        var text = /*html*/`
            <div class="spielregeln">
                <div class="spielregeln-window">
                     <div class="Headline_Spielregeln">
                         <h1>Spielregeln</h1>
                     </div>
                     <div class="spielregelnContent">
                         <div class="links">
                            <div class="introduction">
                                <h1>Ein Spiel für 2</h1>
                                    <div class="intro">
                                           <p class="p1">
                                           Mach Dich bereit für den Kampf um den Sieg. 
                                           Die Regeln sind Simpel und das Spiel immer wieder spannend.   
                                       	</p>
                                    </div>
                            </div>
                             
                            <div class="introduction2">
                                 <h1>Was brauchst du um zu gewinnen? </h1>
                                 <div class="intro">
                                     <p class="p1">
                                     Sei deinem Gegner immer einen Schritt voraus! 
                                     Achte darauf, wie deine Steine liegen und du bist auf der Sicheren Seite.  
                                     </p> 
                                </div>
                            </div>
                            
                         </div>
                         <div class="mitte">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Connect4_Wins.PNG" >
                         </div>
                         <div class="rechts">
                         <div class="introduction3">
                                <h1>Ziel des Spiels</h1>
                                <div class="intro">
                                    <p class="p1">
                                    Versuche durch dein strategisches Denken bei dem Spiel „Vier gewinnt “deinen Gegner zu übertrumpfen. 
                                    Schaffe es als erster, vier deiner Chips in eine Reihe, horizontal, vertikal oder diagonal zu positionieren und du gewinnst! 
                                  </p>
                                </div>            
                            </div>
                             <div class="introduction2">
                                <h1>SPIELABLAUF</h1>
                                <div class="spielablauf">
                                    <p class="p1">
                                    Ein Spieler Startet das Spiel mit einem Zug. 
                                    Drücke mit der Maus jeweils auf die Spalte, in der du deinen Chip einwerfen möchtest.
                                    Das Spiel ist beendet, sobald einer von den Spielern vier Chips in einer horizontalen, 
                                    vertikalen oder diagonalen Reihe positioniert hat. 
                                    Achte auf den Timer, für jeden Zug hat jeder Spieler 60 Sekunden.
                                    Wenn die Zei ohne einen Spielzug Abläuft, hat der andere Spieler gewonnen.
                                    Wer die ersten vier Chips in der Reihe zusammen positioniert, hat gewonnen.

                                 </p>
                                </div>    
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
                

        `
        return (text);
    }
}

module.exports = SpielregelnComponent
