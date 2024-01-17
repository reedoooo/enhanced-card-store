// var resultsPerPage = 9;
// // let subtitle = document.getElementById('subtitle');
// var setsFilterBar = document.getElementById('setsFilterBar');
// var cardResults = document.querySelector('#cardResults');
// var miniCardResults = document.querySelector('#miniCardResults');
// var cardimage;
// var images;
// var filteredResults;
// var url = window.location.href;
// var currentURL = window.location.hash;
// var host = window.location.host + '/';
// var fullURL = host + currentURL;
// var pathname;
// var hash;
// var fetchinfo;
// var newCards = false;
// var fetchRandom = false;
// var moreFilteredResults = false;
// var banlist = 'tcg';

// function copyCardID(e) {
//   e = e || window.event;
//   e = e.target || e.srcElement;
//   //console.log('cardArchetype :' +e.id)
//   cardID = e.id;
//   // document.getElementById('bodyAdv').classList.add('d-none')
//   cardShareURL = `${host}#/cardID/${cardID}`;

//   copy(cardShareURL);
// }

// // Ejemplo implementando el metodo POST:
// async function addToCollection(set_code) {
//   // Opciones por defecto estan marcadas con un *
//   const response = await fetch('/addToCollection', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ set_code }), // body data type must match "Content-Type" header
//   });
//   const json = await response.json(); // parses JSON response into native JavaScript objects

//   console.log(json);
//   debugger;
//   if (true) {
//   }
// }

// function copy(text) {
//   var input = document.createElement('textarea');
//   input.innerHTML = text;
//   document.body.appendChild(input);
//   input.select();
//   var result = document.execCommand('copy');
//   document.body.removeChild(input);

//   console.log('link copied ' + result);
//   return result;
// }

// // let moreCardsButton = document.getElementById("moreCardsButton");

// // PARA VER EL PRECIO DE UNA CARTA DENTRO DEL ARRAY "RESULTADOS"
// // results[n].card_sets[0].set_price

// // <button onclick="prompt('Press Ctrl + C, then Enter to copy to clipboard','${fullURL}')">Click to Copy</button>
// // https://codepen.io/quynhhp/pen/bpKgXB
// //https://www.aspforums.net/Threads/517506/Copy-browser-url-to-clipboard-on-button-click-using-JavaScript-and-jQuery/

// $(document).ready(function () {
//   $('#howManyPerPage').change(function () {
//     let element = $(this).find('option:selected');
//     showThisManyCards = element[0].value;
//     resultsPerPage = parseInt(showThisManyCards);
//     //console.log('se van a mostrar '+ resultsPerPage + ' cartas por pagina')
//   });
// });

// function clearScreen() {
//   loadedResults = resultsPerPage;
//   b = 0;
//   moreSetCardsButton.classList.add('d-none');
//   moreNewCardsButton.classList.add('d-none');
//   moreRandomCardsButton.classList.add('d-none');
//   moreBanlistCardsButton.classList.add('d-none');
//   moreSearchedCardsButton.classList.add('d-none');
//   moresSetCardsButton.classList.add('d-none');
//   moreArchetypesCardsButton.classList.add('d-none');
//   moreFilteredCardsButton.classList.add('d-none');
//   moreMiniCardsButton.classList.add('d-none');
//   subtitle.innerHTML = '';
//   setResults.innerHTML = '';
//   cardResults.innerHTML = '';
//   miniCardResults.innerHTML = '';
//   setsFilterBar.classList.add('d-none');
//   if (pathname == '/advancedSearch.html') {
//     advancedSearchBar.classList.add('d-none');
//   }
// }
// function clearScreenForMiniCards() {
//   loadedResults = resultsPerPage;
//   b = 0;
//   moreSetCardsButton.classList.add('d-none');
//   moreNewCardsButton.classList.add('d-none');
//   moreRandomCardsButton.classList.add('d-none');
//   moreBanlistCardsButton.classList.add('d-none');
//   moreSearchedCardsButton.classList.add('d-none');
//   moresSetCardsButton.classList.add('d-none');
//   moreArchetypesCardsButton.classList.add('d-none');
//   moreFilteredCardsButton.classList.add('d-none');
//   moreMiniCardsButton.classList.add('d-none');
//   setResults.innerHTML = '';
//   cardResults.innerHTML = '';
//   miniCardResults.innerHTML = '';
//   setsFilterBar.classList.add('d-none');
// }

