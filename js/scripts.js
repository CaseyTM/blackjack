// -----------------GLOBALS ---------------------------------
// -----------------GLOBALS ---------------------------------
// -----------------GLOBALS ---------------------------------
var theDeck = createDeck();
var playersHand = [];     //SAME AS PLAYER1SQUARES IN TICTACTOE
var dealersHand = []; 	  //SAME AS PLAYER2SQUARES IN TICTACTOE
var topOfDeck = 4;

$(document).ready(function(){
	$('.reset-button').click(function(){
		reset();
	});

	$('.deal-button').click(function(){
		// DEAL STUFF GOES IN HERE 
		shuffleDeck();  
		playersHand.push(theDeck.shift());
		// theDeck.shift(); // REMOVE THE TOP OF THE DECK
		playersHand.push(theDeck.shift());
		// theDeck.shift();

		placeCard('player','1',playersHand[0]);
		placeCard('player','2',playersHand[1]);

		dealersHand.push(theDeck.shift());
		// theDeck.shift();
		dealersHand.push(theDeck.shift());
		// theDeck.shift();

		placeCard('dealer','1',dealersHand[0]);
		placeCard('dealer','2',dealersHand[1]);

		calculateTotal(dealersHand, 'dealer')
		calculateTotal(playersHand, 'player')

	});


	$('.hit-button').click(function(){
		// HIT STUFF GOES IN HERE
		// var whatThePlayerHas = Number($'.player.total-number').text

		if(calculateTotal(playersHand, 'player') < 21){
		playersHand.push(theDeck.shift());
		var slotForNewCard = playersHand.length;
		// if(playersHand.length = 3){
		// 	slotForNewCard = "three";
		// }else if(playersHand.length === 4){
		// 	slotForNewCard = "four";	
		// }else if(playersHand.length === 5){
		// 	slotForNewCard = "five";	
		// }else if(playersHand.length === 6){
		// 	slotForNewCard = "six";	
		// }
		var lastCardIndex = playersHand.length-1
		placeCard('player',slotForNewCard,playersHand[lastCardIndex]);
		calculateTotal(playersHand, 'player');
		}
	});

	$('.stand-button').click(function(){
		dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length-1;
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',slotForNewCard,dealersHand[lastCardIndex]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
		}
		checkWin();
	});



});

function shuffleDeck(){
	for(let i = 0 ; i < 9999 ; i++){
	var random1 = Math.floor(Math.random()* theDeck.length);
	var random2 = Math.floor(Math.random()* theDeck.length);
	var temp = theDeck[random1];
	theDeck[random1] = theDeck[random2];
	theDeck[random2] = temp;
	}};

function checkWin(){
	dealerTotal = calculateTotal(dealersHand, 'dealer');
	playerTotal = calculateTotal(playersHand, 'player');
	if(playerTotal > 21){
		$('.dealer-total-number').text("Dealer won!");

	}else if(dealerTotal > 21){
		$('.dealer-total-number').text("Dealer Busted!");
		// player is safe, dealer has busted update dom
	}else{
		if(playerTotal > dealerTotal){
			$('.player-total-number').text("You won!");
			// Player won, update the DOM
		}else if(dealerTotal > playerTotal){
			$('.dealer-total-number').text("Dealer won!");
			// dealer won, update the dom
		}else{
			$('.player-total-number').text("Tie!");
			$('.dealer-total-number').text("Tie!");
			// TIE, update the DOM
		}
	}
}

function reset(){
	// deck needs to be reset, player and dealer hands too 
	// RESET THE DOM INCLUDING TOTALS
	theDeck = createDeck();
	playersHand = [];
	dealersHand = [];
	$('.card').html('');
	playerTotal = calculateTotal(dealersHand, 'dealer');
	dealerTotal = calculateTotal(playersHand, 'player');


}


function createDeck(){
	var newDeck = [];
	var suits = ['h', 's', 'd', 'c'];
	for( let s = 0 ; s < suits.length; s++){
		// suits outer loop
		for(let c = 1; c <= 13; c++){
			// card values inner loop
			newDeck.push(c+suits[s]);
		}
	}
	return newDeck;
}
function placeCard(who,where,whatCard){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html('<img src="images/' + whatCard + '.png">');

}

function calculateTotal(hand, who){
	var countAce = 0;
	var total = 0; 
	var cardValue = 0;
	for(let i = 0 ; i < hand.length ; i ++){
		// HANDLE THE FACE-CARDS
	cardValue = Number(hand[i].slice(0,-1));
		if(cardValue > 10){
			cardValue = 10;
		}if((cardValue === 1) && (total <11)){
			cardValue = 11;
			countAce++;
		}
		total += cardValue;
		if((countAce > 0) && (total > 21)){
			total -= 10;
			countAce--;

		}

		
		
		
	}
	// 	// cardValue = Number(hand[i].slice(0,-1));
	// 	total += cardValue;
	// }
	// update the DOM with the new total 
	var classSelector = '.'+who+'-total-number';
	$(classSelector).text(total);
	return total;
}








