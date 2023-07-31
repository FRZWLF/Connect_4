class ImpressumComponent {

    //View
    getHTML() {
        var text = /*html*/`
    <style>
        h1 {
            text-align: left;
            width: 80%;
            margin: 1em auto; 
            }
        .impressum {
            hyphens: auto; 
            text-align: left;
            font-family: Arial, sans-serif;
            font-size: 18px;
            margin: 1em auto; 
            width: 80%;
            }    
    </style>
     <h1>Impressum</h1>

     <p class=impressum>
     Dieses Impressum gilt für die Single Page Application. 
    </p>



     
     <h1> Inhalte der Seite  </h1>
         <p class=impressum>
         4-Gewinnt-Spiel 
         </p>
    
         <h1> Verantwortliche für die Entwicklung dieser Seite </h1>
        <p class=impressum>

        Teilnehmer des Moduls „Webprogrammierung“ im Sommersemester 2023 
        </p>
     <h1>Verantwortlicher Professor   </h1>
         <p class=impressum>
        Prof. Dr. Thomas Wöhner  <br> 
        Telefon : +49 3641 205 498 <br>
        Telefax	: +49 3641 205 551<br>
        E-Mail : thomas.woehner@eah-jena.de<br>
         </p>

    `
        return (text);
    }
}

module.exports = ImpressumComponent