// function addToCollectionssss(e) {
//   e = e || window.event;
//   e = e.target || e.srcElement;
//   myCardCollection.push(e.id);
//   cardId = document.getElementById(`${e.id}`);
//   console.log('button was clicked');
// }

// function addToWishlist(e) {
//   e = e || window.event;
//   e = e.target || e.srcElement;
//   myWishlist.push(e.id);
//   cardId = document.getElementById(`${e.id}`);
// }

// function createCard(card) {
//   //console.log(card);
//   id = card.id;
//   name = card.name;
//   //name = name.replace(/\b[a-z]/g,c=>c.toUpperCase())
//   name = name.toUpperCase();
//   fname = card.fname;
//   desc = card.desc;
//   type = card.type;
//   atk = card.atk;
//   def = card.def;
//   level = card.level;
//   race = card.race;
//   attribute = card.attribute;
//   link = card.link;
//   linkmarker = card.linkmarker;
//   linkvale = card.linkval;
//   scale = card.scale;
//   set = card.set;
//   archetype = card.archetype;
//   if (archetype == undefined) {
//     archetype = '-';
//   }

//   banlist_info = card.banlist;
//   misc_info = card.misc_info;

//   if (misc_info === undefined) {
//     releaseText = "This card hasn't been released yet";
//   } else {
//     if (misc_info[0].tcg_date == undefined) {
//       releaseText = `This card was released ${misc_info[0].ocg_date} in OCG but it's not available in TCG`;
//     }
//     if (misc_info[0].tcg_date !== undefined) {
//       releaseText = `This card was released ${misc_info[0].ocg_date} in OCG and ${misc_info[0].tcg_date} in TCG and it's available in these sets: `;
//     }
//     if (misc_info[0].tcg_date == undefined && misc_info[0].ocg_date == undefined) {
//       releaseText = "This card hasn't been released yet";
//     }
//   }

//   // if (card.card_images === undefined) {cardImage="/img/noImage.jpg"} else{cardImage= card.card_images[0].image_url}
//   if (card.card_images === undefined) {
//     cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
//   } else {
//     cardImage = card.card_images[0].image_url;
//   }
//   // if (images===false) {cardImage="/img/dontLoadImages.jpg"}
//   if (images === false) {
//     cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
//   }
//   card_prices = card.card_prices;

//   card_sets = [card.card_sets];
//   /*
// 		console.log(card_sets.sort(function(a, b){
// 			var priceA=a.set_price, priceB=b.set_price
// 			if (priceA < priceB) //sort string ascending
// 				return -1 
// 			if (priceA > priceB)
// 				return 1
// 			return 0 //default return value (no sorting)
// 			}))
// 	*/

//   function sortCardSets() {
//     card_sets.sort(function (a, b) {
//       return parseFloat(a.set_price) - parseFloat(b.set_price);
//     });
//     // console.log(card_sets)
//     /*
// 		card_sets.sort(function(a, b){
// 		var priceA=a.set_price, priceB=b.set_price
// 		if (priceA < priceB) //sort string ascending
// 			return -1 
// 		if (priceA > priceB)
// 			return 1
// 		return 0 //default return value (no sorting)
// 		})
// 		*/
//   }
//   /*
// 	for (var n = 0; n = card_sets.length ; n++) {
// 	card_sets.sort((a, b) => {
// 		if (a[n].set_price < b[n].set_price)
// 		  return -1;
// 		if (a[n].set_price > b[n].set_price)
// 		  return 1;
// 		return 0;
// 	  })
// 	}
// console.log(card_sets.sort((a, b) => {
// 	if (a.set_price < b.set_price)
// 	  return -1;
// 	if (a.set_price > b.set_price)
// 	  return 1;
// 	return 0;
//   }))
	
