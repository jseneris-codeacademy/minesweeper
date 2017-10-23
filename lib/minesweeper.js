'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];

  for (var rowCount = 0; rowCount < numberOfRows; rowCount++) {
    var row = [];
    for (var colCount = 0; colCount < numberOfColumns; colCount++) {
      row.push(' ');
    }
    board.push(row);
  }

  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];

  for (var rowCount = 0; rowCount < numberOfRows; rowCount++) {
    var row = [];
    for (var colCount = 0; colCount < numberOfColumns; colCount++) {
      row.push(null);
    }
    board.push(row);
  }

  var numberofBombsPlaced = 0;
  while (numberofBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColIndex] !== 'B') {
      board[randomRowIndex][randomColIndex] = 'B';
      numberofBombsPlaced++;
    }
  }

  return board;
};

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborOffsets = [];
  neighborOffsets.push([rowIndex - 1, columnIndex - 1]);
  neighborOffsets.push([rowIndex - 1, columnIndex]);
  neighborOffsets.push([rowIndex - 1, columnIndex + 1]);
  neighborOffsets.push([rowIndex, columnIndex - 1]);
  neighborOffsets.push([rowIndex, columnIndex + 1]);
  neighborOffsets.push([rowIndex + 1, columnIndex - 1]);
  neighborOffsets.push([rowIndex + 1, columnIndex]);
  neighborOffsets.push([rowIndex + 1, columnIndex + 1]);

  var numberOfRows = bombBoard.length;
  var numberOfColums = bombBoard[0].length;
  var numberOfBombs = 0;

  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = offset[0];
    var neighborColumnIndex = offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows) {
      if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColums) {
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    }
  });

  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join('|');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);