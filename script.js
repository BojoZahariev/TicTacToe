/*
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
			gameBoard.checkScore(playerXmoves, 'X');

			console.log(playerXmoves);
		} else {
			if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
				cells[i].style.backgroundColor = 'blue';

				player1 = 'active';
				player2 = 'not active';
				playerOmoves.push(Number(cells[i].id));
				gameBoard.checkScore(playerOmoves, 'O');

				console.log(playerOmoves);
			}
		}
	});
}
*/

const gameBoard = (() => {
	let player1 = 'active';
	let player2 = 'not active';
	let playerXmoves = [];
	let playerOmoves = [];
	const gameStart = () => {
		playerXmoves = [];
		playerOmoves = [];

		player1 = 'active';
		player2 = 'not active';

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
				} else if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
					cells[i].style.backgroundColor = 'blue';

					player1 = 'active';
					player2 = 'not active';
					playerOmoves.push(Number(cells[i].id));
					checkScore(playerOmoves, 'O');
					console.log(playerOmoves);
				}
			});
		}
	};

	return {
		gameStart
	};
})();

const checkScore = (moves, player) => {
	//starts checking on the third move
	if (moves.length >= 3 && moves.length < 5) {
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
			console.log(player + ' Wins');
			popUp.style.display = 'block';
		}
	} else if (moves.length === 5) {
		console.log('Tie');
		popUp.style.display = 'block';
	}
};

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
	gameBoard.gameStart();
});

var popUp = document.getElementById('popUp');

var popUpButton = document.getElementById('popUpButton');
popUpButton.addEventListener('click', () => {
	gameBoard.gameStart();
	popUp.style.display = 'none';
});

function computerPlay() {
	var myArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	return myArray[Math.floor(Math.random() * myArray.length)];
}

console.log(computerPlay());