// 	 */
//   banlist_info = card.banlist_info;
//   // console.log(card_sets[0])

//   //console.log(banlist_info)

//   if (def === undefined || def == null) {
//     def = ' - ';
//   }
//   if (atk === undefined || atk == null) {
//     atk = ' - ';
//   }
//   if (attribute === undefined) {
//     attribute = ' - ';
//   }
//   if (level === undefined) {
//     level = 'LINK -' + card.linkval;
//   }

//   if (card_prices !== undefined) {
//     //cardPrice = ('Amazon price : '+ card_prices[0].amazon_price + '<br>CardMarket price : ' +  card_prices[0].cardmarket_price+ '<br>Ebay price : ' +  card_prices[0].ebay_price + '<br>TCGPlayer price : ' +   card_prices[0].tcgplayer_price +'<br>')
//   } else {
//     cardPrice = '';
//   }

//   if (banlist_info == undefined) {
//     banlist_info = 'Unlimited';
//   }

//   // if (banlist_info.ban_tcg !== undefined ){
//   // 	banlist_info = banlist_info.ban_tcg;
//   // }

//   // // if (banlist_info.ban_ocg !== undefined ){
//   // 	banlist_info = banlist_info.ban_ocg;
//   // }

//   // if (banlist_info.ban_goat !== undefined ){
//   // 	banlist_info = banlist_info.ban_goat;
//   // }

//   if (banlist == 'tcg') {
//     banlist_info = banlist_info.ban_tcg;
//     if (banlist_info == undefined) {
//       banlist_info = 'Unlimited';
//     }
//   }

//   if (banlist == 'ocg') {
//     banlist_info = banlist_info.ban_ocg;
//   }

//   if (banlist == 'goat') {
//     banlist_info = banlist_info.ban_goat;
//   }

//   //console.log(banlist_info)
//   //console.log(banlist)

//   if (type == 'Spell Card') {
//     attribute = 'SPELL';

//     level = '-';
//   }
//   if (type == 'Trap Card') {
//     attribute = 'TRAP';
//     level = '-';
//   }

//   if (type == 'Trap Card' || type == 'Spell Card') {
//     cardResults.innerHTML += `
// 			<div>
// 				<div class="card cards" class='showCardInfo' style="width: 100%;">
// 					<div class="cardGrid" >
// 						<div class"cardGridIMG"> 

// 							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
// 							<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
// 							</button>
  
						
// 						</div>
// 							<div class='cardInfo'  id='${name}'>
// 								<h5>${name}</h5>
// 								<img src="/img/${banlist_info}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/img/typeOfCard/${type}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/img/race/${race}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID : <span onclick='getIdCode(this.id)'> <a href="#" class='getIdCode' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span> </span><br>

								
// 							<p class="cardDescription">${desc}</p>


							
// 							<p id="${id}_setsTitles"> ${releaseText}</p>
// 							<table id="${id}_setTable" >
// 									<tr>
// 									<th>Set Name</th>
// 									<th>Rarity</th>
// 									<th>Code</th>
// 									<th>Price</th>
// 									</tr>
// 								</table>
// 								<br>
// 								<div id='prices'>
				
// 								</div>
// 							</div>
// 							<div class='shareButton'>

// 							<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span> <br><br>
						
// 							</div>
// 						</div>
	  		
// 					</div>
// 				</div>
				
				

// 				<div class="miniCard" class="card" class="col-sm" >
		

// 		<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
// 			<div class="modal-dialog modal-dialog-centered" role="document">
// 				<div class="modal-content modalImage">
// 					<div class="modal-header">
					
// 					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 					<span aria-hidden="true">&times;</span>
// 					</button>
// 						<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
						
// 					</div>
					
// 					<div class="modal-footer">
// 					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
// 					</div>
 
// 						</div>
// 					</div>
// 				</div>


// 			</div>
	
// 		`;
//   } else {
//     let levelOrRankOrLink = 'level';

//     if (type == 'XYZ Monster' || type == 'XYZ Pendulum Effect Monster') {
//       levelOrRankOrLink = 'rank';
//     }

