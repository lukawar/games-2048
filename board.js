const boardSize = 4;
    let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    const gameDiv = document.getElementById("game");

    // board render
    function renderBoard() {
      gameDiv.innerHTML = "";
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          const value = board[row][col];
          if (value) {
            tile.classList.add(`tile-${value}`);
            tile.textContent = value;
          }
          gameDiv.appendChild(tile);
        }
      }
    }

    // put new tile on the board
    function addNewTile() {
      const emptyTiles = [];
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          if (board[row][col] === 0) {
            emptyTiles.push({ row, col });
          }
        }
      }
      if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
      }
    }

    // slide tiles
    function slide(row) {
      const newRow = row.filter(value => value !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i + 1] = 0;
        }
      }
      return newRow.filter(value => value !== 0).concat(Array(boardSize - newRow.filter(value => value !== 0).length).fill(0));
    }

    // left 
    function moveLeft() {
      for (let row = 0; row < boardSize; row++) {
        board[row] = slide(board[row]);
      }
      addNewTile();
      renderBoard();
    }

    // right
    function moveRight() {
      for (let row = 0; row < boardSize; row++) {
        board[row] = slide(board[row].reverse()).reverse();
      }
      addNewTile();
      renderBoard();
    }

    // up
    function moveUp() {
      for (let col = 0; col < boardSize; col++) {
        const column = board.map(row => row[col]);
        const newColumn = slide(column);
        for (let row = 0; row < boardSize; row++) {
          board[row][col] = newColumn[row];
        }
      }
      addNewTile();
      renderBoard();
    }

    // doen
    function moveDown() {
      for (let col = 0; col < boardSize; col++) {
        const column = board.map(row => row[col]).reverse();
        const newColumn = slide(column).reverse();
        for (let row = 0; row < boardSize; row++) {
          board[row][col] = newColumn[row];
        }
      }
      addNewTile();
      renderBoard();
    }

    // keys
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
      }
    });

    // initialize game
    function startGame() {
      board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
      addNewTile();
      addNewTile();
      renderBoard();
    }

    startGame();