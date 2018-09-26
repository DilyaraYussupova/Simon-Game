
// cached DOM elements
var $message = $('.instruction').html();
console.log($message);
// variables
userSequence = [];
computerSequence = [];
var id, img, level = 0, score = 0;

    $('#levelEasy').click(function() {
        startSequence();
    })

    function doAfterSequence() {
        // get rid of 'click' eventlistener from previous cycle
        $('.imgGrid').off('click')
        /* User img listener */
        $('.imgGrid').click(function() {
            id = $(this).attr('id');
            img = $(this).attr('class');
            console.log(id + " " + img);
            addOpacityUser(id, img);
            userSequence.push(id);
            //console.log(userSequence);

        // check whether the order and img of user sequence are correct
            if(!userCorrect()) {
            gameOver();
            userSequence = [];
            }

            // compare length of each sequences
            if(userSequence.length === computerSequence.length) {
                // increment score each time sequence is correc
                ++score;
                console.log(score);
                $('.scoreBox').text("Score: " + score);

                userSequence = [];
                startSequence();
                $message = $('.instruction').html(" ");
            }
        })
    }
/* Temporary opacity over image (userSequence) */
function addOpacityUser(id, img) {
    $('#' + id).addClass(img+"-tinted");
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        $message = $('.instruction').html("Watch!");
        console.log($message);
    }, 1800); 
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
    $message = $('.instruction').html("Game Over");
  console.log("game over");
}
/* Reset the game */
function resetGame() {
    userSequence = [];
    computerSequence = [];
    level = 0;
    score = 0;
    $message = $('.instruction').html("Watch!");
}

/* Computer sequence */
function startSequence(cb) {
    ++level;
    //console.log("Level: " + level);
    $('.levelBox').text("Level: " + level);
   getRandomNumber();
   
   var i = 0;
   var myinterval = setInterval(function() {
      id = computerSequence[i];
      //console.log(id);
      img = $('#' + id).attr('class');
      console.log(id + " " + img);
      addOpacityComputer(id, img);
      i++;
      if(i === computerSequence.length) {
        clearInterval(myinterval);
      }
   },2000);
   doAfterSequence();
}

/* Generate random number */
function getRandomNumber() {
    var random = Math.floor(Math.random()*8);
    computerSequence.push(random);
    //console.log(computerSequence);
}

/* Temporary opacity over image (computerSequence) */
function addOpacityComputer(id, img) {
    $('#' + id).addClass(img+"-tinted");
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        $message = $('.instruction').html("Play");
    }, 1800); 
}