//     if (type == 'Link Monster') {
//       levelOrRankOrLink = 'link';
//     }

//     cardResults.innerHTML += `
// 		<div>
// 		<div class="card cards" class='showCardInfo' style="width: 100%;">
// 		<div class="cardGrid" >
		
// 		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
// 			<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
// 			</button>

// 			<div class='cardInfo'  id='${name}'>
			
// 				<h5>${name}</h5>
// 				<img src="/img/${banlist_info}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/img/typeOfCard/${type}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/img/race/${race}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/img/attribute/${attribute}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/img/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'>  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/img/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/img/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID : <span onclick='getIdCode(this.id)'> <a href="#" class='getIdCode' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span> </span><br>
			
// 				<p class="cardDescription">${desc}</p>
// 				<p id="${id}_setsTitles"> ${releaseText}</p>
// 				<table id="${id}_setTable" >
// 				<tr>
// 				<th>Set Name</th>
// 				<th>Rarity</th>
// 				<th>Code</th>
// 				<th>Price</th>
// 				</tr>
// 				</table>
// 				<br>
// 				<div id='prices'>
// 				</div>
// 			</div>
// 			<div class='shareButton'>

// 			<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span> <br><br>
		
// 			</div>
// 		</div>
	  	
// 		</div>
// 	</div>
		
// 	<div class="miniCard" class="card" class="col-sm" >
			

// 			<div class="modal fade modalCardImage" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
// 				<div class="modal-dialog modal-dialog-centered" role="document">
// 					<div class="modal-content modalImage">
// 						<div class="modal-header">
						
// 						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 						<span aria-hidden="true">&times;</span>
// 						</button>
// 							<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
							
// 						</div>
					
// 						<div class="modal-footer">
// 						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

	
	
// 	</div>
	
// 		`;
//   }

//   if (card_sets[0] !== undefined) {
//     //sortCardSets();

//     card_sets.forEach(function (setName, i) {
//       for (var b = 0; b < card_sets[0].length; b++) {
//         set_code = setName[b].set_code;
//         set_name = setName[b].set_name;
//         set_price = setName[b].set_price;
//         set_rarity = setName[b].set_rarity;
//         //console.log(set_code)
//         document.getElementById(id + '_setTable').innerHTML += `
// 		   <div onclick='addToCollection(this.id)' style='display:inline'>
			
		 


// 		   <tr>
// 		   <td><span onclick='cardSet(this.id)'>  <a id="${setName[b].set_name}" class='getBySet' href="#"> ${setName[b].set_name} </a></span>  </td>
// 		   <td class="setRarity">  ${set_rarity}  </td>
// 		   <td class="setCode"><span onclick='cardSet(this.id)'>  ${setName[b].set_code}  </span>  </td> 
// 		   <td class="setPrice"> $${setName[b].set_price}  </td>
// 		   <td class="addButton"> 
		   
// 		   <button type="button" onclick="addToCollection('${set_code}')" >Add to my collection</button>
// 		   <!--<form method="post" action="/addToCollection" style="display: inline">
// 		   <input type="hidden" name="cardSetId"  value="${set_code}">
// 		   <input type="submit" name="submit" value="Collection" style="display: inline" >
// 		   </form>-->

// 	   </tr>
					
			






// 		   </div>
// 		  `;
//         //   $(document).ready(function(){
//         // 	$('[data-toggle="tooltip"]').tooltip();
//         //   })
//       }
//     });
//   } else {
//     document.getElementById(id + '_setTable').innerHTML = ' ';
//     //document.getElementById(`${id}_setsTitles`).innerHTML=" ";
//     document.getElementById(id + '_setTable').innerHTML += ` `;
//   }
// }

// function createSet(set, b) {
//   var visibleSet = Object.values(set);
//   setCode = visibleSet[1];
//   setQuantity = visibleSet[2];
//   setName = visibleSet[0];

//   setImage = 'img/noimage.jpg';
//   setResults.innerHTML += `
// 	<div class="sets" id='${setName}'>
// 	<div class="setGrid" >
// 		<div class='cardInfo'>
// 		<span onclick='cardSet(this.id)'><h5>  <a  style="cursor: pointer" id="${setName}" class='getBySet' href="#"> ${setName} </a> <br> ${setQuantity} cards in this set // Set Code ${setCode}  </h5></span> 
// 		</div>
	  
