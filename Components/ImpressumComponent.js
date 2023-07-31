class ImpressumComponent {

    //View
    getHTML() {
        var text = /*html*/`
    <style>
        h1 {
            text-align: center;
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

     <h1> Allgemeine Hinweise </h1>
     <p class=impressum>
     Das Impressum gilt für die zentralen Seiten des Webauftritts der Ernst-Abbe-Hochschule Jena sowie für die Seiten der Fachbereiche dieser Hochschule. Weiterhin gilt es für alle Telemedien der Ernst-Abbe-Hochschule Jena. Die Redaktion der Seiten der Fachbereiche sowie der Seiten der Telemedien obliegt den verantwortlichen Personen des jeweiligen Bereiches.
     <br>Die Ernst-Abbe-Hochschule Jena ist eine Körperschaft des öffentlichen Rechts und wird durch den Rektor, Prof. Dr. Steffen Teichert, vertreten.​
    </p>










     
     <h1> Hochschule </h1>
         <p class=impressum>
            Ernst-Abbe-Hochschule Jena

         </p>
     <h1> Verantwortlicher </h1>
        <p class=impressum>


        </p>
     <h1> Anschrift </h1>
         <p class=impressum>


         </p>
     <h1> Rechtsform </h1>
        <p class=impressum>


        </p>
     <h1> Kontaktdaten </h1>
        <p class=impressum>


        </p>





    `
        return (text);
    }
}

module.exports = ImpressumComponent
