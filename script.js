
// cached DOM elements
var $message = $('.instruction').html();
console.log($message);
// variables
userSequence = [];
computerSequence = [];
var id, img, level = 0, score = 0;

const timeLookUp = {
  easy: {
     timeBetween: 2000,
     timeToDisplay: 1800,
  },
  medium: {
     timeBetween: 1500,
     timeToDisplay: 1300,
  },
  hard: {
     timeBetween: 1000,
     timeToDisplay: 800,
  }
}

    $('#levelEasy').click(function() {
        startSequence();
    })

    function doAfterSequence() {
        // get rid of 'click' eventlistener from previous cycle
        $('.imgGrid').off('click')
        /* User img listener */
        $('.imgGrid').click(function() {
            $message = $('.instruction').html("Play!");
            id = $(this).attr('id');
            img = $(this).attr('class');
            console.log(id + " " + img);
            userSequence.push(id);
            //console.log(userSequence);
            addOpacityUser(id, img);

        // check whether the order and img of user sequence are correct
            if(!userCorrect()) {
            gameOver();
            userSequence = [];
            }

            // compare length of each sequences
            if(userSequence.length === computerSequence.length) {
                // increment score each time sequence is correc
                ++score;
                //console.log(score);
                $('.scoreBox').text("Score: " + score);
                userSequence = [];
                //$message = $('.instruction').html(" ");
                startSequence();
            }
        })
    }
/* Temporary opacity over image (userSequence) */
function addOpacityUser(id, img) {
    $('#' + id).addClass(img+"-tinted");
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        // if (userSequence.length === 3) {
        //     $message = $('.instruction').html("Dilyara!!");
        //     }
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
    //console.log("Level: " + level);
    $('.levelBox').text("Level: " + level);
   getRandomNumber();
   console.log(computerSequence.length);
   
   var i = 0;
   var myinterval = setInterval(function() {
      id = computerSequence[i];
      //console.log(id);
      img = $('#' + id).attr('class');
      $message = $('.instruction').html("Watch!");
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
    console.log(random);
    computerSequence.push(random);
    //console.log(computerSequence);
}

/* Temporary opacity over image (computerSequence) */
function addOpacityComputer(id, img) {
    $('#' + id).addClass(img+"-tinted");
    setTimeout(function() {
        $('#' + id).removeClass(img+"-tinted");
        if(computerSequence.length === 1 && level === 1) {
            //console.log(computerSequence.length);
        $message = $('.instruction').html("Play!");
        } else {
            $message = $('.instruction').html("Watch!");
            $message = $('.instruction').html("Play!"); 
        }
        //$message = $('.instruction').html("Play"); 
    }, 1800); 
}

$('#levelMedium').click(function() {
    startSequence();
})