// 	</div>
// 	</div>
	
// 	`;
// }
// function createArchetype(set, b) {
//   var visibleSet = Object.values(set);
//   setQuantity = visibleSet[1];
//   archetype = visibleSet[0];
//   setImage = 'img/noimage.jpg';
//   setResults.innerHTML += `
// 	<div class="archetype" id='${archetype}'>
// 	<div class="archetypeGrid" >
// 		<div class='cardInfo'>
// 		<span onclick='cardArchetype(this.id)'><h5>  <a id="${archetype}" class='getBySet' href="#"> ${archetype} </a> </h5></span> 
// 		</div>
	  
// 	</div>
// 	</div>
	
// 	`;
// }

// function createMiniCards() {
//   clearScreenForMiniCards();

//   if (newCards == true) {
//     moreMiniCardsButton.classList.add('d-none');
//     moreNewCardsButton.classList.add('d-none');

//     for (b = 0; b <= 20; b++) {
//       createMiniCard(newCardsResults[0][b]);
//     }
//     fetchinfo = true;

//     if ((fetchinfo = true)) {
//       fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new')
//         .then((cardInfo) => cardInfo.json())
//         .then((data) => {
//           //console.log(data)
//           data = data;
//           results = data;
//           // console.log(results)
//         });

//       fetchinfo = false;

//       // console.log('fetchinfo='+fetchinfo)
//     }
//   }

//   if (results.data == undefined) {
//     if (newCards == true) {
//       moreMiniCardsButton.classList.add('d-none');
//       // console.log('newcards=true & results.data=undefined')
//       for (b = 0; b <= 20; b++) {
//         createMiniCard(newCardsResults[0][b]);
//       }
//     } else {
//       // console.log('newcards != true    '+newCards )
//       for (var b = 0; b < resultsPerPage; b++) {
//         //console.log(data[b])
//         createMiniCard(results[0][b]);
//       }
//     }
//   } else {
//     if (typeof filteredResults != 'undefined' || filteredResults != null) {
//       // console.log('if (typeof filteredResults != undefined || filteredResults != null)')
//       for (var b = 0; b < resultsPerPage; b++) {
//         //console.log(data[b])
//         createMiniCard(filteredResults[b]);
//       }
//     } else {
//       // console.log('results.data!=undefined')
//       for (var b = 0; b < resultsPerPage; b++) {
//         createMiniCard(results.data[b]);
//       }
//     }
//   }

//   // if (fetchinfo = true ){
//   //     fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?&misc=yes&sort=new")
//   //     .then( cardInfo => cardInfo.json() )
//   //     .then(data => {
//   // 		//console.log(data)
//   // 		data=data
//   // 		results = data;
//   // 		// console.log(results)
//   // 	 });

//   // 	moreNewCardsButton.classList.add("d-none");
//   // 	fetchinfo=false

//   // 	// console.log('fetchinfo='+fetchinfo)
//   // 	}
// }

// function createMiniCard(card) {
//   id = card.id;
//   name = card.name;
//   name = name.toUpperCase();
//   fname = card.fname;
//   desc = card.desc;
//   type = card.type;
//   atk = card.atk;
//   def = card.def;
//   level = card.level;
//   race = card.race;
//   attribute = card.attribute;
//   link = card.link;
//   linkmarker = card.linkmarker;
//   linkvale = card.linkval;
//   scale = card.scale;
//   set = card.set;
//   archetype = card.archetype;
//   if (archetype == undefined) {
//     archetype = '-';
//   }

//   banlist_info = card.banlist;
//   misc_info = card.misc_info;

