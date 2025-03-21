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
          <td>Bottle Button</td>
        </tr>
        <tr>
          <td>Jump</td>
          <td><img class="jumpImg" src="img/space.png" alt="Space"></td>
          <td>Jump Button</td>
        </tr>
      </table>
    </div>`
}