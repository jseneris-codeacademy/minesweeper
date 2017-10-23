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
    if (board[randomRowIndex][randomColIndex] !== 'B'){
      board[randomRowIndex][randomColIndex] = 'B';
      numberofBombsPlaced++;
    }
  }

  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [];
  neighborOffsets.push([rowIndex-1, columnIndex-1]);
  neighborOffsets.push([rowIndex-1, columnIndex]);
  neighborOffsets.push([rowIndex-1, columnIndex+1]);
  neighborOffsets.push([rowIndex, columnIndex-1]);
  neighborOffsets.push([rowIndex, columnIndex+1]);
  neighborOffsets.push([rowIndex+1, columnIndex-1]);
  neighborOffsets.push([rowIndex+1, columnIndex]);
  neighborOffsets.push([rowIndex+1, columnIndex+1]);

  const numberOfRows = bombBoard.length;
  const numberOfColums = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = offset[0];
    const neighborColumnIndex = offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows){
      if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColums){
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numberOfBombs++;
        }
      }
    }
  });

  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  }
  else if(bombBoard[rowIndex][columnIndex] === 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  }
  else{
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};


const printBoard = board => {
  console.log(board.map(row => row.join('|')).join('\n'));
};

const playerBoard = generatePlayerBoard(3,4);
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ')
printBoard(playerBoard);
console.log('Bomb Board: ')
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
