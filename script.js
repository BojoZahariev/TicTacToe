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
	var popUp = document.getElementById('popUp');

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
		gameBoard.popUp.style.display = 'none';
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
		choice,
		popUp
	};
})();

const gameFlow = (() => {
	let allMoves = ['', '', '', '', '', '', '', '', ''];
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
				if (gameOver === false) {
					setTurn('playerXturn');
				}
			}

			displayGame();
		}
	};

	const computerPlay = (myArray) => {
		var allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		//exclude all played cells
		allCells = allCells.filter(function (e) {
			return this.indexOf(e) < 0;
		}, myArray);

		return allCells[Math.floor(Math.random() * allCells.length)];
	};

	const checkScore = (moves, player) => {
		/*
		if (moves.indexOf(1) !== -1 && moves.indexOf(2) !== -1 && moves.indexOf(3) !== -1) {
			cells[0].style.color = 'red';
			cells[1].style.color = 'red';
			cells[2].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			cells[3].style.color = 'red';
			cells[4].style.color = 'red';
			cells[5].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(7) !== -1 && moves.indexOf(8) !== -1 && moves.indexOf(9) !== -1) {
			cells[6].style.color = 'red';
			cells[7].style.color = 'red';
			cells[8].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(4) !== -1 && moves.indexOf(7) !== -1) {
			cells[0].style.color = 'red';
			cells[3].style.color = 'red';
			cells[6].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(2) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(8) !== -1) {
			cells[1].style.color = 'red';
			cells[4].style.color = 'red';
			cells[7].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(6) !== -1 && moves.indexOf(9) !== -1) {
			cells[2].style.color = 'red';
			cells[5].style.color = 'red';
			cells[8].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			cells[3].style.color = 'red';
			cells[4].style.color = 'red';
			cells[5].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(9) !== -1) {
			cells[0].style.color = 'red';
			cells[4].style.color = 'red';
			cells[8].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(7) !== -1) {
			cells[2].style.color = 'red';
			cells[4].style.color = 'red';
			cells[6].style.color = 'red';
			gameBoard.message.textContent = player + ' Wins';
			gameFinished();

			//Tie
		} else if (moves.length === 5) {
			gameBoard.message.textContent = ' Tie';
			gameFinished();
		}
*/

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
		)

		{
			gameBoard.message.textContent = player + ' winner';
			gameFinished();

			cells[0].style.color = 'red';
			//Tie
		} else if (moves.length === 5) {
			gameBoard.message.textContent = ' Tie';
			gameFinished();
		}

	};

	const gameFinished = () => {
		turn = '';
		AI = 'dead';
		gameOver = true;


		gameBoard.popUp.style.display = 'block';

	};

	const reset = () => {
		allMoves = ['', '', '', '', '', '', '', '', ''];
		playerXmoves = [];
		playerOmoves = [];
		AI = 'alive';
		turn = '';
		gameOver = false;
		for (i = 0; i < cells.length; i++) {
			cells[i].style.color = 'black';
			cells[i].style.backgroundImage = "none";
		}
	};

	const displayGame = () => {
		for (i = 0; i < cells.length; i++) {

			if (allMoves[i] === 'O') {
				cells[i].style.backgroundImage = "url(images/O.png)";
				cells[i].style.backgroundSize = 'cover';
				cells[i].style.backgroundPosition = 'center';
			}
			if (allMoves[i] === 'X') {
				cells[i].style.backgroundImage = "url(images/X.png)";
				cells[i].style.backgroundSize = 'cover';
				cells[i].style.backgroundPosition = 'center';

			}
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
		gameOver,
		gameFinished
	};
})();
