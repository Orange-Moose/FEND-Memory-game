/*
 * Create a list that holds all of your cards
 */

let icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
 "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
  "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",
  "fa fa-bomb", "fa fa-bomb"];

//Array variables
let openCards = [];
let allOpenCards = [];


const deck = document.querySelector('.deck');

//Moves variables
const movesCount = document.querySelector('.moves');
let count = 0;

// Popup variables
let popupContainer = document.querySelector("#popup-container");
const stars = document.querySelector('.stars');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
}



 // START THE GAME

function startTheGame ()  {
    deck.innerHTML = "";
    
    // reset move count
    count = 0;
    movesCount.innerHTML = count;

    //reset the rating
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(5);

    // Call functions to create AND shuffle new cards
    
    shuffle(icons);

    //Reset card matching variables
    openCards.innerHTML = "";
    

    //   - loop through each card and create its HTML
    for (let i=0; i < icons.length; i++) {
	   const card = document.createElement('li');
	   card.classList.add('card');
	   card.innerHTML = '<i class="' + icons[i] + '"></i>';
	   deck.appendChild(card);

	   //Function with click event
	   clickCard(card);
	} //end of for loop
}; // end of startTheGame function

shuffle(icons);
startTheGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
    
// CLICKED CARDS

 	function clickCard(card) {
 		card.addEventListener('click', function () {
    	const currentCard = this;
        const previousCard = openCards[0];  

        // Chech if there is an existing open card 	
    	if (openCards.length === 1)  {
    		
    		

    		card.classList.add('open', 'show', 'disabled');
    		openCards.push(currentCard);

            // Compare the two open cards
    		compareCards(currentCard, previousCard);
            // Count the moves
            countMoves();

    	} else {
			// If no open cards in the openCards array
			card.classList.add('open', 'show', 'disabled');
    		openCards.push(this);
    	}; // end of if...else statement
	
		}); //end of 'click' function
        
 }//end of clickCard function

	

// COMPARE THE OPEN CARDS

function compareCards(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
                
        // Add style to matched cards and ade them to the matched cards list.
         currentCard.classList.add('match');
        previousCard.classList.add('match');
        allOpenCards.push(currentCard, previousCard);
        openCards = [];
        
        //Check if the game is over
        setTimeout (function() {
            gameOver();
        }, 0); //end of setTimeout function
    } else {
            
        setTimeout (function() {
            currentCard.classList.remove('match', 'open', 'show', 'disabled');
            previousCard.classList.remove('match', 'open', 'show', 'disabled');
        }, 700); //end of setTimeout function
            openCards = [];
    } // end of if...else statement

} // end of compareCards function
 



//RESET THE GAME

const restart = document.querySelector('.restart');

restart.addEventListener('click', function() {
	// Clear the card deck
    deck.innerHTML = "";
    
    // reset move count
    count = 0;
    movesCount.innerHTML = count;

    //reset the rating
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(5);

	// Call functions to create AND shuffle new cards
	startTheGame();
	shuffle(icons);

	//Reset card matching variables
	openCards.innerHTML = "";

	
}); //end of Restart event function



//STAR RATING

function rating() {

    switch(count) {
        case 15:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(4);
            break;
        case 19:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(3);
            break;
        case 21:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(2);
            break;
        case 25:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li>'.repeat(1);
            break;
    } //end of switch statement
};// end of rating function


//COUNT THE MOVES

function countMoves() {
	count ++;
    movesCount.innerHTML = count;
    rating();
}; //end of countMoves function


//GAME OVER POPUP CONTAINER

function gameOver () {
        if (allOpenCards.length === icons.length) {
        // show game over popup
        popupContainer.classList.add("display");

        let starRating = stars.innerHTML;

        //showing moves and rating
        document.querySelector(".fin-moves").innerHTML = count;
        document.querySelector(".fin-stars").innerHTML = stars.innerHTML;

        //close and restart
        closePopup();
        
        } //end of if statement;

    };  //end of gameOver 


// Close popup container
let closeIcon = document.querySelector('.close');

function closePopup(){
    closeIcon.addEventListener('click', function(event){
        popupContainer.classList.remove("display");
        startTheGame();
    });
}


// Replay the game button in popup
const replay = document.querySelector('#play-again');

function playAgain(){
    
        popupContainer.classList.remove("display");
        startTheGame();
    }