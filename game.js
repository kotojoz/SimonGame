const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$(document).keypress(handleKeyPress);
$(".btn").click(handleButtonClick);

function handleKeyPress() {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
}

function handleButtonClick() {
    if (gameStarted) {
        const userChosenColor = this.id;
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
}

function nextSequence() {
    level++;
    updateLevelText();
    resetUserPattern();

    const randomChosenColor = buttonColors[getRandomNumber()];
    gamePattern.push(randomChosenColor);

    flashColor(randomChosenColor);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (isAnswerCorrect(currentLevel)) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        handleWrongAnswer();
    }
}

function isAnswerCorrect(currentLevel) {
    return gamePattern[currentLevel] === userClickedPattern[currentLevel];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    playSound(currentColor);
}

function playSound(name) {
    const soundFilePath = `sounds/${name}.mp3`;
    const audio = new Audio(soundFilePath);
    audio.play();
}

function updateLevelText() {
    $("h1").text("Level " + level);
}

function resetUserPattern() {
    userClickedPattern = [];
}

function flashColor(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

function handleWrongAnswer() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
