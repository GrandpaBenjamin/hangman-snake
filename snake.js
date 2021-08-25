class Snake {
	constructor(head, word, bodies) {
		this.head = head;
		this.word = word;
		this.bodies = bodies;
		this.body = [];
		this.bodyLetters = [];
		this.body[0] = createVector(floor(w / 2), floor(h / 2), -1);
		this.xdir = 0;
		this.ydir = 0;
		this.len = 0;
	}

	setDir(x, y) {
		this.xdir = x;
		this.ydir = y;
	}

	update() {
		let head = this.body[this.body.length - 1].copy();
		this.body.shift();
		head.x += this.xdir;
		head.y += this.ydir;
		this.body.push(head);
	}

	grow() {
		let head = this.body[this.body.length - 1].copy();
		this.len++;
		this.body.push(head);
	}

	goodbye() {
		fill(255, 0, 0);
	}

	endGame() {
		let x = this.body[this.body.length - 1].x;
		let y = this.body[this.body.length - 1].y;
		if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
			if (y > h - 1) this.setDir(0, -1);
			else if (y < 0) this.setDir(0, 1);
			else if (x > w - 1) this.setDir(-1, 0);
			else if (x < 0) this.setDir(1, 0);
			return 1;
		}

		for (let i = 0; i < this.body.length - 1; i++) {
			let part = this.body[i];
			if (part.x == x && part.y == y) {
				return 3;
			}
		}
		return 0;
	}

	eat(pos) {
		let x = this.body[this.body.length - 1].x;
		let y = this.body[this.body.length - 1].y;
		if (x == pos.x && y == pos.y) {
			//this.grow();
			return true;
		}
		return false;
	}

	show() {
		for (let i = 0; i < this.body.length; i++) {
			if (i == this.body.length - 1) {
				image(this.head, this.body[i].x, this.body[i].y, 1, 1);
			} else {
				image(this.bodies[0], this.body[i].x, this.body[i].y, 1, 1);
				//fill(0);
				//noStroke();
				//rect(this.body[i].x, this.body[i].y, 1, 1);
			}
		}
	}
}
