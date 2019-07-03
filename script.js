/*
const gameFlow = (() => {
	let player1 = 'active';
	let player2 = 'not active';
	let playerXmoves = [];
	let playerOmoves = [];

	//Two players
	const gameStart = (AI) => {
		playerXmoves = [];
		playerOmoves = [];

		player1 = 'active';
		player2 = 'not active';

		for (let i = 0; i < 9; i++) {
			var cells = document.getElementsByClassName('cell');
			cells[i].style.backgroundColor = 'white';
			cells[i].id = i + 1;
			console.log('AI is ' + AI);
			cells[i].addEventListener('click', () => {
				if (cells[i].style.backgroundColor === 'white' && player1 === 'active') {
					cells[i].style.backgroundColor = 'red';

					player1 = 'not active';
					player2 = 'active';
					playerXmoves.push(Number(cells[i].id));
					checkScore(playerXmoves, 'X');
				} else if (cells[i].style.backgroundColor === 'white' && player2 === 'active' && AI === 'sleeping') {
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
			var cells2 = document.getElementsByClassName('cell2');
			cells2[i].style.backgroundColor = 'white';
			cells2[i].id = i + 1;

			cells2[i].addEventListener('click', () => {
				console.log('comp');
				if (cells2[i].style.backgroundColor === 'white' && player1 === 'active') {
					cells2[i].style.backgroundColor = 'red';

					player1 = 'not active';
					player2 = 'active';
					playerXmoves.push(Number(cells2[i].id));
					checkScore(playerXmoves, 'X');
				}

				if (player2 === 'active') {
					//get all the played numbers
					var allPlayedNumbers = playerXmoves.concat(playerOmoves);
					//computer choice
					let compCellChoice = computerPlay(allPlayedNumbers) - 1;
					setTimeout(function() {
						cells2[compCellChoice].style.backgroundColor = 'blue';
					}, 1000);

					player1 = 'active';
					player2 = 'not active';
					playerOmoves.push(Number(cells2[compCellChoice].id));
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
	gameFlow.gameStart('sleeping');
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

*/
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
	var message = document.getElementById('message');
	var XButton = document.getElementById('XButton');
	var OButton = document.getElementById('OButton');
	var startButton = document.getElementById('Start');
	var startComp = document.getElementById('startComp');
	var restart = document.getElementById('restart');
	var choice = document.getElementById('choice');

	const startCompEvent = () => {
		choice.style.display = 'block';
	};
	startComp.addEventListener('click', startCompEvent);

	const startEvent = () => {
		gameFlow.setAI('dead');
		gameFlow.setTurn('playerXturn');
		OButton.style.color = 'black';
		XButton.style.color = 'black';
		choice.style.display = 'none';
	};
	startButton.addEventListener('click', startEvent);

	const Xevent = () => {
		XButton.style.color = 'red';
		OButton.style.color = 'black';

		gameFlow.setTurn('playerXturn');
	};

	XButton.addEventListener('click', Xevent);

	const Oevent = () => {
		OButton.style.color = 'red';
		XButton.style.color = 'black';

		gameFlow.computerTurn('X');
	};

	OButton.addEventListener('click', Oevent);

	restart.addEventListener('click', () => {
		OButton.style.color = 'black';
		XButton.style.color = 'black';

		gameFlow.reset();
		gameFlow.displayGame();
		message.textContent = '';
		choice.style.display = 'none';
	});

	return {
		startButton,
		startEvent,
		startComp,
		startCompEvent,
		XButton,
		Xevent,
		OButton,
		Oevent,
		message,
		restart,
		choice
	};
})();

const gameFlow = (() => {
	let allMoves = [ '', '', '', '', '', '', '', '', '' ];
	let cells = document.getElementsByClassName('cell');
	let playerXmoves = [];
	let playerOmoves = [];
	let turn = '';
	let AI = 'alive';
	let gameOver = false;
	const setTurn = (a) => {
		turn = a;
	};
	const setAI = (a) => {
		AI = a;
	};
	var makeMove = (n) => {
		if (allMoves[n - 1] === '' && turn === 'playerXturn') {
			allMoves.splice(n - 1, 1, 'X');
			playerXmoves.push(n);
			turn = 'playerOturn';
			displayGame();
			checkScore(playerXmoves, 'X');
			computerTurn('O');
		} else if (allMoves[n - 1] === '' && turn === 'playerOturn') {
			allMoves.splice(n - 1, 1, 'O');
			playerOmoves.push(n);
			turn = 'playerXturn';
			displayGame();
			checkScore(playerOmoves, 'O');
			computerTurn('X');
		}
		return n;
	};

	const computerTurn = (mark) => {
		if (AI === 'alive') {
			var allPlayedNumbers = playerXmoves.concat(playerOmoves);
			//computer choice
			let compCellChoice = computerPlay(allPlayedNumbers) - 1;
			allMoves.splice(compCellChoice, 1, mark);
			if (mark === 'X') {
				playerXmoves.push(compCellChoice + 1);
				checkScore(playerXmoves, 'X');
				if (gameOver === false) {
					setTurn('playerOturn');
				}
			} else if (mark === 'O') {
				playerOmoves.push(compCellChoice + 1);
				checkScore(playerOmoves, 'O');
				setTurn('playerXturn');
			}

			displayGame();
		}
	};

	const computerPlay = (myArray) => {
		var allCells = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
		//exclude all played cells
		allCells = allCells.filter(function(e) {
			return this.indexOf(e) < 0;
		}, myArray);

		return allCells[Math.floor(Math.random() * allCells.length)];
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
			gameBoard.message.textContent = player + ' Wins';
			turn = '';
			AI = 'dead';
			gameOver = true;
			//Tie
		} else if (moves.length === 5) {
			gameBoard.message.textContent = ' Tie';
			turn = '';
			AI = 'dead';
		}
	};

	const reset = () => {
		allMoves = [ '', '', '', '', '', '', '', '', '' ];
		playerXmoves = [];
		playerOmoves = [];
		AI = 'alive';
		turn = '';
		gameOver = false;
	};

	const displayGame = () => {
		for (i = 0; i < cells.length; i++) {
			cells[i].textContent = allMoves[i];
		}
	};

	return {
		setAI,
		allMoves,
		playerXmoves,
		playerOmoves,
		computerTurn,
		computerPlay,
		makeMove,
		setTurn,
		turn,
		checkScore,
		reset,
		displayGame,
		AI,
		gameOver
	};
})();
