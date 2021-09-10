let res = 20;

let snake;
let food;
let food2;
let food3;
let food4;
let w;
let h;

let head;
let bkg;
let body_img;
let background_;
let background_alt;

let randomNum;
let nextQuestion = 0;

//let word = "joe"; //change this word to change the word
let word;
let question;
let hiddenWordArray = [];
let hiddenWordLength;

let realHiddenWordArray = [];
let realHiddenWord;

let answer = "";
let hiddenWord = "";

let locationToletter = {};

let foodArray = [];

let currentLetter = 0;

let score = -1;
let winScore = 2;
let lives = 3;
let numImages = [];
let letters = {};

let munchSound;

var letterToNum = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
	k: 11,
	l: 12,
	m: 13,
	n: 14,
	o: 15,
	p: 16,
	q: 17,
	r: 18,
	s: 19,
	t: 20,
	u: 21,
	v: 22,
	w: 23,
	x: 24,
	y: 25,
	z: 26,
};

let currentWindowSize = [parent.window.innerWidth, parent.window.innerHeight];

setQuestion();

function setQuestion() {
	if (score >= winScore) {
		gameOver("win");
		return;
	}
	while (true) {
		let works = false;
		for (
			let x = 0;
			x < questions.data.questions[nextQuestion].answers.length;
			x++
		) {
			if (questions.data.questions[nextQuestion].answers[x].isCorrect) {
				if (
					questions.data.questions[nextQuestion].answers[x].hiddenWord != null
				) {
					works = true;
				}
				break;
			}
		}
		if (works) {
			randomNum = Math.floor(Math.random() * questions.data.questions.length);
			//console.log(randomNum);
			//console.log(questions.data.questions.length);

			qUESTION = document.getElementById("question");
			qUESTION.innerHTML = questions.data.questions[nextQuestion].title;

			question = questions.data.questions[nextQuestion];

			nextQuestion++; // = randomNum;

			for (let x = 0; x < question.answers.length; x++) {
				if (question.answers[x].isCorrect) {
					hiddenWord = question.answers[x].hiddenWord;
					realHiddenWord = question.answers[x].hiddenWord;
					answer = question.answers[x].text;
					break;
				}
			}

			hangman = document.getElementById("hangman");

			//makes hidden word into a list
			for (let x = 0; x < hiddenWord.length; x++) {
				hiddenWordArray.push(hiddenWord[x]);
			}

			//dumb array things. i have to remake the array and cant just do "realHiddenWordArray = hiddenWordArray"

			for (let x = 0; x < hiddenWord.length; x++) {
				realHiddenWordArray.push(hiddenWord[x]);
			}

			//console.log(hiddenWordArray);

			//turns each unwanted letter into a '_ '
			let censored = "";
			for (let x = 0; x < hiddenWordArray.length; x++) {
				censored += "_ ";
			}

			hangman.innerHTML = answer.replace(hiddenWord, censored);
			hiddenWordLength = hiddenWord.length;

			break;
		} else {
			nextQuestion++;
		}
	}

	score++;

	sCORE = document.getElementById("score");
	sCORE.innerHTML = `score: ${score}`;
}

function updateLifeCount() {
	lIVES = document.getElementById("lives");
	lIVES.innerHTML = `lives left: ${lives}`;
}

alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
];

let takenPositions = [];

let repeatedLetters = {};

function preload() {
	head = loadImage("assets/snake_head.png");
	bkg = loadImage("assets/bkg.png");
	apple = loadImage("assets/apple.png");
	body_img = loadImage("assets/snake_body.png");
	body_img_alt = loadImage("assets/snake_body_alt.png");

	background_ = loadImage("assets/background.png");
	background_alt = loadImage("assets/background_alt.png");

	munchSound = loadSound("assets/audio/munch.wav");
	ouchSound = loadSound("assets/audio/ouch.wav");

	for (let x = 0; x < 4; x++) {
		numImages.push(loadImage(`assets/letters/${x + 1}.png`));
	}
	for (let x = 0; x < 26; x++) {
		letters[alphabet[x]] = loadImage(`assets/letters/${alphabet[x]}.png`);
	}
	//console.log(numImages);
}

function gameOver(type) {
	if (type == "lose") {
		console.log("D:");
		background(255, 0, 0);
		///*
		textSize(5);
		text("D:", 1, 10);
		fill(0, 102, 153);
		//*/
		lives = "dead";
		noLoop();
	} else if (type == "win") {
		console.log(":D");
		background(0, 255, 0);
		///*
		textSize(5);
		text(":D", 1, 10);
		fill(0, 102, 153);
		//*/
		snake.goodbye();

		noLoop();
	}
	noLoop();
}

function getWindowSize(val, override = 0) {
	xOffset = 0;
	yOffset = 72.5;
	padding = 80;

	// fill screen
	windowSizeX = parent.window.innerWidth - xOffset - (padding - 60);
	windowSizeY = parent.window.innerHeight - yOffset - padding + 10;
	res = (windowSizeX + windowSizeY) / 75;

	if (override != 0) {
		windowSizeX = override;
		windowSizeY = override;
	}

	if (val == "x") {
		return windowSizeX;
	} else if (val == "y") {
		return windowSizeY;
	}
}

const startingDirections = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];

function setup() {
	createCanvas(getWindowSize("x", 0), getWindowSize("y", 0));
	w = floor(width / res);
	h = floor(height / res);
	frameRate(7);
	snake = new Snake(head, word, [body_img, body_img_alt]);
	let randomDirection = Math.floor(Math.random() * startingDirections.length);
	console.log(randomDirection);
	snake.setDir(
		startingDirections[randomDirection][0],
		startingDirections[randomDirection][1]
	);
	foodLocation();
	snake.grow();
}

