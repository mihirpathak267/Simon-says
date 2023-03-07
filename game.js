// alert("game.js loaded");
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var userClickedPattern = [];
var started = false;

var gamePattern = [];

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//event listener for button clicks 
$(".btn").on("click",function () {
    // store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");
    // add the id to the userClickedPattern array
    userClickedPattern.push(userChosenColour);
    // animate the button that got clicked
    animatePress(userChosenColour);
    // play the sound for the button colour selected
    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
    
    console.log(userClickedPattern);
});


// function to generate random sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColour);
    
    
}
  
  function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
  }

  function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  
  function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
            
        }, 1000);
      }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
  }
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }