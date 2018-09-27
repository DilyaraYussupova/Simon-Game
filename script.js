
// cached DOM elements
var $message = $('.instruction').html();

// variables
userSequence = [];
computerSequence = [];
var id, img, level = 0, score = 0;

var beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
var winnerAudio = new Audio('audio/winner.mp3');
var gameOverAudio = new Audio('audio/gameOver.mp3');

const timeLookUp = {
  easy: {
     timeBetween: 2000,
     timeToDisplay: 1800,
  },
  medium: {
     timeBetween: 1000,
     timeToDisplay: 800,
  },
  hard: {
     timeBetween: 500,
     timeToDisplay: 300,
  }
}

var diffLevelOne = timeLookUp.easy.timeBetween;
var diffLevelTwo = timeLookUp.easy.timeToDisplay;

    $('#levelEasy').click(function() {
        startSequence();
    })

    $('#levelMedium').click(function() {
        diffLevelOne = timeLookUp.medium.timeBetween;
        diffLevelTwo = timeLookUp.medium.timeToDisplay;
        startSequence();
    })

    $('#levelHard').click(function() {
        diffLevelOne = timeLookUp.hard.timeBetween;
        diffLevelTwo = timeLookUp.hard.timeToDisplay;
        startSequence();
    })

    function doAfterSequence() {
        // get rid of 'click' eventlistener from previous cycle
        $('.imgGrid').off('click')
        /* User img listener */
        $('.imgGrid').click(function() {
            $message = $('.instruction').html("Play!");
            beepAudio.play();
            id = $(this).attr('id');
            img = $(this).attr('class');
            userSequence.push(id);
            addOpacityUser(id, img);

        // check whether the order and img of user sequence are correct
            if(!userCorrect()) {
            gameOver();
            userSequence = [];
            }

            if(userSequence.length === 8) {
                winnerAudio.play();
                $message = $('.instruction').html("Winner!").css({'color':'green','font-weight': 'bold'});
                $('.levelBox').css({'color':'green','font-weight': 'bold'});
                $('.scoreBox').css({'color':'green','font-weight': 'bold'});
                $('.imgGrid').off('click')
                setTimeout(function() {
                $message = $('.instruction').html("Press Reset!").css({'color':'yellow','font-weight': 'normal'});
                }, 2500);
                $('.resetBtn').click(function() {
                    resetGame();
                })
                startSequence.stop();
            }

            // compare length of each sequences
            if(userSequence.length === computerSequence.length) {
                // increment score each time sequence is correc
                ++score;
                $('.scoreBox').text("Score: " + score);
                userSequence = [];
                startSequence();
            }
        })
    }
/* Temporary opacity over image (userSequence) */
function addOpacityUser(id, img) {
    $('#' + id).addClass(img+"-tinted");
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
    }, diffLevelTwo); 
}
/* compare user sequence against computer's */
function userCorrect() {
   for(var i = 0; i < userSequence.length; i++) {
       if(userSequence[i] != computerSequence[i]) {
           return false;
       }
   }
   return true;
}

function gameOver() {
    gameOverAudio.play();
    $message = $('.instruction').html("Game Over!").css({'color':'red','font-weight': 'bold'});
    $('.levelBox').css({'color':'red','font-weight': 'bold'});
    $('.scoreBox').css({'color':'red','font-weight': 'bold'});
    $('.imgGrid').off('click');
    setTimeout(function() {
    $message = $('.instruction').html("Press Reset!").css({'color':'yellow','font-weight': 'normal'});
    }, 2500);
    $('.resetBtn').click(function() {
        resetGame();
    })
}
/* Reset the game */
function resetGame() {
    userSequence = [];
    computerSequence = [];
    level = 0;
    $('.levelBox').text("Level: " + level).css({'color':'white','font-weight': 'normal'});;
    score = 0;
    $('.scoreBox').text("Score: " + score).css({'color':'white','font-weight': 'normal'});;
    $message = $('.instruction').html("Watch!").css({'color':'white','font-weight': 'normal'});;
}

/* Computer sequence */
function startSequence(cb) {
    ++level;
    $('.levelBox').text("Level: " + level);
   getRandomNumber();
   
   var i = 0;
   var myinterval = setInterval(function() {
      id = computerSequence[i];
      img = $('#' + id).attr('class');
      $message = $('.instruction').html("Watch!");
      addOpacityComputer(id, img);
      i++;
      if(i === computerSequence.length) {
        clearInterval(myinterval);
      }
   },diffLevelOne);
   doAfterSequence();
}

/* Generate random number */
function getRandomNumber() {
    var random = Math.floor(Math.random()*8);
    computerSequence.push(random);
}

/* Temporary opacity over image (computerSequence) */
function addOpacityComputer(id, img) {
    $('#' + id).addClass(img+"-tinted");
    beepAudio.play();
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        if(level === 1) {
            //console.log(computerSequence.length);
        $message = $('.instruction').html("Play!");
        } else {
            $message = $('.instruction').html("Watch!");
        }
    }, diffLevelTwo); 
}