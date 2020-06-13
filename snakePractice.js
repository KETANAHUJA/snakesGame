function init(){
    canvas = document.getElementById('mycanvas');
	W = canvas.width = 1450;
	H = canvas.height = 850;
	pen = canvas.getContext('2d');
	cs=66;	//cell size
	food = getRandomFood();// cs above this then error coming
	game_over = false;
	score = 5;

	
	
	snake = {
		init_len:5,
		color:"red",
		cells:[],
		direction:"right",
	

		createSnake:function () {
			for (var i = this.init_len; i > 0; i--) {
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function () {
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle =this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},
		updateSnake:function () {
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else{
				this.cells.pop();
			}
			
	 	
			var nextX,nextY;
			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY ;

			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x:nextX,y:nextY});

			/*logic for that snakes not go out of bound*/
			var lastX = Math.round(W/cs);
			var lastY = Math.round(H/cs);
			if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY ){
				game_over = true;
			}
		}


	};
	

	//Add a event Listener  on the document object

	function keyPressed(e) {
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowUp"){
			snake.direction="up";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		console.log(snake.direction);
	}
	document.addEventListener('keydown',keyPressed);
	//keydown for keyboard


	snake.createSnake();
}


function draw(){
	//erase the old screen
	pen.clearRect(0,0,W,H);// whole canvas cleared
	snake.drawSnake();
	pen.fillRect(food.x*cs,food.y*cs,cs,cs);
	
}

function update(){
	snake.updateSnake();
}
function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();

}

init();

var f = setInterval(gameloop,100);




