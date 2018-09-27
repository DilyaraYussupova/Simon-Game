
// cached DOM elements
var $message = $('.instruction').html();

// variables
userSequence = [];
computerSequence = [];
var id, img, level = 0, score = 0;

var beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');

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
        console.log(diffLevelOne);
        startSequence();
    })

    $('#levelMedium').click(function() {
        diffLevelOne = timeLookUp.medium.timeBetween;
        console.log(diffLevelOne);
        diffLevelTwo = timeLookUp.medium.timeToDisplay;
        //console.log(diffLevelTwo);
        startSequence();
    })

    $('#levelHard').click(function() {
        diffLevelOne = timeLookUp.hard.timeBetween;
        console.log(diffLevelOne);
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
            console.log(id + " " + img);
            userSequence.push(id);
            addOpacityUser(id, img);

        // check whether the order and img of user sequence are correct
            if(!userCorrect()) {
            gameOver();
            userSequence = [];
            }

            if(userSequence.length === 8) {
                $message = $('.instruction').html("Winner!").css({'color':'green','font-weight': 'bold'});
                $('.levelBox').css({'color':'green','font-weight': 'bold'});
                $('.scoreBox').css({'color':'green','font-weight': 'bold'});
                console.log("Congrats!");
                $('.resetBtn').click(function() {
                    resetGame();
                })
                startSequence.stop();
            }

            // compare length of each sequences
            if(userSequence.length === computerSequence.length) {
                // increment the score each time the sequence is correct
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
/* compare usersequence against computer's */
function userCorrect() {
   for(var i = 0; i < userSequence.length; i++) {
       if(userSequence[i] != computerSequence[i]) {
           return false;
       }
   }
   return true;
}

function gameOver() {
    $message = $('.instruction').html("Game Over!").css({'color':'red','font-weight': 'bold'});
    $('.levelBox').css({'color':'red','font-weight': 'bold'});
    $('.scoreBox').css({'color':'red','font-weight': 'bold'});
  console.log("game over");
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
   console.log(computerSequence.length);
   
   var i = 0;
   var myinterval = setInterval(function() {
      id = computerSequence[i];
      img = $('#' + id).attr('class');
      $message = $('.instruction').html("Watch!");
      console.log(id + " " + img);
      addOpacityComputer(id, img);
      i++;
      if(i === computerSequence.length) {
        clearInterval(myinterval);
      }
   },diffLevelOne);
   console.log(diffLevelOne);
   doAfterSequence();
}

/* Generate random number */
function getRandomNumber() {
    var random = Math.floor(Math.random()*8);
    console.log(random);
    computerSequence.push(random);
}

/* Temporary opacity over image (computerSequence) */
function addOpacityComputer(id, img) {
    $('#' + id).addClass(img+"-tinted");
    beepAudio.play();
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        if(level === 1) {
        $message = $('.instruction').html("Play!");
        } else {
            $message = $('.instruction').html("Watch!");
        }
    }, diffLevelTwo); 
}