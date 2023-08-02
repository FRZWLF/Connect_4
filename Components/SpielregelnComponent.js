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
                                <h1>Ein Spiel für zwei Spieler</h1>
                                    <div class="intro">
                                           <p class="p1">
                                               Mach Dich bereit für geistiges Kräftemessen,
                                               bei dem Sieg oder Niederlage ganz dicht beieinander liegen!
                                               Du brauchst nur vier Chips in eine Reihe zu bringen,
                                               horizontal, vertikal oder diagonal.
                                       	</p>
                                    </div>
                            </div>
                             
                            <div class="introduction2">
                                 <h1>Hört sich einfach an</h1>
                                 <div class="intro">
                                     <p class="p1">
                                         ist es aber nicht! Du brauchst Dein ganzes taktisches Geschick,
                                         um vorauszuplanen - und gleichzeitig eine gute Defensivstrategie,
                                         um Deinen Gegenspieler in Schach zu halten!
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
                                     Ziel bei „Vier gewinnt“ ist es, die Steine der eigenen Farbe 
                                     so zu platzieren, dass 4 Steine diagonal, waagerecht oder 
                                     senkrecht in einer Reihe zum liegen kommen. 
                                     Der Spieler, dem das zuerst gelingt, der erhält einen Punkt oder hat gewonnen. 
                                  </p>
                                </div>            
                            </div>
                             <div class="introduction2">
                                <h1>SPIELABLAUF</h1>
                                <div class="spielablauf">
                                    <p class="p1">
                                     Entscheidet, wer das Spiel beginnt. <br>
                                     Wenn Du an der Reihe bist, wirfst Du EINEN Chip in IRGENDEINEN
                                     der Einwurfschlitze an der Oberseite des Gitters. <br>
                                     Jeder wirft der Reihe nach seinen Chip ein, bis einer von Euch vier seiner Chips
                                     in einer Reihe positioniert hat. <br> Die vier in einer Reihe können 
                                     horizontal, vertikal oder diagonal sein. Siehe die Beispiele auf Seite 4. <br>
                                     Wer als erster vier in einer Reihe hat, gewinnt. <br>
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
