var gPacman;
var PACMAN = '<h6 style="transform: rotate (90deg)"> &#9786; </h6>';;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  
  // elPacman = document.querySelector('h6');
  if (eventKeyboard.key === "ArrowUp") PACMAN = '<h6 style="transform: rotate(0deg)"> &#9786; </h6>';
  if (eventKeyboard.key === "ArrowRight") PACMAN = '<h6 style="transform: rotate(90deg)"> &#9786; </h6>';
  if (eventKeyboard.key === "ArrowDown") PACMAN = '<h6 style="transform: rotate(180deg)"> &#9786; </h6>';
  if (eventKeyboard.key === "ArrowLeft") PACMAN = '<h6 style="transform: rotate(270deg)"> &#9786; </h6>';
  
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    console.log(gFoodCount);
  }
  else if (nextCell === SUPERFOOD) {
    isInvincible = true;
    setTimeout(() => {
      isInvincible = !isInvincible
    }, 5000);
  } else if (nextCell === GHOST) {
    if (!isInvincible) {
      gameOver()
      renderCell(gPacman.location, EMPTY);
    }
  }
  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}