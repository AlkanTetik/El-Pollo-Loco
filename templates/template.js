function getGameControlsTemplate() {
   return ` 
    <div class="info">
      <table>
        <tr>
          <th>ACTION</th>
          <th>KEYBOARD</th>
          <th>MOBIL</th>
        </tr>
        <tr>
          <td>Move Left</td>
          <td><img class="moveLeftImg" src="img/rechter-pfeil.png" alt="Left Arrow"></td>
          <td>Left Button</td>
        </tr>
        <tr>
          <td>Move Right</td>
          <td><img class="moveRightImg" src="img/rechter-pfeil.png" alt="Right Arrow"></td>
          <td>Right Button</td>
        </tr>
        <tr>
          <td>Throw Bottle</td>
          <td><strong>D</strong></td>
          <td>Throw Button</td>
        </tr>
        <tr>
          <td>Jump</td>
          <td><img class="jumpImg" src="img/space.png" alt="Space"></td>
          <td>Jump Button</td>
        </tr>
      </table>
    </div>`
}

function getImprint() {
  return `
  <div class="imprint">
   <h4>Impressum</h4>
    <p><b>Informationen und Offenlegung gemäß &sect;5 (1) ECG, &sect; 25 MedienG, &sect; 63 GewO und &sect; 14 UGB</b>
    </p>
    <p><b>Webseitenbetreiber:</b> Alkan Tetik</p>
    <p><b>Anschrift:</b> Am Schöpfwerk 29, 1120 Wien</p>
    <p><b>UID-Nr:</b> <br> <b>Gewerbeaufsichtbehörde:</b> <br> <b>Mitgliedschaften:</b></p>
    <p><b>Kontaktdaten:</b> <br> Telefon: <br> Email: alkan.tetik.at@gmail.com <br> Fax: </p>

    <p><b>Anwendbare Rechtsvorschrift:</b> www.ris.bka.gv.at <br> <b>Berufsbezeichnung:</b> </p>
    <p>Quelle: <b><a target="_blank" style="color: #12ce41" href="https://www.fairesrecht.at/kostenlos-impressum-erstellen-generator.php">Impressum Generator
                Österreich</a></b></p>
   </div>
`
}