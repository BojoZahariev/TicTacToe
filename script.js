const gameFlow = (() => {
	let player1 = 'active';
	let player2 = 'not active';
	let playerXmoves = [];
	let playerOmoves = [];

	//Two players
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
				console.log('two players');
				if (cells[i].style.backgroundColor === 'white' && player1 === 'active') {
					cells[i].style.backgroundColor = 'red';

					player1 = 'not active';
					player2 = 'active';
					playerXmoves.push(Number(cells[i].id));
					checkScore(playerXmoves, 'X');
				} else if (cells[i].style.backgroundColor === 'white' && player2 === 'active') {
					cells[i].style.backgroundColor = 'blue';

					player1 = 'active';
					player2 = 'not active';
					playerOmoves.push(Number(cells[i].id));
					checkScore(playerOmoves, 'O');
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
				console.log('comp');
				if (cells[i].style.backgroundColor === 'white' && player1 === 'active') {
					cells[i].style.backgroundColor = 'red';

					player1 = 'not active';
					player2 = 'active';
					playerXmoves.push(Number(cells[i].id));
					checkScore(playerXmoves, 'X');
				}

				if (player2 === 'active') {
					//get all the played numbers
					var allPlayedNumbers = playerXmoves.concat(playerOmoves);
					//computer choice
					let compCellChoice = computerPlay(allPlayedNumbers) - 1;
					setTimeout(function() {
						cells[compCellChoice].style.backgroundColor = 'blue';
					}, 1000);

					player1 = 'active';
					player2 = 'not active';
					playerOmoves.push(Number(cells[compCellChoice].id));
					checkScore(playerOmoves, 'O');
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
		popUp.style.display = 'block';
		popUpText.textContent = player + ' Wins';
		//Tie
	} else if (moves.length === 5) {
		popUp.style.display = 'block';
		popUpText.textContent = 'Tie';
	}
};

//Two players
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
	gameFlow.gameStart();
});

//Play with computer
var startButtonComp = document.getElementById('startButtonComp');
startButtonComp.addEventListener('click', () => {
	gameFlow.gameStartComp();
});

//Pop up
var popUp = document.getElementById('popUp');
var popUpText = document.getElementById('popUpText');

var popUpButton = document.getElementById('popUpButton');
popUpButton.addEventListener('click', () => {
	gameFlow.gameStart();
	popUp.style.display = 'none';
});

var form = document.getElementById('myForm');

//Computer play
function computerPlay(myArray) {
	var allCells = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

	//exclude all played cells from the pool
	allCells = allCells.filter(function(e) {
		return this.indexOf(e) < 0;
	}, myArray);

	return allCells[Math.floor(Math.random() * allCells.length)];
}

/*
const Player = (mark) => {
	const getMark = () => mark;
	const move = () => {};
	return {
		getMark,
		move
	};
};

const playerX = Player('X');
const playerO = Player('O');

const gameBoard = (() => {
	const cells = document.getElementsByClassName('cell');
	const displayGame = () => {
		for (i = 0; i < cells.length; i++) {
			cells[i].textContent = gameFlow.allMoves[i];
		}
	};

	return {
		cells,
		displayGame
	};
})();

const gameFlow = (() => {
	let allMoves = [ '', '', '', '', '', '', '', '', '' ];
	let playerXmoves = [];
	let playerOmoves = [];
	let turn = 'playerXturn';
	var cellId = (n) => {
		if (allMoves[n - 1] === '' && turn === 'playerXturn') {
			allMoves.splice(n - 1, 1, 'X');
			playerXmoves.push(n);
			turn = 'playerOturn';
			gameBoard.displayGame();
			checkScore(playerXmoves, 'X');
		} else if (allMoves[n - 1] === '' && turn === 'playerOturn') {
			allMoves.splice(n - 1, 1, 'O');
			playerOmoves.push(n);
			turn = 'playerXturn';
			gameBoard.displayGame();
			checkScore(playerOmoves, 'O');
		}
		return n;
	};

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
			alert(player + ' Wins');

			//Tie
		} else if (moves.length === 5) {
			alert(' Tie');
		}
	};

	return {
		allMoves,
		playerXmoves,
		playerOmoves,
		cellId,
		turn,
		checkScore
	};
})();

var startButtonComp = document.getElementById('startButtonComp');
startButtonComp.addEventListener('click', () => {
	cells[0].removeEventListener('click', gameFlow.cellId);
});

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {});

*/

