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


/*为什么这里不能用 getElementsByClassName('.deck')?*/
const allCards = document.querySelector('.deck');
const restartButton = document.querySelector('#restartButton');
let cardsOpen = [];
let move = 0;

function restart(){
  const cardsToShuffle = Array.from(document.querySelectorAll('.card'));
  const cardsShuffled = shuffle(cardsToShuffle);
  for (card of cardsShuffled) {
    allCards.appendChild(card);
  }
}

restart();


function trackmove(){
  move ++;
  document.querySelector('.moves').innerText = move;
}

function star(){
  const star1 = document.querySelector('#star1');
  const star2 = document.querySelector('#star2');
  const star3 = document.querySelector('#star3');
  if (8 <= move && move <= 16){
    star1.className ="far fa-star";
  }
  if (17 <= move && move <= 24){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
  }
  if (25 <= move && move <= 32){
    star1.className ="far fa-star";
    star2.className ="far fa-star";
    star3.className ="far fa-star";
  }
}

function flipcard(a) {
  a.classList.toggle('open');
  a.classList.toggle('show');
}

function addcardsOpen(a){
  cardsOpen.push(a);
}

function compare(){
  if (cardsOpen[0].firstElementChild.className ===
      cardsOpen[1].firstElementChild.className ){
        cardsOpen[0].classList.toggle('match');
        cardsOpen[1].classList.toggle('match');
        cardsOpen = [];
      }else {
        setTimeout(function(){
          flipcard(cardsOpen[0]);
          flipcard(cardsOpen[1]);
          cardsOpen = [];
        }, 1000);
      }
}

allCards.addEventListener('click', function(event){
  const cardClicked = event.target;
  if ((cardClicked.classList.contains('card')) && (!cardClicked.classList.contains('match')) && (cardsOpen.length < 2)
  && (!cardsOpen.includes(cardClicked)))
  {
      flipcard (cardClicked);
      addcardsOpen (cardClicked);
    }
   if (cardsOpen.length === 2){
      compare();
      trackmove();
      star();
    }
});

restartButton.addEventListener('click', function(){restart()});
