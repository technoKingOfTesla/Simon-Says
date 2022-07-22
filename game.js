var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * (4 - 0) + 1 - 1);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

  level++;

  $("h1").html("Level " + level);
};


$(".btn").click(function(e) {

  var userChosenColor = e.target.id;

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)

  playSound(userChosenColor);

  animatePress(userChosenColor);
});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
};

$("body").keyup(function(e) {
  if (e.key === "a") {
    nextSequence();
    $("h1").html("Level " + level);
  }
})

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("h1").html("Game Over, Press any key to restart!")

    $("body").keydown(function() {
      startOver();
    });
  }

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
      userClickedPattern.splice(0);
    }
  }
}

function startOver() {
  userClickedPattern.splice(0);
  gamePattern.splice(0);
  level = 0;
};
