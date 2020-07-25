const buttonColors = [
	'red',
	'blue',
	'green',
	'yellow'
];
let gamePattern = [];
let userClickedPattern = [];

let audioPlayer = document.createElement('audio');
let isGameStarted = false;
let isWrong = false;
let currentCount = 0;
let level = 0;
let buttonClickedNum = 1;

// Generates a random number and
const nextSequence = () => {
	let num = Math.floor(Math.random() * 4);
	return num;
};

// Selects the index buttonColor of the random number and shows the user
// fading in and out and also producing sound
const animater = () => {
	let randomNumber = nextSequence();
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$('#' + randomChosenColor).fadeOut(100).fadeIn(100);
	soundPlayer(randomChosenColor);
	level++;
	$('#level-title').text('Level ' + level);
};

// Listening Clicks On the button presses
$('.btn').click(function() {
	let userChosenColor = $(this).attr('id');
	userClickedPattern.push(userChosenColor);
	soundPlayer(userChosenColor);
	animatePressed(userChosenColor);
	if (userClickedPattern[currentCount] !== gamePattern[currentCount]) {
		gameOver();
		buttonClickedNum = 1;
	} else {
		currentCount++;
	}
	if (buttonClickedNum === gamePattern.length) {
		checkAnswer();
		buttonClickedNum = 1;
	} else if (buttonClickedNum < gamePattern.length) {
		buttonClickedNum++;
	}
});

// Adding Sound Effect to buttons
const soundPlayer = (color) => {
	switch (color) {
		case 'blue':
			audioPlayer.src = 'sounds/blue.mp3';
			audioPlayer.play();
			break;
		case 'green':
			audioPlayer.src = 'sounds/green.mp3';
			audioPlayer.play();
			break;
		case 'red':
			audioPlayer.src = 'sounds/red.mp3';
			audioPlayer.play();
			break;
		case 'yellow':
			audioPlayer.src = 'sounds/yellow.mp3';
			audioPlayer.play();
			break;
		default:
			console.log('Nothing to play');
	}
};

// Animating the button pressed by adding and immediately removing the pressed class
const animatePressed = (currentColor) => {
	$('#' + currentColor).addClass('pressed');

	setTimeout(function() {
		$('#' + currentColor).removeClass('pressed');
	}, 100);
};

const gameOver = () => {
	$('body').addClass('game-over');
	setTimeout(function() {
		$('body').removeClass('game-over');
	}, 100);

	audioPlayer.src = 'sounds/wrong.mp3';
	audioPlayer.play();

	$('#level-title').text('Game Over! Press Any Key to start');
	isGameStarted = false;
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
};

$(window).keypress(function(e) {
	console.log(e.key);
	if (!isGameStarted) {
		isGameStarted = true;
		userClickedPattern = [];
		gamePattern = [];
		animater();
	}
});

const checkAnswer = () => {
	if (arraysMatch(gamePattern, userClickedPattern)) {
		userClickedPattern = [];
		currentCount = 0;
		setTimeout(function() {
			animater();
		}, 300);
	} else {
		gameOver();
	}
};

const arraysMatch = (arr1, arr2) => {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
};
