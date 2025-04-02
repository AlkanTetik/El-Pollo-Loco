/**
 * Returns an HTML template string representing the game controls.
 *
 * @returns {string} An HTML string that displays the game control instructions.
 */
function getGameControlsTemplate() {
  return ` 
    <div class="info">
      <table>
        <tr>
          <th>ACTION</th>
          <th>KEYBOARD</th>
          <th>MOBILE</th>
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
    </div>`;
}

/**
 * Returns an HTML template string representing the imprint information.
 *
 * @returns {string} An HTML string that displays the imprint details.
 */
function getImprint() {
  return `
    <div class="imprint">
       <h4>Impressum</h4>
       <p><b>Informationen und Offenlegung gemäß §5 (1) ECG, §25 MedienG, §63 GewO und §14 UGB</b></p>
       <p><b>Webseitenbetreiber:</b> Alkan Tetik</p>
       <p><b>Anschrift:</b> Am Schöpfwerk 29, 1120 Wien</p>
       <p><b>Kontaktinformationen:</b> <br> <b>E-Mail:</b> alkan.tetik.at@gmail.com</p>
       <p><b>Anwendbare Rechtsvorschriften:</b> www.ris.bka.gv.at <br> <b>Berufsbezeichnung:</b> </p>
       <p>Quelle: <b><a target="_blank" style="color: #12ce41" href="https://www.fairesrecht.at/kostenlos-impressum-erstellen-generator.php">Impressum Generator Österreich</a></b></p>
    </div>
  `;
}