//   if (misc_info === undefined) {
//     releaseText = "This card hasn't been released yet";
//   } else {
//     if (misc_info[0].tcg_date == undefined) {
//       releaseText = `This card was released ${misc_info[0].ocg_date} in OCG but it's not available in TCG`;
//     }
//     if (misc_info[0].tcg_date !== undefined) {
//       releaseText = `This card was released ${misc_info[0].ocg_date} in OCG and ${misc_info[0].tcg_date} in TCG and it's available in these sets: `;
//     }
//     if (misc_info[0].tcg_date == undefined && misc_info[0].ocg_date == undefined) {
//       releaseText = "This card hasn't been released yet";
//     }
//   }

//   if (card.card_images === undefined) {
//     cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
//   } else {
//     cardImage = card.card_images[0].image_url;
//   }

//   if (images === false) {
//     cardImage = `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`;
//   }
//   card_prices = card.card_prices;

//   card_sets = [card.card_sets];

//   function sortCardSets() {
//     card_sets.sort(function (a, b) {
//       return parseFloat(a.set_price) - parseFloat(b.set_price);
//     });
//     // console.log(card_sets)
//   }

//   banlist_info = card.banlist_info;
//   // console.log(card_sets[0])

//   //console.log(banlist_info)

//   if (def === undefined || def == null) {
//     def = ' - ';
//   }
//   if (atk === undefined || atk == null) {
//     atk = ' - ';
//   }
//   if (attribute === undefined) {
//     attribute = ' - ';
//   }
//   if (level === undefined) {
//     level = 'LINK -' + card.linkval;
//   }

//   if (card_prices !== undefined) {
//     //cardPrice = ('Amazon price : '+ card_prices[0].amazon_price + '<br>CardMarket price : ' +  card_prices[0].cardmarket_price+ '<br>Ebay price : ' +  card_prices[0].ebay_price + '<br>TCGPlayer price : ' +   card_prices[0].tcgplayer_price +'<br>')
//   } else {
//     cardPrice = '';
//   }

//   if (banlist_info == undefined) {
//     banlist_info = 'Unlimited';
//   }

//   if (banlist == 'tcg') {
//     banlist_info = banlist_info.ban_tcg;
//     if (banlist_info == undefined) {
//       banlist_info = 'Unlimited';
//     }
//   }

//   if (banlist == 'ocg') {
//     banlist_info = banlist_info.ban_ocg;
//   }

//   if (banlist == 'goat') {
//     banlist_info = banlist_info.ban_goat;
//   }

//   if (type == 'Spell Card') {
//     attribute = 'SPELL';

//     level = '-';
//   }
//   if (type == 'Trap Card') {
//     attribute = 'TRAP';
//     level = '-';
//   }

//   if (type == 'Trap Card' || type == 'Spell Card') {
//     miniCardResults.innerHTML += `		
		
// 		<div class="miniCard" class="card" class="col-sm" >
// 		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
// 		<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
// 		</button>

// 		<div class="modal fade cardModal" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
// 			<div class="modal-dialog modal-dialog-centered" role="document">
// 				<div class="modal-content">
// 					<div class="modal-header">

// 						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 						<span aria-hidden="true">&times;</span>
// 						</button>

// 						<img src="${cardImage}" class="card-img-bottom cardImages center" id='${fname}' alt="${name}" >
						
// 					</div>
// 					<div class="modal-body">
// 						<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
// 									<img src="/img/${banlist_info}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/img/typeOfCard/${type}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText"> ${type} </span> / <img src="/img/race/${race}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"> <span class="cardInfoText">${race}</span> /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' class="close" data-dismiss="modal" aria-label="Close" id='${archetype}'>  ${archetype}  </a></span>  / <span class="cardInfoText"> Card ID : <span onclick='getIdCode(this.id)'> <a href="#" class='getIdCode' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span> </span><br>
								
// 							<p class="cardDescription">${desc}</p>
// 							<p id="${id}_setsTitles"> ${releaseText}</p>
// 							<table id="${id}_setTable" >
// 										<tr>
// 										<th>Set Name</th>
// 										<th>Rarity</th>
// 										<th>Code</th>
// 										<th>Price</th>
// 										</tr>
// 									</table>
// 									<br>
// 									<div id='prices'>
					
// 									</div>
// 								</div>
							
