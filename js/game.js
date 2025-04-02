/**
 * Hauptdatei für das Spiel. Hier werden globale Variablen und Funktionen zur Initialisierung,
 * Steuerung, Anzeige und Verwaltung des Spiels definiert.
 */

let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

/**
 * Initialisiert das Spiel, indem das Canvas-Element geholt und Event-Listener für Tastatur- und Mobile-Eingaben gesetzt werden.
 */
function init() {
  canvas = document.getElementById("canvas");
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  initMobileButtons();
}

/**
 * Initialisiert die Event-Listener für mobile Buttons.
 */
function initMobileButtons() {
  addMobileListeners("leftButton", "left");
  addMobileListeners("rightButton", "right");
  addMobileListeners("jumpButton", "jump");
  addMobileListeners("throwButton", "throw");
}

/**
 * Fügt einem mobilen Button Event-Listener hinzu, um Aktionen bei Pointer-Down und Pointer-Up auszulösen.
 *
 * @param {string} elementId - Die ID des DOM-Elements.
 * @param {string} action - Die Aktion, die beim Drücken bzw. Loslassen ausgeführt werden soll.
 */
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

/**
 * Wechselt das Layout des Spielcontainers.
 */
function toggleLayout() {
  const container = document.getElementById('gameContainer');
  container.classList.toggle('otherLayout');
}

/**
 * Startet das Spiel, sofern es nicht bereits gestartet wurde. Initialisiert den Sound, blendet Hauptmenü-Buttons aus
 * und erstellt eine neue Spielwelt.
 */
function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  soundManager.play('gamesound');

  hideMainButtons();
  showMobileButtonsIfNeeded();

  world = new World(canvas, keyboard);
  toggleLayout();
}

/**
 * Startet das Spiel neu, indem die aktuelle Spielwelt gestoppt, zurückgesetzt und alle UI-Elemente aktualisiert werden.
 */
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

/**
 * Blendet die Hauptmenü-Buttons aus.
 */
function hideMainButtons() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("infoButton").style.display = "none";
  document.getElementById("imprint").style.display = "none";
}

/**
 * Zeigt mobile Buttons an, falls die Bildschirmbreite 1280 Pixel oder weniger beträgt.
 */
function showMobileButtonsIfNeeded() {
  if (window.innerWidth <= 1280) {
    document.getElementById("leftButton").style.display = "flex";
    document.getElementById("rightButton").style.display = "flex";
    document.getElementById("jumpButton").style.display = "flex";
    document.getElementById("throwButton").style.display = "flex";
  }
}

/**
 * Schaltet den Sound um, indem das Sound-Icon gewechselt und der SoundManager entsprechend angepasst wird.
 */
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

/**
 * Aktiviert den Vollbildmodus für den Spielcontainer.
 */
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

/**
 * Beendet den Vollbildmodus für den Spielcontainer.
 */
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

/**
 * Wechselt zwischen Vollbild- und Fenstermodus.
 */
function toggleFullScreen() {
  if (!document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement) {
    enterFullScreen();
  } else {
    exitFullscreen();
  }
}

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

/**
 * Öffnet das Informationsfenster, indem Hauptmenü-Buttons ausgeblendet und die Steuerungsinformationen angezeigt werden.
 */
function openInfo() {
  document.getElementById("infoButton").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("imprint").style.display = "none";
  document.getElementById("headerButtons").style.display = "none";
  document.getElementById("closeInfoBtn").style.display = "flex";
  document.getElementById("showInfo").style.display = "flex";
  let showInfo = document.getElementById("showInfo");
  showInfo.innerHTML = getGameControlsTemplate();
}

/**
 * Schließt das Informationsfenster, indem die ursprünglichen Menü-Buttons wieder angezeigt werden.
 */
