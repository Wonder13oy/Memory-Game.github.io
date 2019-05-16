const cards = document.querySelectorAll('.Card');

let hasFlippedCard = false;
let lockBoard = false; //To stop the user from picking more than 2 cards
let firstCard, secondCard;

//This is where the game starts
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;//prevents the user from double clicking on the same card
  this.classList.add('flip');

  //Stops the user from flipping the same card twice
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//Prevent any interaction after the cards match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//To return the cards back around after there is no match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 700);
}

//To make sure that not more than 2 cards are chosen
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//To randomise the positions of the cards on the board
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
