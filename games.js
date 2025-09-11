// =========================
// Simon Game JS Code
// =========================

// Game patterns
var gamePattern = [];  // Computer generated sequence
var buttonColours = ["red", "blue", "green", "yellow"];  // Possible button colors
var userClickedPattern = [];  // User clicked sequence

// Game state
var started = false;  // Track if the game has started
var level = 0;        // Current level

// =========================
// START GAME
// =========================

// Desktop: Start game
function startGame(){

  if (!started) {
    nextSequence();   // Start the first sequence
    started = true;   // Mark game as started
    $("#start-btn").hide();   //mobile button hide hojaye
    $("#level-title").text("Level: " + level);
  }
}
//mobile detect karna
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if(!isMobile){
  $(document).keydown(startGame);
}
if(isMobile){
  $("#start-btn").show().click(startGame)
}
// Mobile: Start game on button click (optional, later integrate)
$(".btn").on("click touchstart", function() {

    var userChosenColour = $(this).attr("id");  // Get id of clicked button
    userClickedPattern.push(userChosenColour);  // Add to user's pattern

    animatePress(userChosenColour);  // Button press animation
    playSound(userChosenColour);     // Play corresponding sound

    checkAnswer(userClickedPattern.length - 1); // Check current answer
});

// =========================
// GAME LOGIC FUNCTIONS
// =========================

// Check user's answer against game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    // If user has completed the full sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();  // Generate next sequence after 1 second
      }, 1000);
    }

  } else {
    console.log("Wrong");
    wrongAnsSound();  // Play wrong sound

    $("h1").text("Game Over, Press Any Key to Restart");  // Game over message
    $("body").addClass("game-over");  // Flash red background

    setTimeout(function() {
      $("body").removeClass("game-over");  // Remove flash
    }, 200);

    startOver();  // Reset game
  }
}

// Generate next sequence
function nextSequence() {
  userClickedPattern = [];  // Reset user clicks for next level
  level++;                  // Increase level
  $("#level-title").text("Level " + level);

  var randNumber = Math.floor(Math.random() * 4); // Random number 0-3
  var randChosenColor = buttonColours[randNumber]; // Random color
  gamePattern.push(randChosenColor); // Add to game pattern

  // Animate button flash
  $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randChosenColor); // Play color sound
}

// Play sound for given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play wrong answer sound
function wrongAnsSound() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

// Reset game state
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
