const gameBoard = (() => {
	var boardArray = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ];

	return {
		boardArray
	};
})();

var playerXmoves = [];
var playerOmoves = [];

var player1 = 'active';
var player2 = 'not active';

for (let i = 0; i < 9; i++) {
	var cells = document.getElementsByClassName('cell');
	cells[i].style.backgroundColor = 'white';
	cells[i].id = i + 1;

	cells[i].addEventListener('click', () => {
		if (cells[i].style.backgroundColor === 'white' && player1 === 'active') {
			cells[i].style.backgroundColor = 'red';

			player1 = 'not active';
			player2 = 'active';
			playerXmoves.push(Number(cells[i].id));
			checkScore(playerXmoves, 'X');

			console.log(playerXmoves);
		} else {
			if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
				cells[i].style.backgroundColor = 'blue';

				player1 = 'active';
				player2 = 'not active';
				playerOmoves.push(Number(cells[i].id));
				checkScore(playerOmoves, 'O');

				console.log(playerOmoves);
			}
		}
	});
}

var checkScore = (moves, player) => {
	//starts checking on the third move
	if (moves.length >= 3) {
		//checking all of the wining patterns
		if (
			(moves.indexOf(1) !== -1 && moves.indexOf(2) !== -1 && moves.indexOf(3) !== -1) ||
			(moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) ||
			(moves.indexOf(7) !== -1 && moves.indexOf(8) !== -1 && moves.indexOf(9) !== -1) ||
			(moves.indexOf(1) !== -1 && moves.indexOf(4) !== -1 && moves.indexOf(7) !== -1) ||
			(moves.indexOf(2) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(8) !== -1) ||
			(moves.indexOf(3) !== -1 && moves.indexOf(6) !== -1 && moves.indexOf(9) !== -1) ||
			(moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) ||
			(moves.indexOf(1) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(9) !== -1) ||
			(moves.indexOf(3) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(7) !== -1)
		) {
			alert(player + ' Wins');
		}
	}
};