function closeInfo() {
  document.getElementById("infoButton").style.display = "flex";
  document.getElementById("startButton").style.display = "flex";
  document.getElementById("imprint").style.display = "flex";
  document.getElementById("headerButtons").style.display = "flex";
  document.getElementById("showInfo").style.display = "none";
  document.getElementById("closeInfoBtn").style.display = "none";
  document.getElementById("showInfo").innerHTML = "";
}

/**
 * Öffnet das Impressumfenster, indem Hauptmenü-Buttons ausgeblendet und das Impressum angezeigt wird.
 */
function openImprint() {
  document.getElementById("infoButton").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("imprint").style.display = "none";
  document.getElementById("headerButtons").style.display = "none";
  document.getElementById("closeImprintBtn").style.display = "flex";
  document.getElementById("imprintInfo").style.display = "flex";
  let showImprint = document.getElementById("imprintInfo");
  showImprint.innerHTML = getImprint();
}

/**
 * Schließt das Impressum, indem die ursprünglichen Menü-Buttons wieder angezeigt werden.
 */
function closeImprint() {
  document.getElementById("infoButton").style.display = "flex";
  document.getElementById("startButton").style.display = "flex";
  document.getElementById("imprint").style.display = "flex";
  document.getElementById("headerButtons").style.display = "flex";
  document.getElementById("closeImprintBtn").style.display = "none";
  document.getElementById("imprintInfo").style.display = "none";
  document.getElementById("imprintInfo").innerHTML = '';
  
}

/**
 * Verarbeitet das Drücken einer Taste und aktualisiert den Status des Keyboards.
 *
 * @param {KeyboardEvent} e - Das KeyboardEvent.
 */
function handleKeyDown(e) {
  if (e.keyCode === 32) keyboard.SPACE = true;
  if (e.keyCode === 37) keyboard.LEFT = true;
  if (e.keyCode === 38) keyboard.UP = true;
  if (e.keyCode === 39) keyboard.RIGHT = true;
  if (e.keyCode === 40) keyboard.DOWN = true;
  if (e.keyCode === 68) keyboard.D = true;
}

/**
 * Verarbeitet das Loslassen einer Taste und aktualisiert den Status des Keyboards.
 *
 * @param {KeyboardEvent} e - Das KeyboardEvent.
 */
function handleKeyUp(e) {
  if (e.keyCode === 32) keyboard.SPACE = false;
  if (e.keyCode === 37) keyboard.LEFT = false;
  if (e.keyCode === 38) keyboard.UP = false;
  if (e.keyCode === 39) keyboard.RIGHT = false;
  if (e.keyCode === 40) keyboard.DOWN = false;
  if (e.keyCode === 68) keyboard.D = false;
}

/**
 * Behandelt das Drücken eines mobilen Buttons und löst die entsprechende Aktion im Keyboard aus.
 *
 * @param {string} action - Die Aktion, die ausgelöst werden soll.
 */
function handleMobileButtonDown(action) {
  switch (action) {
    case 'left': keyboard.LEFT = true; break;
    case 'right': keyboard.RIGHT = true; break;
    case 'jump': keyboard.SPACE = true; break;
    case 'throw': keyboard.D = true; break;
    default: break;
  }
}

/**
 * Behandelt das Loslassen eines mobilen Buttons und setzt die entsprechende Aktion im Keyboard zurück.
 *
 * @param {string} action - Die Aktion, die zurückgesetzt werden soll.
 */
function handleMobileButtonUp(action) {
  switch (action) {
    case 'left': keyboard.LEFT = false; break;
    case 'right': keyboard.RIGHT = false; break;
    case 'jump': keyboard.SPACE = false; break;
    case 'throw': keyboard.D = false; break;
    default: break;
  }
}

function checkOrientation() {
  // Prüft, ob das Gerät im Querformat ist:
  if(window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById('rotate-message').style.display = 'block';
  } else {
    document.getElementById('rotate-message').style.display = 'none';
  }
}

// Überprüfe die Ausrichtung beim Laden, bei Größenänderungen und bei einer Orientierung-Änderung
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
checkOrientation();