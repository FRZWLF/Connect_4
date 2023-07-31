class SpielregelnComponent {

    //View
    getHTML() {
        var text = /*html*/`
    <style>
        h1 {
            text-align: center;
            }
        .p1 {
            hyphens: auto; 
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 18px;
            margin: 1em auto; 
            width: 20%;
            }    
    </style>

<h1>Ein Spiel für zwei Spieler</h1>
    <p class="p1">
        Mach Dich bereit für geistiges Kräftemessen,
        bei dem Sieg oder Niederlage ganz dicht beieinander liegen!
        Du brauchst nur vier Chips in eine Reihe zu bringen,
        horizontal, vertikal oder diagonal.<br><br> 
    </p>

<h1>Hört sich einfach an</h1>
    <p class="p1">
        ist es aber nicht! Du brauchst Dein ganzes taktisches Geschick,
        um vorauszuplanen - und gleichzeitig eine gute Defensivstrategie,
        um Deinen Gegenspieler in Schach zu halten!<br><br>
    </p>
    
     <p>
<h1>Ziel des Spiels</h1>
     <p class="p1">
        Ziel bei „Vier gewinnt“ ist es, die Steine der eigenen Farbe 
        so zu platzieren, dass 4 Steine diagonal, waagerecht oder 
        senkrecht in einer Reihe zum liegen kommen. 
        Der Spieler, dem das zuerst gelingt, der erhält einen Punkt oder hat gewonnen. 
     </p>

<br>
<h1>SPIELABLAUF</h1>
    <p class="p1">
    Entscheidet, wer das Spiel beginnt. <br>
    Wenn Du an der Reihe bist, wirfst Du EINEN Chip in IRGENDEINEN <br>
    der Einwurfschlitze an der Oberseite des Gitters. <br>
    Jeder wirft der Reihe nach seinen Chip ein, bis einer von Euch vier seiner Chips <br>
    in einer Reihe positioniert hat. Die vier in einer Reihe können <br>
    horizontal, vertikal oder diagonal sein. Siehe die Beispiele auf Seite 4. <br>
    Wer als erster vier in einer Reihe hat, gewinnt. <br>
    Um den Rahmen zu entleeren, muß man nur den Riegel auf der Unterseite zur Seite ziehen,<br>
    damit die Chips herausfallen. Dann wird der Riegel wieder zurückgestellt, <br>
    die Chips werden sortiert und das nächste Spiel kann beginnen!<br>
    </p>


        `
        return (text);
    }
}

module.exports = SpielregelnComponent
