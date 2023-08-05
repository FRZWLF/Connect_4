class ImpressumComponent {

    //View
    getHTML() {
        var text = /*html*/`
        <div class= "impressum-window">
        <div class= "table-impressum">

    <style>
    h2 {
            text-align: left;
            width: 80%;
            margin: 1em auto; 
            color:white;    
        }
    h1 {
            text-align: left;
            width: 80%;
            margin: 1em auto; 
            color:white;
         
            }
        .impressum {
            hyphens: auto; 
            text-align: left;
            font-family: Arial, sans-serif;
            font-size: 18px;
            margin: 1em auto; 
            width: 80%;
            color:white;

            }    
    </style>
     <h1>Impressum</h1>

     <p class=impressum>

     Diese Webseite wurde im Rahmen des Moduls „Webprogrammierung“ an der EAH Jena im Sommersemester 2023 entwickelt.<br>
     Die Website wurde auf Basis von NodeJs erstellt.  
        </p>
        <p class=impressum>
        
     
        </p>
     
     <h2> Inhalte der Seite  </h2>
         <p class=impressum>
         Web Application des 4-Gewinnt-Spiels 
         </p>
    
         <h2> Verantwortliche für die Entwicklung dieser Webseite </h2> 
         <p >
         <table class= "table-impressum">  
            <tr>
                <td> Rico Richter    </td>
                <td> Alexander Muratov   </td>
                </tr>
                <tr>
                    <td>Philipp Rabsilber </td>
                    <td>Simona Schefner </td>
                </tr>
                <tr>
                    <td>Marvin Fiedler  </td>
                    <td>Lukas Kreuch   </td>
                </tr>  
                <tr>
                    <td>Idriss Rhadbane  </td>
                    <td>René Ernst   </td>
                </tr> 
                <tr>
                    <td>Alexander Schilling  </td>
                    <td>Daniel Krause   </td>
                </tr> 
                <tr>
                    <td>Marcel Schmidtke  </td>
                    <td>   </td>
                </tr> 
            </table> 


     <h2>Verantwortlicher Professor   </h2>
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
