let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function init() {
    canvas = document.getElementById("canvas");
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    document.getElementById("startButton").style.display = "none";
    document.getElementById('infoButton').style.display = 'none';
    
    world = new World(canvas, keyboard);
}

function restartGame() {
    if (world && typeof world.stop === 'function') {
        world.stop();
        world.resetLevel();
    }
    world = null;
    gameStarted = false;
    document.getElementById("overlayLose").style.display = "none";
    document.getElementById("overlayWin").style.display = "none";
    keyboard = new Keyboard();
    startGame();
}

function openInfo() {
  document.getElementById('infoButton').style.display = 'none';
  document.getElementById('startButton').style.display = 'none';
  let showInfo = document.getElementById('showInfo');
  showInfo.innerHTML = `
  <button class='closeInfoBtn' onclick='closeInfo()'>BACK</button>
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
    </div>`;
}

function closeInfo() {
  document.getElementById('infoButton').style.display = 'flex';
  document.getElementById('startButton').style.display = 'flex';
  let showInfo = document.getElementById('showInfo');
  showInfo.innerHTML = '';
}
  



function handleKeyDown(e) {
    if (e.keyCode === 32) keyboard.SPACE = true;
    if (e.keyCode === 37) keyboard.LEFT = true;
    if (e.keyCode === 38) keyboard.UP = true;
    if (e.keyCode === 39) keyboard.RIGHT = true;
    if (e.keyCode === 40) keyboard.DOWN = true;
    if (e.keyCode === 68) keyboard.D = true;
}

function handleKeyUp(e) {
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 37) keyboard.LEFT = false;
    if (e.keyCode === 38) keyboard.UP = false;
    if (e.keyCode === 39) keyboard.RIGHT = false;
    if (e.keyCode === 40) keyboard.DOWN = false;
    if (e.keyCode === 68) keyboard.D = false;
}
