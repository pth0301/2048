var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame(); // initialize the game
    document.getElementById("newGame").addEventListener("click", newGame);
};

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    document.getElementById("board").innerHTML = ""; 

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, board[r][c]);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo(); 
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) return;

    let found = false;
    while (!found) {
        // ensure r, c = {0, 1, 2, 3}
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 2);
            found = true; 
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = num > 0 ? num : "";
    tile.className = "tile";
    if (num > 0) {
        tile.classList.add(num <= 4096 ? "x" + num.toString() : "x8192");
    }
}

document.addEventListener("keyup", (event) => {
    let moved = false;
    if (event.code === "ArrowLeft") moved = slideLeft();
    if (event.code === "ArrowRight") moved = slideRight();
    if (event.code === "ArrowUp") moved = slideUp();
    if (event.code === "ArrowDown") moved = slideDown();

    if (moved) setTwo(); // Chỉ thêm số 2 nếu có sự di chuyển
    document.getElementById("score").innerText = score;
});

function filterZero(row) {
    return row.filter((num) => num !== 0);
}

function slide(row) { // process accumulation and combine the same tile number
    row = filterZero(row); // delete 0 from rows -> slide toward one direction
    
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) { // combine same tile
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i]; // Cập nhật điểm số
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    let moved = false; // assume that nothing moved
    for (let r = 0; r < rows; r++) {
        let newRow = slide(board[r]);
        if (JSON.stringify(board[r]) !== JSON.stringify(newRow)) moved = true;
        board[r] = newRow; // update new row in board with newRow value
        updateRow(r); // update UI 
    }
    return moved;
}

function slideRight() {
    let moved = false;
    for (let r = 0; r < rows; r++) {
        let newRow = slide(board[r].reverse()).reverse();
        if (JSON.stringify(board[r]) !== JSON.stringify(newRow)) moved = true;
        board[r] = newRow;
        updateRow(r);
    }
    return moved;
}

function slideUp() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newCol = slide(col);
        if (JSON.stringify(col) !== JSON.stringify(newCol)) moved = true;
        for (let r = 0; r < rows; r++) {
            board[r][c] = newCol[r];
        }
    }
    updateBoard();
    return moved;
}

function slideDown() {
    let moved = false;
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
        let newCol = slide(col).reverse();
        if (JSON.stringify(col.reverse()) !== JSON.stringify(newCol)) moved = true;
        for (let r = 0; r < rows; r++) {
            board[r][c] = newCol[r];
        }
    }
    updateBoard();
    return moved;
}

function updateRow(r) {
    for (let c = 0; c < columns; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        updateTile(tile, board[r][c]);
    }
}

function updateBoard() {
    for (let r = 0; r < rows; r++) {
        updateRow(r);
    }
}

// Start new game
function newGame(){
    score = 0;
    document.getElementById("score").innerText = score;
    setGame();
}