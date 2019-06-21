const gameBoard = (() => {
	var boardArray = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ];

	return {
		boardArray
	};
})();
console.log(gameBoard.boardArray);

var myArray = [];

var player1 = 'active';
var player2 = 'not active';
var cellValue = 0;
for (let i = 0; i < 9; i++) {
	var cells = document.getElementsByClassName('cell');
	cells[i].style.backgroundColor = 'white';
	cells[i].id += i + 1;

	cells[i].addEventListener('click', () => {
		if (cells[i].style.backgroundColor === 'white' && player1 === 'active') {
			cells[i].style.backgroundColor = 'red';

			player1 = 'not active';
			player2 = 'active';
			console.log(cells[i].id);
		} else {
			if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
				cells[i].style.backgroundColor = 'blue';

				player1 = 'active';
				player2 = 'not active';
				console.log(cells[i].id);
			}
		}
	});
}
