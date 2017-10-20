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
    if (board[randomRowIndex][randomColIndex] === null) {
      board[randomRowIndex][randomColIndex] = 'B';
      numberofBombsPlaced++;
    }
  }

  return board;
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join('|');
  }).join('\n'));
};

console.log('Player Board: ');
printBoard(generatePlayerBoard(3, 4));
console.log('Bomb Board: ');
printBoard(generateBombBoard(3, 4, 5));