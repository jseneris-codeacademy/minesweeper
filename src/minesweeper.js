const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];

  for (let rowCount = 0; rowCount < numberOfRows; rowCount++){
    const row = [];
    for (let colCount = 0; colCount < numberOfColumns; colCount++){
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];

  for (let rowCount = 0; rowCount < numberOfRows; rowCount++){
    const row = [];
    for (let colCount = 0; colCount < numberOfColumns; colCount++){
      row.push(null);
    }
    board.push(row);
  }

  let numberofBombsPlaced = 0;
  while (numberofBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColIndex = Math.floor(Math.random()*numberOfColumns);
    if (board[randomRowIndex][randomColIndex] === null){
      board[randomRowIndex][randomColIndex] = 'B';
      numberofBombsPlaced++;
    }
  }

  return board;
};

const printBoard = board => {
  console.log(board.map(row => row.join('|')).join('\n'));
};

console.log('Player Board: ')
printBoard(generatePlayerBoard(3,4));
console.log('Bomb Board: ')
printBoard(generateBombBoard(3,4,5));
