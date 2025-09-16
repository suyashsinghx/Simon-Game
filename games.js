// ------------------ GAME VARIABLES ------------------
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

// ------------------ GAME START (Laptop) ------------------
$(document).keypress(function () {
  if (!started) {
    startGame();
  }
});

// ------------------ GAME START (Mobile Button) ------------------
$("#start-btn").on("click", function () {
  if (!started) {
    startGame();
  }
});

// ------------------ START GAME FUNCTION ------------------
function startGame() {
  level = 0;
  gamePattern = [];
  started = true;

  $("#start-btn").hide(); // hide start button after click
  $("#level-title").text("Level " + level);
  nextSequence();
}

// ------------------ USER CLICK ------------------
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// ------------------ CHECK ANSWER ------------------
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// ------------------ NEXT SEQUENCE ------------------
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randNumber = Math.floor(Math.random() * 4);
  var randChosenColor = buttonColours[randNumber];
  gamePattern.push(randChosenColor);

  $("#" + randChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // animation
  playSound(randChosenColor);
}

// ------------------ GAME OVER ------------------
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over! Press Key or Start Again");
  started = false;
  $("#start-btn").show(); // show start button again
}

// ------------------ SOUND ------------------
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ------------------ ANIMATION ------------------
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
