// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Intro screen
function intro() {
	// Variables
	// Button selectors
	var choose_but = document.getElementById("choose")
	var random_but = document.getElementById("random")
	var start_but = document.getElementById("start_but")
	// Input and text selectors
	var choose_text = document.getElementById("choose_selected")
	var random_text = document.getElementById("random_selected")
	var input_box = document.getElementById("ball_input")
	// Selected Choice
	var choice;

	// On click
	choose_but.addEventListener("click", function () {
		choice = "choose"
		choose_text.style.visibility = "visible";
		random_text.style.visibility = "hidden";
		input_box.style.visibility = "visible";
		start_but.style.visibility = "visible";
	})
	random_but.addEventListener("click", function () {
		choice = "random"
		choose_text.style.visibility = "hidden";
		random_text.style.visibility = "visible";
		input_box.style.visibility = "hidden";
		start_but.style.visibility = "visible";
	})

	// The Start Button...
	start_but.addEventListener("click", function () {
		if (choice === "choose") {
			if (input_box.value > 0) {
				game(input_box.value);
				return;
			}
			else {
				alert("Error: Enter a value larger than 0")
			}
		}
		else {
			game(randomIntFromRange(0,1000));
		}
	})
}
intro();


// Game start after clicking 'ENTER'
function game(numberofballs) {


	// Initial Setup
	var title = document.getElementById("title");
	var background = document.querySelector("body");
	var canvas = document.querySelector('canvas');
	var c = canvas.getContext('2d');
	var introScreen = document.getElementById("intro_screen")
	// Make sure they are visible
	introScreen.style.visibility = "hidden";
	title.style.visibility = "visible";
	canvas.style.visibility = "visible";
	background.style.backgroundColor = "transparent";

	canvas.width = innerWidth;
	canvas.height = innerHeight;


	// Variables
	var mouse = {
		x: innerWidth / 2,
		y: innerHeight / 2
	};

	var colors = [
		'#2185C5',
		'#7ECEFD',
		'#FFF6E5',
		'#FF7F66'
	];


	// Event Listeners
	addEventListener("mousemove", function (event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	});

	addEventListener("resize", function () {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	});

	addEventListener("click", function (event) {
		init();
	});


	// Objects
	function Ball(x, y, dx, yspeed, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.yspeed = yspeed;
		this.radius = radius;
		this.color = color;
		// Physics aspects based on radius
		// Larger objects fall faster and have less bounce, small ones opposite
		var gravity = radius / 15;
		var friction = -(0.01 * radius) + 1.034;

		this.update = function () {
			if (this.y + this.radius + this.yspeed > canvas.height) {
				this.yspeed = -this.yspeed;
				this.yspeed = this.yspeed * friction;
				this.dx = this.dx * friction;
			} else {
				this.yspeed += gravity;
			}

			if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
				this.dx = -this.dx * friction;
			}

			this.x += this.dx;
			this.y += this.yspeed;
			this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.stroke();
			c.closePath();
		};
	}


	// Implementation
	var ballArray = [];

	function init() {
		ballArray = [];

		for (let i = 0; i < numberofballs; i++) {
			var radius = randomIntFromRange(5, 30);
			var x = randomIntFromRange(radius, canvas.width - radius);
			var y = randomIntFromRange(0, canvas.height - radius);
			var dx = randomIntFromRange(-3, 3)
			var yspeed = randomIntFromRange(-2, 2)
			ballArray.push(new Ball(x, y, dx, yspeed, radius, randomColor(colors)));
		}
	}

	// Animation Loop
	function animate() {
		requestAnimationFrame(animate);

		c.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < ballArray.length; i++) {
			ballArray[i].update();
		}
	}

	init();
	animate();

}

// Call the game function
//game();