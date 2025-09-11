var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];     //yeh ek array hai jisme colour store hain
var userClickedPattern = [];

//hum track karenge ki koi key dabayi ya nahi then call karenge nextseq ko apna kam chalu karne ko
var started = false;
var level =0;

$(document).keypress(function(){
  if (!started ){
    $("#level-title").text("Level: "+ level);
  nextSequence();
  started = true;
  }
});


$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//abh main function ko run karenge jo game ka logic hai

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    // Agar dono pattern match kar gaye aur user ne poora sequence click kar liya
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("Wrong");
    wrongAnsSound();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}



function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

    var randNumber = Math.floor(Math.random() * 4);
    var randChosenColor = buttonColours[randNumber];
    gamePattern.push(randChosenColor);

    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randChosenColor);

}

function playSound(name){
      var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}


function animatePress(currentColor){
  $("#" +currentColor).addClass("pressed");
  
  setTimeout(function(){
    $("#" +currentColor).removeClass("pressed");
  }, 100);
}

function wrongAnsSound(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

//jab game over hojaye toh start over karna hoga
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
