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
let hiddenWordArray = [1];
let hiddenWordLength = 1;

let realHiddenWordArray = [];
let realHiddenWord;

let answer = "";
let hiddenWord = "";

let locationToletter = {};

let foodArray = [];

let currentLetter = 0;

let score = -1;
let winScore = 2;
let lives = 1;
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

function updateScore() {
	sCORE = document.getElementById("score");
	sCORE.innerHTML = `score: ${score}	highscore: ${getCookie("highscore")}`;
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

function setCookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function loadCookies() {
	if (document.cookie == "") {
		document.cookie = "highscore=0";
		console.log(getCookie("highscore"));
	} else {
		console.log(getCookie("highscore"));
	}
}
function preload() {
	head = loadImage("assets/snake_head.png");
	bkg = loadImage("assets/bkg.png");
	apple = loadImage("assets/base_apple.png");
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
		background(255, 0, 0, 0);
		background(255, 0, 0, 0);
		textSize(5);
		//text("D:", 1, 10);
		fill(0, 102, 153);
		lives = "dead";
		if (score > getCookie("highscore")) {
			setCookie("highscore", score);
			updateScore();
		}
		rESTART = document.getElementById("restart");
		rESTART.innerHTML = "Press SPACE to restart";
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
	if (override == 500) {
		res = 30;
	} else {
		res = (windowSizeX + windowSizeY) / 75;
	}

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

function setup() {
	loadCookies();
	score++;
	updateScore();
	createCanvas(getWindowSize("x", 500), getWindowSize("y", 500));
	w = floor(width / res);
	h = floor(height / res);
	frameRate(5);
	snake = new Snake(head, word, [body_img, body_img_alt]);
	snake.setDir(1, 0);
	foodLocation();
	snake.grow();
	outputVolume(0.5);
}

function foodLocation() {
	foodArray = [];
	for (let i = 0; i < hiddenWordArray.length; i++) {
		while (true) {
			let x = floor(random(w));
			let y = floor(random(h));
			console.log(snake.body);
			if ([x, y] in takenPositions || createVector(x, y) in snake.body) {
				//console.log("nah");
			} else {
				food = createVector(x, y, (x + 23) * (y + 32));
				takenPositions.push([x, y]);
				foodArray.push(food);
				//console.log([x, y]);
				break;
			}
		}
	}
}

function keyPressed() {
	//console.log(keyCode);
	if (key === " ") {
		location.reload();
	} else if (key === "a" && snake.xdir == 0) {
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
	if (lives != "dead") {
		background("rgba(0,255,0, 0.25)");
		stroke(255);
		fill(255, 255, 255, 100);
		rect(70, 70, 60, 60, 10);
	}

	if (snake.eat(foodArray[0])) {
		munchSound.play();
		snake.grow();
		score++;
		foodLocation();
	}

	noStroke();
	snake.update();
	image(apple, foodArray[0].x, foodArray[0].y, 1, 1);
	snake.show();

	updateScore();

	if (snake.endGame() == 1 && lives <= 0) {
		gameOver("lose");
		updateScore();
	} else if (snake.endGame() == 1 && lives > 0) {
		removeLife(1);
		updateScore();
	} else if (snake.endGame() == 3) {
		gameOver("lose");
		gameOver("lose");
		updateScore();
	}

	if (lives <= 0) {
		gameOver("lose");
	}
	//rect(food.x, food.y, 1, 1);
}
