'use strict';
var WALL = '&#9781;';
var FOOD = '.';
var SUPERFOOD = '	o';
var CHERRY = '@';
var EMPTY = ' ';

var gFoodCount = -5;
var gBoard;
var isInvincible = false;
var gCherryInterval;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  createSuperfoods(gBoard);

  printMat(gBoard, '.board-container');
  // for (var i = 0; i < 3; i++) {
  //   renderCell(gGhosts[i].location, GHOST);
  gGame.isOn = true;
  gCherryInterval = setInterval(createCherrie, 15000);

  document.querySelector('.lose').classList.add('hide');
  document.querySelector('.win').classList.add('hide');
  document.querySelector('button').classList.add('hide');
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gFoodCount--;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  gFoodCount--;
  if (gFoodCount === 0) {
    gameOver();
  }
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  if (gFoodCount === 0) {
    console.log('Game Won');
    document.querySelector('.win').classList.remove('hide');
  } else {
    console.log('Game Lost');
    document.querySelector('.lose').classList.remove('hide');
  }
  gGame.isOn = false;
  clearInterval(gCherryInterval);
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  document.querySelector('button').classList.remove('hide');
}

function createCherrie() {
  var randomIIdx = getRandomInt(1, gBoard.length - 2);
	var randomJIdx = getRandomInt(1, gBoard[0].length - 2);
	var randomCell = gBoard[randomIIdx][randomJIdx];
	if (randomCell === EMPTY) {
    // randomCell = CHERRY;
    gBoard[randomIIdx][randomJIdx] = CHERRY
    console.log('placed cherry in:', randomIIdx, randomJIdx, randomCell);
    
		gFoodCount--;
		renderCell({ i: randomIIdx, j: randomJIdx }, CHERRY);
	}
	else createCherrie();
}