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
let trackMoveStart = false;
let timerStart = false;

  /*the restart function that resets all thing and restart a new game*/
function restart(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.card'));
  /*flip all cards*/
  for (let card of cardsToShuffle) {
    card.className = "card flipInX"
    setTimeout(function(){
      card.classList.remove('flipInX')
    },500);
  }
  /*Reset cardsOpen array*/
  cardsOpen = [];
  /*shuffle all cards*/
  const cardsShuffled = shuffle(cardsToShuffle);
  for (let card of cardsShuffled) {
    allCards.appendChild(card);
  }

  timerStart = false;
  trackMoveStart = false;
  trackMove();

  star();
}

/*track and count number of moves.*/
function trackMove(){
  /*Reset trackMove*/
  if (trackMoveStart === true){
    move ++;
  }
  if (trackMoveStart === false){
    move = 0;
    trackMoveStart = true;
  }
  /*display move*/
  if (move < 2){
    document.querySelector('.moves').innerText = move + " Move";
  }
  if (move >= 2){
    document.querySelector('.moves').innerText = move + " Moves";
  }
}

function timer (){
  time = 0;

  setInterval(function(){
    /*Start timing if timerStart is ture*/
    if(timerStart === true && move>=1){time++;}
    else if (timerStart === false) {time = 0; timerStart = true;}
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
},1000);
  }

function star(){
  const star1 = document.querySelector('#star1');
  const star2 = document.querySelector('#star2');
  const star3 = document.querySelector('#star3');
  if (move <30){
    star1.className = "fas fa-star";
    star2.className = "fas fa-star";
    star3.className = "fas fa-star";
  }
  if (30 <= move && move <50){
    star1.className ="far fa-star";
    starNumber = 2;
  }
  if (50 <= move && move < 70){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
    starNumber = 1;
  }
  if (70 <= move && move <= 80){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
    star3.className ="far fa-star";
    starNumber = 0;
  }
}

function addcardsOpen(a){
  cardsOpen.push(a);
}

function compare(){
  if (cardsOpen[0].firstElementChild.className ===
      cardsOpen[1].firstElementChild.className ){
        cardsOpen[0].classList.remove('flipInX')
        cardsOpen[1].classList.remove('flipInX')
        cardsOpen[0].classList.add('tada')
        cardsOpen[1].classList.add('tada')
        setTimeout(function(){
            cardsOpen[0].className = 'card open show match'
            cardsOpen[1].className = 'card open show match'
            cardsOpen = [];
            win();
          },300);
          /*timeout -- class is not added on immdately after card is flipped and matched. Need to call the win function inside compare function instead of outside.*/
      }else {
        //去掉最外层的计时器
        cardsOpen[0].classList.remove('flipInX')
        cardsOpen[1].classList.remove('flipInX')
        cardsOpen[0].classList.add('shake')
        cardsOpen[1].classList.add('shake')
        setTimeout(function(){
          //直接重置两张卡片的类名称
          cardsOpen[0].className = 'card'
          cardsOpen[1].className = 'card'
          cardsOpen = [];
        },300);//减少重置cardOpen数组的时间间隔
      }
}

/*show you win window when all cards are matched.*/

function win(){
  if(allCards.querySelectorAll('.match').length === 16){
  setTimeout(function(){
      document.querySelector('.modal_background').classList.toggle('hide');
      document.querySelector('.container').classList.toggle('hide');
      document.querySelector('.move_number').innerText = move;
      document.querySelector('.star_number').innerText = starNumber;
      document.querySelector('.finaltime').innerText =
      document.querySelector('.clock').innerText
        }, 500);
  }
}

restart();/*auto resets everything in the beginning*/
timer();//start timer

allCards.addEventListener('click', function(event){
  const cardClicked = event.target;
  if (cardClicked.classList.contains('card') && !cardClicked.classList.contains('match') && cardsOpen.length < 2
  && !cardsOpen.includes(cardClicked))
  {
      /*增加一个判断，如果被点击的卡片已经翻开，则直接返回，不再进行之后的操作*/
      if (cardClicked.classList.contains('open')){
        return;
      }
      trackMove();
      /*此处减少toggle的使用，直接添加需要的class*/
      addcardsOpen (cardClicked);
      cardClicked.classList.add('open','show','animated','faster','flipInX');
    }

   if (cardsOpen.length === 2) {
      compare();
      star();
    }
});

restartButton.addEventListener('click', function(){restart()});
