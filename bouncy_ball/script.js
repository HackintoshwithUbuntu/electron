
// Game start after clicking 'ENTER'
function game() {
	

// Initial Setup
var title = document.getElementById("title");
var background = document.querySelector("body");
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
	// Make sure they are visible
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


// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


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
	var friction = -(0.01*radius) + 1.034;

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

	for (let i = 0; i < 100; i++) {
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

// TODO button start will go here

// Call the game function
//game();