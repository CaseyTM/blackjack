// Insta DOM load
$(document).ready(function(){
		// GLOBALS
var theDeck = [];
var playersHand = [];
var dealersHand = [];
	createDeck();

		$('.deal-button').click(function(){
			// console.log(this);
		
			shuffleDeck();
			playersHand.push(theDeck[0]);
			dealersHand.push(theDeck[1]);
			playersHand.push(theDeck[2]);
			dealersHand.push(theDeck[3]);
			// put the first card in the players hand 
			placeCard(playersHand[0], 'player', 'one');
			placeCard(playersHand[1], 'player', 'two');
			placeCard(dealersHand[0], 'dealer', 'one');
			placeCard(dealersHand[1], 'dealer', 'two');

			calculateTotal('player', playersHand);
			calculateTotal('dealer', dealersHand);

		});


		$('.hit-button').click(function(){
			
		});






		$('.stand-button').click(function(){
				// console.log(this);
		});

	function createDeck(){
		// fill the deck with 52 cards, 4 suits H,S,D,C
		// 1-13 (11= J 12 = Q, 13 = K)
		var suits = ['h','s','d','c'];
		// LOOP THROUGH ALL 4 SUITS 
		for(let s = 0 ; s < suits.length; s++){
			// LOOP THROUGH ALL 13 CARDS FOR EACH SUITS
			for(let c = 1; c <= 13; c++){
				theDeck.push(c+suits[s]);

			}
		}
	}


	function shuffleDeck(){
		
		for(let i = 0; i < 10000; i ++){
			var card1toSwitch = Math.floor(Math.random()* theDeck.length);
			var card2toSwitch = Math.floor(Math.random()* theDeck.length);
			var temp = theDeck[card1toSwitch];
			theDeck[card1toSwitch] = theDeck[card2toSwitch];
			theDeck[card2toSwitch] = temp;

		}
		// console.log(theDeck)
	}
	function placeCard(whatCard, who, whichSlot){
		var classToTarget = '.' +who+ '-cards .card-' +whichSlot;
		// console.log(classToTarget)
		$(classToTarget).html('<img src="images/'+whatCard+'.png">');
	}

	function calculateTotal(who, theirHand){
		var cardValue = 0;
		var total = 0;
		for(let i = 0 ; i < theirHand.length; i ++){
			cardValue = Number(theirHand[i].slice(0, -1));
			console.log(cardValue);
			total += cardValue;

		}
		var classToTarget = '.'+who+'-total-number';
		$(classToTarget).text(total);
	}



});
















