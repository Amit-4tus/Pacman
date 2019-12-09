var GHOST = '#';

var gIntervalGhosts;
var gGhosts;
var gSuperfoods;

function createGhost(board, i, j) {
    var ghost = {
        location: {
            i: i,
            j: j
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createSuperfood(board, i, j) {
    var superfood = {
        location: {
            i: i,
            j: j
        }
    };
    gSuperfoods.push(superfood);
    board[superfood.location.i][superfood.location.j] = SUPERFOOD;
}

function createGhosts(board) {
    gGhosts = [];
    
    // empty the gGhosts array, create some ghosts
    createGhost(board, 3, 3)
    createGhost(board, 7, 7)
    createGhost(board, 2, 7)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function createSuperfoods(board) {
    gSuperfoods = [];
    createSuperfood(board, 1, 1)
    createSuperfood(board, 1, 8)
    createSuperfood(board, 8, 1)
    createSuperfood(board, 8, 8)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j}
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)
        
        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return

        // if PACMAN - gameLost, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            gameOver()
            return
        }
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            return
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomInt(0, 100)
    if (randNum < 25) {
        return {i: 0, j: 1}
    } else if (randNum < 50) {
        return {i: -1, j: 0}
    } else if (randNum < 75) {
        return {i: 0, j: -1}
    } else {
        return {i: 1, j: 0}
    }    
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}