function foodLocation() {
	for (let i = 0; i < hiddenWordArray.length; i++) {
		while (true) {
			let x = floor(random(w));
			let y = floor(random(h));
			if ([x, y] in takenPositions) {
				//console.log("nah");
			} else {
				food = createVector(x, y, (x + 23) * (y + 32));
				takenPositions.push([x, y]);
				foodArray.push(food);
				realHiddenWordArray[i] = [realHiddenWordArray[i], (x + 23) * (y + 32)];
				locationToletter[(x + 23) * (y + 32)] = hiddenWordArray[i];
				//console.log([x, y]);
				break;
			}
		}
	}
}

function keyPressed() {
	//console.log(keyCode);
	if (key === "a" && snake.xdir == 0) {
		snake.setDir(-1, 0);
	} else if (key === "d" && snake.xdir == 0) {
		snake.setDir(1, 0);
	} else if (key === "s" && snake.ydir == 0) {
		snake.setDir(0, 1);
	} else if (key === "w" && snake.ydir == 0) {
		snake.setDir(0, -1);
	} else if (key === "A" && snake.xdir == 0) {
		snake.setDir(-1, 0);
	} else if (key === "D" && snake.xdir == 0) {
		snake.setDir(1, 0);
	} else if (key === "S" && snake.ydir == 0) {
		snake.setDir(0, 1);
	} else if (key === "W" && snake.ydir == 0) {
		snake.setDir(0, -1);
	}

	if (keyCode === LEFT_ARROW && snake.xdir == 0) {
		snake.setDir(-1, 0);
	} else if (keyCode === RIGHT_ARROW && snake.xdir == 0) {
		snake.setDir(1, 0);
	} else if (keyCode === DOWN_ARROW && snake.ydir == 0) {
		snake.setDir(0, 1);
	} else if (keyCode === UP_ARROW && snake.ydir == 0) {
		snake.setDir(0, -1);
	}
}

function windowResized() {
	console.log("resized");
	resizeCanvas(getWindowSize("x", 0), getWindowSize("y", 0));
	scale(res);
	foodLocation();
}

function removeLife(amount) {
	lives -= amount;
	ouchSound.play();
	background(255, 0, 0);
}

function draw() {
	/* // failed implementation of resizing the canvas. didnt work as planned
	if (parent.window.innerWidth != currentWindowSize[0]) {
		windowResized();
	} else if (parent.window.innerHeight != currentWindowSize[1]) {
		windowResized();
	}

	currentWindowSize = [parent.window.innerWidth, parent.window.innerHeight];
	*/
	scale(res);
	background(255, 255, 255);
	for (let x = 0; x < 500 / 5; x += res / 5) {
		for (let y = 0; y < 500 / 5; y += res / 5) {
			image(background_, x, y, res / 5, res / 5);
		}
	}

	for (let x = 0; x < foodArray.length; x++) {
		if (
			snake.eat(foodArray[x]) &&
			hiddenWordArray[currentLetter] ==
				locationToletter[(foodArray[x].x + 23) * (foodArray[x].y + 32)]
		) {
			//foodLocation();
			//setQuestion();

			for (let i = 0; i < foodArray.length; i++) {
				if (foodArray[i].z == (foodArray[x].x + 23) * (foodArray[x].y + 32)) {
					takenPositions.splice(
						takenPositions.indexOf([foodArray[i].x, foodArray[i].y]),
						1
					);

					for (let b = 0; b < realHiddenWordArray.length; b++) {
						if (
							realHiddenWordArray[b][1] ==
							(foodArray[x].x + 23) * (foodArray[x].y + 32)
						) {
							realHiddenWordArray.splice(b, 1);
							break;
						}
					}

					foodArray.splice(i, 1);
					munchSound.play();
					snake.grow();
					hiddenWordArray.shift(); //this one line has caused me so much pain.
					hiddenWord = hiddenWord.substring(1);
					break;
				}
			}

			//foodArray.shift();

			//turns each unwanted letter into a '_ '
			let censored = " ";
			for (let x = 0; x < hiddenWord.length; x++) {
				censored += "_ ";
			}
			let tempWord = realHiddenWord.replace(hiddenWord, censored);

			hangman.innerHTML = answer.replace(realHiddenWord, tempWord);
		} else if (
			snake.eat(foodArray[x]) &&
			hiddenWordArray[currentLetter] !=
				locationToletter[(foodArray[x].x + 23) * (foodArray[x].y + 32)]
		) {
			removeLife(1);
			//gameOver("lose");
		}
	}

	noStroke();
	snake.update();
	for (let x = 0; x < foodArray.length; x++) {
		//image(apple, foodArray[x].x, foodArray[x].y, 1, 1);
		image(
			letters[realHiddenWordArray[x][0].toLowerCase()],
			foodArray[x].x,
			foodArray[x].y,
			1,
			1
		);
	}
	snake.show();
	//console.log("drawn images");

	/*
	try {
		
	} catch (e) {
		//console.log(e);
		gameOver("win");
		background(255, 255, 255);
	}
	*/

	/*
	if (score >= 5) {
		gameOver("win");
	}
	*/
	if (currentLetter == hiddenWordArray.length) {
		setQuestion();
		foodLocation();
	}

	updateLifeCount();
	if (snake.endGame() == 1 && lives <= 0) {
		gameOver("lose");
		updateLifeCount();
	} else if (snake.endGame() == 1 && lives > 0) {
		removeLife(1);
		updateLifeCount();
	} else if (snake.endGame() == 3) {
		gameOver("lose");
		updateLifeCount();
	}

	if (lives <= 0) {
		gameOver("lose");
	}
	//rect(food.x, food.y, 1, 1);
}
