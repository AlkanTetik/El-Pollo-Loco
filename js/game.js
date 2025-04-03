/**
 * Main file for the game. Here global variables and functions for initializing,
 * controlling, displaying, and managing the game are defined.
 */

let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

/**
 * Initializes the game by retrieving the canvas element and setting up event listeners for keyboard and mobile inputs.
 */
function init() {
  canvas = document.getElementById("canvas");
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  initMobileButtons();
}

/**
 * Initializes the event listeners for mobile buttons.
 */
function initMobileButtons() {
  addMobileListeners("leftButton", "left");
  addMobileListeners("rightButton", "right");
  addMobileListeners("jumpButton", "jump");
  addMobileListeners("throwButton", "throw");
}

/**
 * Adds event listeners to a mobile button to trigger actions on pointer down and pointer up.
 *
 * @param {string} elementId - The ID of the DOM element.
 * @param {string} action - The action to execute on press and release.
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
 * Toggles the layout of the game container.
 */
function toggleLayout() {
  const container = document.getElementById('gameContainer');
  container.classList.toggle('otherLayout');
}

/**
 * Starts the game if it hasn't already started. Initializes the sound, hides the main menu buttons,
 * and creates a new game world.
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
 * Restarts the game by stopping and resetting the current game world and updating all UI elements.
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
 * Hides the main menu buttons.
 */
function hideMainButtons() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("infoButton").style.display = "none";
  document.getElementById("imprint").style.display = "none";
}

/**
 * Displays mobile buttons if the screen width is 1280 pixels or less.
 */
function showMobileButtonsIfNeeded() {
  if (window.innerWidth <= 1366) {
    document.getElementById("leftButton").style.display = "flex";
    document.getElementById("rightButton").style.display = "flex";
    document.getElementById("jumpButton").style.display = "flex";
    document.getElementById("throwButton").style.display = "flex";
  }
}

/**
 * Toggles the sound by switching the sound icon and adjusting the sound manager accordingly.
 */
function toggleSound() {
  const soundOn = document.getElementById("soundOnImg");
  const soundOff = document.getElementById("soundOffImg");

  if (soundOn.style.display !== "none") {
    soundOn.style.display = "none";
    soundOff.style.display = "block";
    soundManager.pauseAll();
    soundManager.soundEnabled = false;
    localStorage.setItem("soundStatus", "off");
  } else {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
    soundManager.soundEnabled = true;
    localStorage.setItem("soundStatus", "on");
    if (gameStarted) soundManager.play('gamesound');
  }
}

/**
 * Initializes the sound settings based on the stored user preference.
 *
 * This function executes when the DOM content is fully loaded. It retrieves the 'soundStatus'
 * from local storage and updates the UI and sound manager.
 */
document.addEventListener('DOMContentLoaded', () => {
  const soundStatus = localStorage.getItem("soundStatus");
  const soundOn = document.getElementById("soundOnImg");
  const soundOff = document.getElementById("soundOffImg");

  if (soundStatus === "off") {
    soundOn.style.display = "none";
    soundOff.style.display = "block";
    soundManager.soundEnabled = false;
  } else {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
    soundManager.soundEnabled = true;
  }
});

/**
 * Activates fullscreen mode for the game container.
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
    .catch(err => console.error("Error enabling fullscreen mode:", err));
}

/**
 * Exits fullscreen mode for the game container.
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
    .catch(err => console.error("Error exiting fullscreen mode:", err));
}

/**
 * Toggles between fullscreen and windowed mode.
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

/**
 * Handles changes in the fullscreen state.
 *
 * This event listener is triggered when the fullscreen mode changes. It checks if the document is
 * not in fullscreen mode by verifying the absence of document.fullscreenElement, document.webkitFullscreenElement,
 * and document.msFullscreenElement.
 */
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
 * Opens the information window by hiding the main menu buttons and displaying the control information.
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
 * Closes the information window by restoring the original menu buttons.
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
 * Opens the imprint window by hiding the main menu buttons and displaying the imprint information.
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
 * Closes the imprint window by restoring the original menu buttons.
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
 * Processes a keydown event and updates the keyboard status.
 *
 * @param {KeyboardEvent} e - The KeyboardEvent.
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
 * Processes a keyup event and updates the keyboard status.
 *
 * @param {KeyboardEvent} e - The KeyboardEvent.
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
 * Prevents the default context menu from appearing on the mobileButtons element.
 *
 * This function is executed when a "contextmenu" event (typically a right-click) is triggered on
 * the element with the id "mobileButtons". It calls preventDefault() on the event object, thereby
 * disabling the browser's default context menu from being displayed.
 *
 * @param {MouseEvent} event - The event object associated with the "contextmenu" event.
 */
document.getElementById('mobileButtons').addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

/**
 * Handles the pressing of a mobile button and triggers the corresponding action on the keyboard.
 *
 * @param {string} action - The action to trigger.
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
 * Handles the release of a mobile button and resets the corresponding action on the keyboard.
 *
 * @param {string} action - The action to reset.
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

/**
 * Checks if the window is in portrait orientation and adjusts the visibility of the element
 * with the ID "rotate-message" accordingly. Displays the message if the window is in portrait mode,
 * and hides it otherwise.
 */
function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById('rotate-message').style.display = 'block';
  } else {
    document.getElementById('rotate-message').style.display = 'none';
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
checkOrientation();
