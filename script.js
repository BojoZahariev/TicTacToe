const gameBoard = (() => {
	var boardArray = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ];

	return {
		boardArray
	};
})();
console.log(gameBoard.boardArray);

var playerXmoves = [];
var playerOmoves = [];
var cellValue1 = 0;
var cellValue2 = 0;

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
			//cellValue1 = playerXmoves.reduce((a, b) => a + b, 0);
			checkScore(playerXmoves, 'X');

			console.log(playerXmoves);
			console.log(cells[i].id);
			console.log('score1 is ' + cellValue1);
			console.log('length1 is ' + playerXmoves.length);
		} else {
			if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
				cells[i].style.backgroundColor = 'blue';

				player1 = 'active';
				player2 = 'not active';
				playerOmoves.push(Number(cells[i].id));
				//cellValue2 = playerOmoves.reduce((a, b) => a + b, 0);
				checkScore(playerOmoves, 'O');

				console.log(cells[i].id);
				console.log(playerOmoves);
				console.log('score2 is ' + cellValue2);
				console.log('length2 is ' + playerOmoves.length);
			}
		}
	});
}

var checkScore = (moves, player) => {
	//starts checking on the third move
	if (moves.length >= 3) {
		if (moves.indexOf(1) !== -1 && moves.indexOf(2) !== -1 && moves.indexOf(3) !== -1) {
			alert(player + 'Wins123');
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			alert(player + 'Wins456');
		} else if (moves.indexOf(7) !== -1 && moves.indexOf(8) !== -1 && moves.indexOf(9) !== -1) {
			alert(player + 'Wins789');
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(4) !== -1 && moves.indexOf(7) !== -1) {
			alert(player + 'Wins147');
		} else if (moves.indexOf(2) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(8) !== -1) {
			alert(player + 'Wins258');
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(6) !== -1 && moves.indexOf(9) !== -1) {
			alert(player + 'Wins369');
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			alert(player + 'Wins456');
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(9) !== -1) {
			alert(player + 'Wins159');
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(7) !== -1) {
			alert(player + 'Wins357');
		}
	}
};
