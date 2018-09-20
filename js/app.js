/*
 * 创建一个包含所有卡片的数组
 */

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */


/*为什么这里不能用 getElementsByClassName('deck')?*/
const allCards = document.querySelector('.deck');
const restartButton = document.querySelector('#restartButton');
let cardsOpen = [];
let move = 0;
let starNumber = 3;
let time = 0;
let timerRestart = false;
let trackMoveRestart = false;

  /*the restart function that resets all thing and restart a new game*/
function restart(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.card'));
  /*flip all cards*/
  for (let card of cardsToShuffle) {
    card.className = "card";
    animationFlip(card);
    setTimeout(function(){
      animationFlip(card);
    },1000)
  }
  /*Reset cardsOpen array*/
  cardsOpen = [];
  /*shuffle all cards*/
  const cardsShuffled = shuffle(cardsToShuffle);
  for (let card of cardsShuffled) {
    allCards.appendChild(card);
  }
  timerRestart= true;/*rest time*/
  trackMoveRestart = true;/*reset moves*/
  trackMove();
}

restart();/*auto resets everything in the beginning*/
timer();/*start clock.*/

/*track and count number of moves.*/
function trackMove(){
  /*Reset trackMove*/
  if (trackMoveRestart === false ){
      move ++;
  } else if(trackMoveRestart === true){ move = 0; trackMoveRestart = false;}
  /*display move*/
  if (move < 2){
    document.querySelector('.moves').innerText = move + " Move";
  }
  if (move >= 2){
    document.querySelector('.moves').innerText = move + " Moves";
  }
}

function star(){
  const star1 = document.querySelector('#star1');
  const star2 = document.querySelector('#star2');
  const star3 = document.querySelector('#star3');
  if (15 <= move && move <= 22){
    star1.className ="far fa-star";
    starNumber = 2;
  }
  if (23 <= move && move <= 34){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
    starNumber = 1;
  }
  if (34 <= move && move <= 48){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
    star3.className ="far fa-star";
    starNumber = 0;
  }
}

function flipcard(a) {
  a.classList.toggle('open');
  a.classList.toggle('show');
}

function match(a) {
  a.classList.toggle('match');
}

function animationFlip(a){
  a.classList.toggle('animated');
  a.classList.toggle('flipInX');
}

function animationShake(a){
  a.classList.toggle('animated');
  a.classList.toggle('shake');
}

function animationTada(a){
  a.classList.toggle('animated');
  a.classList.toggle('tada');
}

function addcardsOpen(a){
  cardsOpen.push(a);
}

function compare(){
  if (cardsOpen[0].firstElementChild.className ===
      cardsOpen[1].firstElementChild.className ){
        match(cardsOpen[0]);
        match(cardsOpen[1]);
        setTimeout(function(){
          animationTada(cardsOpen[0]);
          animationTada(cardsOpen[1]);
          setTimeout(function(){
            animationTada(cardsOpen[0]);
            animationTada(cardsOpen[1]);
            cardsOpen = [];
          },500);
        },1000);
      }else {
        setTimeout(function(){
          animationShake(cardsOpen[0]);
          animationShake(cardsOpen[1]);
          setTimeout(function(){
            flipcard(cardsOpen[0]);
            flipcard(cardsOpen[1]);
            animationShake(cardsOpen[0]);
            animationShake(cardsOpen[1]);
            cardsOpen = [];
          },500);
        }, 1000);
      }
}

function win(){
  const cardsMatched = document.querySelectorAll('.match')
  if (cardsMatched.length === 16){
    setTimeout(function(){
      document.querySelector('.modal_background').classList.toggle('hide');
      document.querySelector('.container').classList.toggle('hide');
      document.querySelector('.move_number').innerText = move;
      document.querySelector('.star_number').innerText = starNumber;
    }, 1500);
  }
}

/*timer function*/

function timer (){
  time = 0;

  setInterval(function(){
    /*Restart timing if timeRestart is ture*/
    if(timerRestart === false){time ++;}
    else if(timerRestart === true){time = 0; timerRestart = false;}
    /*Convert seconds into clock format and show on page*/
    let seconds = "00";
    if((time%60)<10){
      seconds = "0"+(time%60);
    } else {seconds = time%60;}

    let minutes = "00";
    if(Math.floor(time/60)<10){
      minutes = "0"+ Math.floor(time/60);
    } else {minutes = Math.floor(time/60);}
    document.querySelector('.clock').innerText = minutes + ":" + seconds;

  }
, 1000);
  }

allCards.addEventListener('click', function(event){
  const cardClicked = event.target;
  if ((cardClicked.classList.contains('card')) && (!cardClicked.classList.contains('match')) && (cardsOpen.length < 2)
  && (!cardsOpen.includes(cardClicked)))
  {
      flipcard (cardClicked);
      animationFlip(cardClicked);
      addcardsOpen (cardClicked);
      setTimeout(function(){
        animationFlip(cardClicked);
      },1000);
    }
   if (cardsOpen.length === 2){
      compare();
      trackMove();
      star();
      win();
    }
});

restartButton.addEventListener('click', function(){restart()});