// 								<div class="modal-footer">
// 								<div class='shareButton'>
// 								<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span>
// 								</div>
// 								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

				
// 		`;
//   } else {
//     let levelOrRankOrLink = 'level';

//     if (type == 'XYZ Monster' || type == 'XYZ Pendulum Effect Monster') {
//       levelOrRankOrLink = 'rank';
//     }

//     if (type == 'Link Monster') {
//       levelOrRankOrLink = 'link';
//     }

//     miniCardResults.innerHTML += `
// 		<div class="miniCard" class="card" class="col-sm" >
// 			<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalID${id}">
// 			<img src="${cardImage}" class="card-img-bottom cardImages" id='${fname}' alt="${name}" >
// 			</button>

// 			<div class="modal fade cardModal" id="ModalID${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
// 				<div class="modal-dialog modal-dialog-centered" role="document">
// 					<div class="modal-content">
// 						<div class="modal-header">

// 							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 								<span aria-hidden="true">&times;</span>
// 							</button>

// 							<img src="${cardImage}" class="card-img-bottom cardImages center" id='${fname}' alt="${name}" >
							
							
// 						</div>
// 						<div class="modal-body">
// 							<h5 class="modal-title" id="exampleModalLongTitle">${name}</h5>
// 							<img src="/img/${banlist_info}.png" style="width : 18px" class="card-img-bottom" alt="Ban Status"> <span class="cardInfoText">${banlist_info}</span>  /  <img src="/img/typeOfCard/${type}.jpg" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${type} </span>/ <img src="/img/race/${race}.png" style="width : 20px" class="card-img-bottom" alt="Race Icon"><span class="cardInfoText"> ${race}</span> / <img src="/img/attribute/${attribute}.png" style="width : 20px" class="card-img-bottom" alt="Attribute Icon"><span class="cardInfoText"> ${attribute}</span> /  <img src="/img/${levelOrRankOrLink}.png" style="width : 20px" class="card-img-bottom" alt="Level Icon">  ${level} /<span class="cardInfoText"> Archetype : </span><span onclick='cardArchetype(this.id)'> <a href="#" class='getByArchetype' id='${archetype}'  class="close" data-dismiss="modal" aria-label="Close">  ${archetype}  </a></span>  /  <span class="cardInfoText"><b> ATK </b>: </span><img src="/img/attack.png" style="width : 18px" class="card-img-bottom" alt="Atk Icon"> ${atk}  /  <span class="cardInfoText"><b> DEF </b>: </span><img src="/img/defense.png" style="width : 18px" class="card-img-bottom" alt="Def Icon"> ${def} /<span class="cardInfoText">  Card ID : <span onclick='getIdCode(this.id)'> <a href="#" class='getIdCode' class="close" data-dismiss="modal" aria-label="Close" id='${id}'>  ${id}  </a></span> </span><br>
 
// 							<p class="cardDescription">${desc}</p>
// 							<p id="${id}_setsTitles"> ${releaseText}</p>
// 							<table id="${id}_setTable" >
// 								<tr>
// 								<th>Set Name</th>
// 								<th>Rarity</th>
// 								<th>Code</th>
// 								<th>Price</th>
// 								</tr>
// 							</table>
// 							<br>
// 							<div id='prices'>
			
// 							</div>
// 						</div>

						
// 						<div class="modal-footer">
// 						<div class='shareButton'>
// 						<span onclick='copyCardID(this.id)'><button class=js-copy-card-url-${cardID} class='copyCardID' data-toggle="tooltip" data-placement="bottom" title="Copy card link" class="close" data-dismiss="modal" aria-label="Close" id='${id}'> <i id='${id}' class="fa fa-share-square-o" aria-hidden="true"></i> </button></span> 
// 						</div>
// 						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

	
// 		`;
//   }

//   moreMiniCardsButton.classList.remove('d-none');

//   if (card_sets[0] !== undefined) {
//     //sortCardSets();

