export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  //flip tile and reveal what is under it
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }
    else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else{
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  //method to get number of neighboring bombs
  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [];
    neighborOffsets.push([rowIndex-1, columnIndex-1]);
    neighborOffsets.push([rowIndex-1, columnIndex]);
    neighborOffsets.push([rowIndex-1, columnIndex+1]);
    neighborOffsets.push([rowIndex, columnIndex-1]);
    neighborOffsets.push([rowIndex, columnIndex+1]);
    neighborOffsets.push([rowIndex+1, columnIndex-1]);
    neighborOffsets.push([rowIndex+1, columnIndex]);
    neighborOffsets.push([rowIndex+1, columnIndex+1]);

    const numberOfRows = this._bombBoard.length;
    const numberOfColums = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = offset[0];
      const neighborColumnIndex = offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows){
        if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColums){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
      }
    });

    return numberOfBombs;
  };

  //returns true if all safe tiles are flipped.
  hasSafeTiles(){
    return !this._numberOfTiles == this._numberOfBombs;
  }

  //print board to screen.
  printBoard(){
    console.log(this._playerBoard.map(row => row.join('|')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    const board = [];

    for (let rowCount = 0; rowCount < numberOfRows; rowCount++){
      const row = [];
      for (let colCount = 0; colCount < numberOfColumns; colCount++){
        row.push(' ');
      }
      board.push(row);
    }

    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
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
  }

}
