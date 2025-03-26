let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

function init() {
  canvas = document.getElementById("canvas");
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  initMobileButtons();
}

function initMobileButtons() {
  function addMobileListeners(elementId, action) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.addEventListener('pointerdown', e => {
      e.preventDefault();
      handleMobileButtonDown(action);
    });
    element.addEventListener('pointerup', e => {
      e.preventDefault();
      handleMobileButtonUp(action);
    });
  }
  addMobileListeners("leftButton", "left");
  addMobileListeners("rightButton", "right");
  addMobileListeners("jumpButton", "jump");
  addMobileListeners("throwButton", "throw");
}

function toggleLayout() {
  const container = document.getElementById('gameContainer');
  // Schaltet die "otherLayout"-Klasse ein/aus, ohne "gameContainer" zu entfernen
  container.classList.toggle('otherLayout');
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  
  soundManager.play('gamesound');
  
  document.getElementById("startButton").style.display = "none";
  document.getElementById("infoButton").style.display = "none";

  // Überprüfen, ob die Fensterbreite mindestens 1280px beträgt
  if (window.innerWidth <= 1280) {
    document.getElementById("leftButton").style.display = "flex";
    document.getElementById("rightButton").style.display = "flex";
    document.getElementById("jumpButton").style.display = "flex";
    document.getElementById("throwButton").style.display = "flex";
  }
  
  world = new World(canvas, keyboard);

  toggleLayout();
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
  document.getElementById("backLoseMenu").style.display = "none";
  document.getElementById("backWinMenu").style.display = "none";
  keyboard = new Keyboard();
  startGame();
}

function toggleSound() {
  const soundOn = document.getElementById("soundOnImg");
  const soundOff = document.getElementById("soundOffImg");

  if (soundOn.style.display !== "none") {
    soundOn.style.display = "none";
    soundOff.style.display = "block";
    soundManager.soundEnabled = false;
    soundManager.pauseAll();
  } else {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
    soundManager.soundEnabled = true;
  }
}

function enterFullScreen() {
  let container = document.getElementById('gameContainer');
  let fullScreenImg = document.getElementById('full-screen');
  let exitScreenImg = document.getElementById('exitScreen');

  container.requestFullscreen()
    .then(() => {
      container.classList.add('fullscreen-active');
      fullScreenImg.style.display = '';
      exitScreenImg.style.display = 'block';
    })
    .catch(err => console.error("Fehler beim Aktivieren des Vollbildmodus:", err));
}

function exitFullscreen() {
  let container = document.getElementById('gameContainer');
  let fullScreenImg = document.getElementById('full-screen');
  let exitScreenImg = document.getElementById('exitScreen');

  document.exitFullscreen()
    .then(() => {
      container.classList.remove('fullscreen-active');
      fullScreenImg.style.display = 'block';
      exitScreenImg.style.display = 'none';
    })
    .catch(err => console.error("Fehler beim Beenden des Vollbildmodus:", err));
}

function toggleFullScreen() {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement) {
    enterFullScreen();
  } else {
    exitFullscreen();
  }
}

// Event-Listener, der auch auf ESC reagiert (und andere Veränderungen des Vollbildmodus)
document.addEventListener("fullscreenchange", () => {
  let container = document.getElementById('gameContainer');
  let fullScreenImg = document.getElementById('full-screen');
  let exitScreenImg = document.getElementById('exitScreen');

  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement) {
    container.classList.remove('fullscreen-active');
    fullScreenImg.style.display = 'block';
    exitScreenImg.style.display = 'none';
  }
});

function openInfo() {
  document.getElementById("infoButton").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("headerButtons").style.display = "none";
  document.getElementById("closeInfoBtn").style.display = "flex";
  document.getElementById("showInfo").style.display = "flex";
  let showInfo = document.getElementById("showInfo");
  showInfo.innerHTML = getGameControlsTemplate();
}

function closeInfo() {
  document.getElementById("infoButton").style.display = "flex";
  document.getElementById("startButton").style.display = "flex";
  document.getElementById("headerButtons").style.display = "flex";
  document.getElementById("showInfo").style.display = "none";
  document.getElementById("closeInfoBtn").style.display = "none";
  document.getElementById("showInfo").innerHTML = "";
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

function handleMobileButtonDown(action) {
  switch (action) {
    case 'left': keyboard.LEFT = true; break;
    case 'right': keyboard.RIGHT = true; break;
    case 'jump': keyboard.SPACE = true; break;
    case 'throw': keyboard.D = true; break;
    default: break;
  }
}

function handleMobileButtonUp(action) {
  switch (action) {
    case 'left': keyboard.LEFT = false; break;
    case 'right': keyboard.RIGHT = false; break;
    case 'jump': keyboard.SPACE = false; break;
    case 'throw': keyboard.D = false; break;
    default: break;
  }
}
