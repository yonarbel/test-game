// fruits object array and default state
var fruitsObj_arr = [];
var fruits_img_arr =[];
var orange_time;
var orange_score;
var apple_time;
var apple_score;
var banana_time;
var banana_score;
var acai_time;
var acai_score;
var count=60;
var final_score = 0;
$(document).ready(  function() { 


$('#orange_time').val("1");
$('#orange_score').val("10");
$('#acai_time').val("2");
$('#acai_score').val("5");
$('#banana_time').val("3");
$('#banana_score').val("4");
$('#apple_time').val("4");
$('#apple_score').val("2");

orange_time = parseInt($('#orange_time').val());
orange_score = parseInt($('#orange_score').val());
apple_time = parseInt($('#apple_time').val());
apple_score = parseInt($('#apple_score').val());
banana_time= parseInt($('#banana_time').val());
banana_score = parseInt($('#banana_score').val());
acai_time = parseInt($('#acai_time').val());
acai_score = parseInt($('#acai_score').val());
    $('#change_submit').click( function() {

orange_time = parseInt($('#orange_time').val());
orange_score = parseInt($('#orange_score').val());
apple_time = parseInt($('#apple_time').val());
apple_score = parseInt($('#apple_score').val());
banana_time= parseInt($('#banana_time').val());
banana_score = parseInt($('#banana_score').val());
acai_time = parseInt($('#acai_time').val());
acai_score = parseInt($('#acai_score').val());
        alert('השינויים הוחלו');
        count=60;
        fruitsCaught=0;
        
        

});
    
    
});
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// fruit image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "images/stand.png";

// fruit image
var fruitReady = false;
var fruitImage = new Image();
fruitImage.onload = function () {
	fruitReady = true;
};
var obj = addRandomFruit();
fruitImage.src = obj.imgsrc;


var playerName = "benny"; // אם אני א רצה בעתיד להשתמש בשם השחקן
// Game objects
var player = {
	speed: 200, // מהירות האובייקט
    name: playerName
};

var fruit = {


};
var fruitsCaught = 0;




// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a fruit
var reset = function () {
	
	// Throw the fruit somewhere on the screen randomly
 obj = addRandomFruit();
   fruitImage.src = obj.imgsrc;
	fruit.x = 32 + (Math.random() * (canvas.width - 64));
	fruit.y = 32 + (Math.random() * (canvas.height - 64));
    
    
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
        
        if(player.y > 1){
        player.y -= player.speed * modifier;
            playerImage.src = "images/up.png";
        }
		
	}
	if (40 in keysDown) { // Player holding down
        if(player.y  < 440 ){
        player.y += player.speed * modifier;
            playerImage.src = "images/down.png";
        }
		
	}
	if (37 in keysDown) { // Player holding left
        if(player.x>0.5){
        
        player.x -= player.speed * modifier;
            playerImage.src = "images/left.png";
        }
		
	}
	if (39 in keysDown) { // Player holding right
        if(player.x<489){player.x += player.speed * modifier;
                      playerImage.src = "images/right.png";
                      
                      }
        
		
	}


	// Are they touching?
    
    for(i=0;i<fruitsObj_arr.length;i++){
    
     if (
		player.x <= (fruitsObj_arr[i].x + 32)
		&& fruitsObj_arr[i].x <= (player.x + 32)
		&& player.y <= (fruitsObj_arr[i].y + 32)
		&& fruitsObj_arr[i].y <= (player.y + 32)
	) {
		fruitsCaught += parseInt(fruitsObj_arr[i].score);
         fruitsObj_arr.splice(i,1);
		reset();
	}
    
    }//for loop
   
    
    
	if (
		player.x <= (fruit.x + 32)
		&& fruit.x <= (player.x + 32)
		&& player.y <= (fruit.y + 32)
		&& fruit.y <= (player.y + 32)
	) {
		++fruitsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}

	if (fruitReady) {
        
        for(i=0;i<fruitsObj_arr.length;i++){
        
        fruits_img_arr[i] = new Image();
        fruits_img_arr[i].src =  fruitsObj_arr[i].imgsrc;
          ctx.drawImage(fruits_img_arr[i], fruitsObj_arr[i].x, fruitsObj_arr[i].y);
        
        }
        
        
     
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText(" ניקוד : " + parseInt(fruitsCaught), 200, 50);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
   
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
//place the player at the middle of my map 
player.x = canvas.width / 2;
player.y = canvas.height / 2;

// objects constructors - here is the factory of my apples ( tomato is too expensive in israel so i exculude it from my proj :)
function apple(timeToStay,score){
    this.kind = "apple";
    this.timeTostay = apple_time;
    this.score=apple_score;
    this.imgsrc =  "images/apple.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
	this.y = 32 + (Math.random() * (canvas.height - 64));
    this.removeMe = false;
   

setTimeout(function() { this.removeMe=true;}.bind(this),apple_time*1000);
    
    return this;
}

function banana(timeToStay,score){
    this.kind = "banana";
    this.timeTostay = banana_time;
    this.score=banana_score;
    this.imgsrc =  "images/banana.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
	this.y = 32 + (Math.random() * (canvas.height - 64));
    this.removeMe = false;
   

setTimeout(function() { this.removeMe=true;}.bind(this),banana_time*1000);
    return this;
}
function acai(timeToStay,score){
    this.kind = "acai";
    this.timeTostay = acai_time;
    this.score=acai_score;
    this.imgsrc =  "images/acai.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
	this.y = 32 + (Math.random() * (canvas.height - 64));
    this.removeMe = false;
   

setTimeout(function() { this.removeMe=true;}.bind(this),acai_time*1000);
    return this;
}
function orange(timeToStay,score){
    this.kind = "orange";
    this.timeTostay = orange_time;
    this.score=orange_score;
    this.imgsrc =  "images/orange.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
	this.y = 32 + (Math.random() * (canvas.height - 64));
    this.removeMe = false;
setTimeout(function() { this.removeMe=true;}.bind(this),orange_time*1000);
    
    return this;
}

function addRandomFruit(){
    var obj;
    var myRandNum = Math.floor(Math.random() * 4 + 1);
    switch(myRandNum) {
            
    case 1:
        obj = new banana(8,2);
        break;
    case 2:
        obj = new apple(4,1);
        break;
    case 3:
            obj = new acai(5,4);
            break;
    case 4:
            obj = new orange(3,5);
            break;
}//switch
            return obj;
} // create random fruit


// every 2 seconds, a new object will be created
window.setInterval(function(){
    var randObj = addRandomFruit()
  fruitsObj_arr.push(randObj);
    console.log('an object was created : ' + randObj.kind)
}, 2000);

window.setInterval(function(){
   
  
    for(i=0;i<fruitsObj_arr.length;i++){
if(fruitsObj_arr[i].removeMe){
fruitsObj_arr.splice(i,1);
    console.log('i removed ' + fruitsObj_arr[i].kind);
}
                }
}, 1000);

// function timer 

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
function timer()
{
    
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
      $('canvas').css('display','none');
      final_score=fruitsCaught; // here i save the points at the end of the 60 seconds
      
      document.getElementById("timer").innerHTML="  0 : זמן שנותר  "; // watch for spelling
      alert(' : המשחק נגמר! סה"כ נקודות ' + final_score);
      final_score = 0;
      fruitsCaught=0;
     return;
  }

 document.getElementById("timer").innerHTML=count + " : זמן שנותר  "; // watch for spelling
}