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

//Do it like RockPaper.. so the computer play can be implemented or with If (if computer = active... ), use .click() for computer play
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

	//Computer play
	const gameStartComp = () => {
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
					console.log('player1 ' + playerXmoves);
				}

				if (player2 === 'active') {
					var allPlayedNumbers = playerXmoves.concat(playerOmoves);
					console.log('allPlayedNumbers ' + allPlayedNumbers);

					let compCellChoice = computerPlay(allPlayedNumbers) - 1;
					console.log('compCellChoice' + compCellChoice);

					if ((cells[compCellChoice].style.backgroundColor = 'white')) {
						cells[compCellChoice].style.backgroundColor = 'blue';

						player1 = 'active';
						player2 = 'not active';
						playerOmoves.push(Number(cells[compCellChoice].id));
						checkScore(playerOmoves, 'O');
						console.log('player2 ' + playerOmoves);
					}
				}
			});
		}
	};

	return {
		gameStart,
		gameStartComp
	};
})();

const checkScore = (moves, player) => {
	if (
		//checking all of the wining patterns
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
		popUpText.textContent = player + ' Wins';
		//Tie
	} else if (moves.length === 5) {
		console.log('Tie');
		popUp.style.display = 'block';
		popUpText.textContent = 'Tie';
	}
};

//Two players
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
	gameBoard.gameStar();
});


//Play with computer
var startButtonComp = document.getElementById('startButtonComp');
startButtonComp.addEventListener('click', () => {
	gameBoard.gameStartComp();
});

var popUp = document.getElementById('popUp');
var popUpText = document.getElementById('popUpText');

var popUpButton = document.getElementById('popUpButton');
popUpButton.addEventListener('click', () => {
	gameBoard.gameStart();
	popUp.style.display = 'none';
});

var form = document.getElementById('myForm');

//Computer play
function computerPlay(myArray) {
	var allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	allCells = allCells.filter(function (e) {
		return this.indexOf(e) < 0;
	}, myArray);
	console.log('allCells' + allCells);


	return allCells[Math.floor(Math.random() * allCells.length)];
}