//     card_sets.forEach(function (setName, i) {
//       for (var b = 0; b < card_sets[0].length; b++) {
//         set_code = setName[b].set_code;
//         set_name = setName[b].set_name;
//         set_price = setName[b].set_price;
//         set_rarity = setName[b].set_rarity;
//         //console.log(set_code)
//         document.getElementById(id + '_setTable').innerHTML += `
// 		   <div onclick='addToCollection(this.id)' style='display:inline'>
			
		 


	
// 		   <tr>
// 		   <td><span onclick='cardSet(this.id)'>  <a id="${setName[b].set_name}" class='getBySet' href="#"> ${setName[b].set_name} </a></span>  </td>
// 		   <td class="setRarity">  ${set_rarity}  </td>
// 		   <td class="setCode"><span onclick='cardSet(this.id)'>  ${setName[b].set_code}  </span>  </td> 
// 		   <td class="setPrice"> $${setName[b].set_price}  </td>
// 		   <td class="addButton"> 
		   
// 		   <form method="post" action="/addToCollection" style="display: inline">
// 		   <input type="hidden" name="cardSetId"  value="${set_code}">
// 		   <input type="submit" name="submit" value="Collection" style="display: inline" >
// 		   </form>

// 	  		</tr>
					
			

			
			
			
			





// 		   </div>
// 		  `;
//         //   $(document).ready(function(){
//         // 	$('[data-toggle="tooltip"]').tooltip();
//         //   })
//       }
//     });
//   } else {
//     document.getElementById(id + '_setTable').innerHTML = ' ';
//     //document.getElementById(`${id}_setsTitles`).innerHTML=" ";
//     document.getElementById(id + '_setTable').innerHTML += ` `;
//   }
// }

// var loadedResults = resultsPerPage;

// function getMoreMiniCards(search) {
//   if (fetchRandom == true) {
//     var moreResults = loadedResults + 9;

//     for (var i = loadedResults; i < moreResults; i++) {
//       where = 'https://db.ygoprodeck.com/api/v7/randomcard.php';
//       fetch(where)
//         .then((cardInfo) => cardInfo.json())
//         .then((data) => {
//           //console.log(data)
//           results[0].push(data);
//           createMiniCard(data);
//         });
//     }
//   }

//   if (filteredResults) {
//     var moreResults = loadedResults + 24;
//     for (b = loadedResults; b < moreResults; b++) {
//       if (b >= results.data.length) {
//         console.log('No more cards!');
//         moreMiniCardsButton.classList.add('d-none');
//         return;
//       } else {
//         createMiniCard(filteredResults[b]);
//         loadedResults++;
//       }
//     }
//   }

//   if (newCards == true) {
//     console.log('newcardstrue fetchinfo=' + fetchinfo);

//     moreNewCardsButton.classList.add('d-none');

//     var moreResults = loadedResults + 24;

//     for (b = loadedResults; b < moreResults; b++) {
//       if (b >= results.data.length) {
//         console.log('No more cards!');
//         moreMiniCardsButton.classList.add('d-none');
//         return;
//       } else {
//         createMiniCard(results.data[b]);
//         console.log('este');
//         loadedResults++;
//       }
//     }
//   }

//   // if (moreFilteredResults == true){
//   // 	var moreResults = loadedResults+24;
//   // 	for (b = loadedResults; b < moreResults ; b++) {
//   // 		if (b >= results.data.length){
//   // 			console.log('No more cards!');
//   // 			moreMiniCardsButton.classList.add("d-none");
//   // 			return}
//   // 		else {
//   // 		createMiniCard(filteredResults[b])
//   // 		loadedResults++
//   // 		}
//   // 	}}

//   if (fetchRandom == false && moreFilteredResults == false && newCards == false) {
//     var moreResults = loadedResults + 24;
//     for (b = loadedResults; b < moreResults; b++) {
//       if (b >= results.data.length) {
//         console.log('No more cards!');
//         moreMiniCardsButton.classList.add('d-none');
//         return;
//       } else {
//         createMiniCard(results.data[b]);
//         console.log('oeste');
//         loadedResults++;
//       }
//     }
//   }
// }
// // <h5>Set Name : <span onclick='cardSet(this.id)'> <a href="#" class='getBySet'>${setName}</a></span> <br> ${setQuantity} cards in this set</h5>
