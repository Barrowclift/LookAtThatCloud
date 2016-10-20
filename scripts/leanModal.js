// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

(function($) {
	names = ["Natalie",
             "Tara",
             "Kari",
             "Lauren",
             "Lauren",
             "Meggie",
             "Rachel",
             "Sarah",
             "Justin",
	         "Lucas",
	         "Doug",
	         "John",
	         "Marc",
	         "Michael",
	         "Richie",
	         "Ryan"]
	descriptions = ["Cousin, Maid of Honor",
	                "Cousin, Maid of Honor",
	                "Childhood Friend & Soon-to-be Sister-in-Law, Bridesmaid",
	                "Childhood Friend, Bridesmaid",
	                "College Friend, Bridesmaid",
	                "Soon-to-be Sister-in-Law, Bridesmaid",
	                "Childhood Friend, Bridesmaid",
	                "College Roommate, Bridesmaid",
	                "Brother, Best Man",
	                "Brother, Best Man",
	                "Childhood Friend, Groomsman",
	                "College Friend, Groomsman",
	                "Brother of the Bride, Groomsman",
	                "Brother of the Bride, Groomsman",
	                "College Friend, Groomsman",
	                "College Friend, Groomsman"]
	ids = ["natalie",
	       "tara",
	       "kari",
	       "lauren-childhood-friend",
	       "lauren-college-friend",
	       "meggie",
	       "rachel",
	       "sarah",
	       "justin",
	       "lucas",
	       "doug",
	       "john",
	       "marc",
	       "michael",
	       "richie",
	       "ryan"]
	dividerIndex = 8
	youllFindUs = ["Planning extravagant days of fun. Calling the other for advice.",
	               "Asking Uncle Todd what we should do with the rest of our lives.",
	               "Hanging out on the deck of the cottage, playing Rumikub and listening to music.",
	               "Cracking Jokes. Painting crawl spaces.",
	               "Swapping travel tips. Squeezing in a run. Raiding each other's closets.",
	               "Playing with Willow. Talking about wedding planning. Sippin' tea. Going on walks.",
	               "Jamming to Rod Tuff Curls and the Bench Press. Encouraging one another to not give up.",
	               "Dancing at Milwaukee dive bars. Drinking coffee and talking about life.",
	               "Brother and brother of the other brother of the groom",
	               "Brother of the groom and brother of the other brother of the groom",
	               "?",
	               "?",
	               "Brother of the bride and brother of the other brother of the bride",
	               "Brother of the bride and brother of the other brother of the bride",
	               "?",
	               "?"]
	favoriteMemory = ["Playing school and actually doing the homework we assigned ourselves... NERD ALERT!",
	               "Making up dances to Real McCoy songs, dancing to oldies in Wisconsin (Jeremiah was a bullfrog... BA DUM BUM)",
	               "Stumbling upon the letters Kari wrote me during our years as pen pals, letters full of references to our childhood memories. Who could forget dodging the now-infamous Orangey and Porky?",
	               "The annual bike ride to the Popcorn Shop in Wheaton. Lauren's birthday parties, where we would camp out in her backyard and play \"Girls Just Wanna Have Fun\" on repeat.",
	               "Our trip to Nashville! Dressing up for the annual \"Kegs and Eggs\".",
	               "New Years Eve, 2013... the \"night it all began\".",
	               "Aside from our 8 years together at St. Pats, hiking to the Fairy Ponds in Scotland.",
	               "Spending our Spring Break building for Habitat for Humanity.",
	               "?1",
	               "?2",
	               "?3",
	               "?4",
	               "?5",
	               "?6",
	               "?7",
	               "?8"]
	mostLikelyTo = ["Be holding a coffee in one hand and a beer in the other. This 4th year medical student is working her tail off.",
	               "Ask you if your mountains are blue while tossing you a Coors Light.",
	               "Give us Phase 10 as a wedding gift.",
	               "Bust out some silly string at the reception.",
	               "Meet me for a crack-of-dawn run the morning of the wedding.",
	               "Lead a prayer before we walk down the aisle.",
	               "Out-jump anyone in a jumping pic. This ballerina-turned-PA student has still got it.",
	               "Hand me floss right before I walk down the aisle. Own the dance floor with her husband, Jim.",
	               "?",
	               "?",
	               "?",
	               "?",
	               "?",
	               "?",
	               "?",
	               "?"]
	var firstTime = true;
	$.fn.extend({
		leanModal: function(options) {
			var defaults = {
				top: 100,
				overlay: 0.5,
				closeButton: null
			};
			var overlay = $("<div id='lean_overlay'></div>");
			$("body").append(overlay);
			options = $.extend(defaults, options);
			return this.each(function() {
				var o = options;
				$(this).click(function(e) {
					var temp = $(this).attr("href");
					var person = temp.split("#bio-")[1]
					var personIndex = ids.indexOf(person);
					var modal_id = "#bio";
					if (firstTime) {
						firstTime = false
						$("#lean_overlay").click(function() {
							close_modal(modal_id)
						});
						$(o.closeButton).click(function() {
							close_modal(modal_id)
						});
						$(o.nextModal).click(function() {
							next_modal(modal_id)
						});
						$(o.previousModal).click(function() {
							previous_modal(modal_id)
						});
					}
					var modal_height = $(modal_id).outerHeight();
					var modal_width = $(modal_id).outerWidth();
					if ($("#lean_overlay").css('display') != "block") {
						$("#lean_overlay").css({
							"display": "block",
							opacity: 0
						});
						$("#lean_overlay").fadeTo(200, o.overlay);
						$(modal_id).css({
							"display": "block",
							"position": "fixed",
							"opacity": 0,
							"z-index": 11000
							// "left": "50%",
							// "margin-left": "-25%",
							// "top": o.top + "px"
						});
						if (mostLikelyTo[personIndex].lastIndexOf("?", 0) === 0) { // Chase's Bios
							if (youllFindUs[personIndex].lastIndexOf("?", 0) === 0) {
								$(modal_id).children(".scroll").children(".youll-find-us").css("display", "none");
							} else {
								$(modal_id).children(".scroll").children(".youll-find-us").css("display", "block");
							}
							$(modal_id).children(".scroll").children(".title1").css("display", "none");
							$(modal_id).children(".scroll").children(".title2").css("display", "none");
							$(modal_id).children(".scroll").children(".title3").css("display", "none");
							$(modal_id).children(".scroll").children(".favorite-memory").css("display", "none");
							$(modal_id).children(".scroll").children(".most-likely-to").css("display", "none");
						} else { //Aimee's Bios
							$(modal_id).children(".scroll").children(".youll-find-us").css("display", "block");
							$(modal_id).children(".scroll").children(".favorite-memory").css("display", "block");
							$(modal_id).children(".scroll").children(".most-likely-to").css("display", "block");
							$(modal_id).children(".scroll").children(".title1").css("display", "block");
							$(modal_id).children(".scroll").children(".title2").css("display", "block");
							$(modal_id).children(".scroll").children(".title3").css("display", "block");
						}
						$(modal_id).children("img").attr("src", "./images/" + person + ".jpg")
						$(modal_id).children(".scroll").children(".name").text(names[personIndex])
						$(modal_id).children(".scroll").children(".description").text(descriptions[personIndex])
						$(modal_id).children(".scroll").children(".youll-find-us").text(youllFindUs[personIndex]);
						$(modal_id).children(".scroll").children(".favorite-memory").text(favoriteMemory[personIndex]);
						$(modal_id).children(".scroll").children(".most-likely-to").text(mostLikelyTo[personIndex]);

						$(modal_id).fadeTo(200, 1);
					}
					$(modal_id)
					e.preventDefault()
				})
			});
			function close_modal(modal_id) {
				$("#lean_overlay").fadeOut(200);
				$(modal_id).css({
					"display": "none"
				})
			}
			function next_modal(modal_id) {
				var currentIndex = favoriteMemory.indexOf($(modal_id).children(".scroll").children(".favorite-memory").text())
				var doIHaveNext = false;
				if (currentIndex >= dividerIndex) { // It's a groomsman
					doIHaveNext = currentIndex < ids.length - 1
				} else {
					doIHaveNext = currentIndex < dividerIndex - 1
				}
				if (doIHaveNext) {
					currentIndex = currentIndex + 1
					if (mostLikelyTo[currentIndex].lastIndexOf("?", 0) === 0) { // Chase's Bios
						if (youllFindUs[currentIndex].lastIndexOf("?", 0) === 0) {
							$(modal_id).children(".scroll").children(".youll-find-us").css("display", "none");
						} else {
							$(modal_id).children(".scroll").children(".youll-find-us").css("display", "block");
						}
						$(modal_id).children(".scroll").children(".title1").css("display", "none");
						$(modal_id).children(".scroll").children(".title2").css("display", "none");
						$(modal_id).children(".scroll").children(".title3").css("display", "none");
						$(modal_id).children(".scroll").children(".favorite-memory").css("display", "none");
						$(modal_id).children(".scroll").children(".most-likely-to").css("display", "none");
					} else { // Aimee's Bios
						$(modal_id).children(".scroll").children(".favorite-memory").css("display", "block");
						$(modal_id).children(".scroll").children(".most-likely-to").css("display", "block");
						$(modal_id).children(".scroll").children(".title1").css("display", "block");
						$(modal_id).children(".scroll").children(".title2").css("display", "block");
						$(modal_id).children(".scroll").children(".title3").css("display", "block");
					}
					$(modal_id).children("img").attr("src", "./images/" + ids[currentIndex] + ".jpg")
					$(modal_id).children(".scroll").children(".name").text(names[currentIndex])
					$(modal_id).children(".scroll").children(".description").text(descriptions[currentIndex])
					$(modal_id).children(".scroll").children(".youll-find-us").text(youllFindUs[currentIndex]);
					$(modal_id).children(".scroll").children(".favorite-memory").text(favoriteMemory[currentIndex]);
					$(modal_id).children(".scroll").children(".most-likely-to").text(mostLikelyTo[currentIndex]);

					var newBioId = ids[currentIndex]
				}
			}
			function previous_modal(modal_id) {
				var currentIndex = favoriteMemory.indexOf($(modal_id).children(".scroll").children(".favorite-memory").text())
				var doIHavePrevious = false
				if (currentIndex >= dividerIndex) { // It's a groosman
					doIHavePrevious = currentIndex - 1 >= dividerIndex
				} else {
					doIHavePrevious = currentIndex > 0
				}
				if (doIHavePrevious) {
					currentIndex = currentIndex - 1;
					$(modal_id).children(".scroll").children(".name").text(names[currentIndex])
					$(modal_id).children(".scroll").children(".description").text(descriptions[currentIndex])
					$(modal_id).children("img").attr("src", "./images/" + ids[currentIndex] + ".jpg")
					$(modal_id).children(".scroll").children(".youll-find-us").text(youllFindUs[currentIndex]);
					$(modal_id).children(".scroll").children(".favorite-memory").text(favoriteMemory[currentIndex]);
					$(modal_id).children(".scroll").children(".most-likely-to").text(mostLikelyTo[currentIndex]);

					var newBioId = ids[currentIndex]
				}
			}
		}
	})
})(jQuery);