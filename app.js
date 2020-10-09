
let grid = document.querySelector('.grid')
let goodsText = document.querySelector('#goodsText')
let attemptsText = document.querySelector('#attemptsText')
let width = 11
let height = 7

let attemptsAmount = 13;
let attemptsUsed = 0;
let goodsAmount = 12
let goodsFound = 0;

let squares = []

let goodsArray = [];
let emptyArray = [];
let gameArray = [];
let shuffledArray = [];

//create Board
function createBoard() {
  goodsText.innerHTML = "0 / " + goodsAmount
  attemptsText.innerHTML = "0 / " + attemptsAmount

  console.log(goodsAmount);
  //get shuffled game array with random bombs
  goodsArray = Array(parseInt(goodsAmount)).fill('good')
  console.log(goodsArray);
  emptyArray = Array(width*height - parseInt(goodsAmount)).fill('valid')
  gameArray = emptyArray.concat(goodsArray);

  for(var i = gameArray.length - 1; i >= 0; i--){
    var j = Math.floor(Math.random() * i)
    var temp = gameArray[i]
    gameArray[i] = gameArray[j]
    gameArray[j] = temp
  }
  shuffledArray = gameArray;

  for(let i = 0; i < width*height; i++) {
    let square = document.createElement('div')
    square.setAttribute('id', i)
    square.classList.add(shuffledArray[i])
    grid.appendChild(square)
    squares.push(square)

    //normal click
    square.addEventListener('click', function(e) {
      click(square,true)
    })
  }

  //add numbers
  for (let i = 0; i < squares.length; i++) {
    let total = 0
    const isLeftEdge = (i % width === 0)
    const isRightEdge = (i % width === width -1)

    //0,10,10,11,76,66,65,66

    if (squares[i].classList.contains('valid')) {
      if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('good')) total ++
      if (i > 10 && !isRightEdge && squares[i +1 -width].classList.contains('good')) total ++
      if (i > 10 && squares[i -width].classList.contains('good')) total ++
      if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('good')) total ++
      if (i < 76 && !isRightEdge && squares[i +1].classList.contains('good')) total ++
      if (i < 66 && !isLeftEdge && squares[i -1 +width].classList.contains('good')) total ++
      if (i < 65 && !isRightEdge && squares[i +1 +width].classList.contains('good')) total ++
      if (i < 66 && squares[i +width].classList.contains('good')) total ++
      squares[i].setAttribute('data', total)
    }
  }
}
createBoard()

//reset board
function newGame() {
  for(var i = 0; i< width*height; i++){
    //document.getElementById(i).parentNode.removeChild(document.getElementById(i));
  }
  document.querySelector("#warning").innerHTML = "";
  grid.innerHTML = "";
  grid = document.querySelector('.grid')
  goodsText = document.querySelector('#goodsText')
  attemptsText = document.querySelector('#attemptsText')

  squares = [];
  goodsArray = [];
  emptyArray = [];
  gameArray = [];
  shuffledArray = [];

  attemptsUsed = 0;
  goodsFound = 0;

  attemptsAmount = document.querySelector('#attemptsAmount').value;
  goodsAmount = document.querySelector('#goodsAmount').value

  createBoard()
}

//click on square actions
function click(square,firstClick) {
  let currentId = square.id
  if (square.classList.contains('checked')) return
  if(firstClick){
    attemptsUsed++;
    if(attemptsUsed > attemptsAmount){
      attemptsText.innerHTML = attemptsUsed + " / " + attemptsAmount + "<br>(Diamonds Used: " + 10*(attemptsUsed-attemptsAmount) + ")</br>";
    }else{
      attemptsText.innerHTML = attemptsUsed + " / " + attemptsAmount;
    }

    if(attemptsUsed >= attemptsAmount){
      document.querySelector("#warning").innerHTML = ". . . <br>You have used up your free attempts! You can still continue playing, but any extra attempt will cost 10 Diamonds</br>";
    }else{
      document.querySelector("#warning").innerHTML = "";
    }
  }
  if (square.classList.contains('good')) {
    goodOpened(square)
  } else {
    let total = square.getAttribute('data')
    if (total !=0) {
      square.classList.add('checked')
      var nums = ['','one','two','three','four','five','six','seven','eight'];
      square.classList.add(nums[total]);
      return
    } else{
      square.classList.add('checked')
      square.classList.remove('valid')
    }
    checkSquare(square, currentId)
  }
  square.classList.add('checked')
}

function goodOpened(square) {
  
  square.innerHTML = "<img src=\"./assets/goods.png\" width=\"40px\" height=\"40px\">";
  square.classList.remove('good')
  square.classList.add('checked')
  goodsFound++;
  if(goodsFound > goodsAmount){goodsFound = goodsAmount}
  goodsText.innerHTML = goodsFound + " / " + goodsAmount 

}


//check neighboring squares once square is clicked
function checkSquare(square, currentId) {
  const isLeftEdge = (currentId % width === 0)
  const isRightEdge = (currentId % width === width -1)
  
  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) -1].id
      //const newId = parseInt(currentId) - 1   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId > 10 && !isRightEdge) {
      const newId = squares[parseInt(currentId) +1 -width].id
      //const newId = parseInt(currentId) +1 -width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId > 10) {
      const newId = squares[parseInt(currentId -width)].id
      //const newId = parseInt(currentId) -width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) -1 -width].id
      //const newId = parseInt(currentId) -1 -width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId < 76 && !isRightEdge) {
      const newId = squares[parseInt(currentId) +1].id
      //const newId = parseInt(currentId) +1   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId < 66 && !isLeftEdge) {
      const newId = squares[parseInt(currentId) -1 +width].id
      //const newId = parseInt(currentId) -1 +width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId < 65 && !isRightEdge) {
      const newId = squares[parseInt(currentId) +1 +width].id
      //const newId = parseInt(currentId) +1 +width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
    if (currentId < 66) {
      const newId = squares[parseInt(currentId) +width].id
      //const newId = parseInt(currentId) +width   ....refactor
      const newSquare = document.getElementById(newId)
      click(newSquare,false)
    }
  }, 10)
}



