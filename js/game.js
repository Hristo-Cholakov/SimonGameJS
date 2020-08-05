var level = 0;
var colors = ["red", "blue", "yellow", "green"];
var gameSuggestedPattern = [];
var userClickedPattern = [];

$(document).keypress(function() {
  $("label").toggleClass("hidden");
  level = 0;

  gamePlay();



});

$(".btn").click(function() {
  console.log("click method");
  userChosenColor = $(this).attr("id");
  customAnimation(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkSequence(userClickedPattern.length - 1);

})

function playSound(buttonName) {
  var audio = new Audio('sounds/' + buttonName + '.mp3');
  audio.play();
};

function customAnimation(button) {
  $("#" + button).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function gamePlay() {

  level++;
  $("h1").text("Level " + level);
  var randomPick = Math.floor(Math.random() * 4);
  var selectedColor = colors[randomPick];
  gameSuggestedPattern.push(selectedColor);
  playSound(selectedColor);
  customAnimation(selectedColor);

};

function checkSequence(currentLevel) {
  if (gameSuggestedPattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gameSuggestedPattern.length === userClickedPattern.length) {
      setTimeout(function() {
        gamePlay();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    wrongAnswer();
  }

};

function wrongAnswer() {

  $("label").toggleClass("hidden");
  $("h1").text("Press any key to start the game");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 1500);
  playSound('wrong');

  setTimeout(function() {
    location.reload();
  }, 1500);

}
