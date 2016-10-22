// Necessary for the RSVP form. The default state for the form is unsubmitted
var rsvpFormSubmitted = false

// Constants
var KEY_CODE_0 = 48
var KEY_CODE_9 = 57
var KEY_CODE_LEFT_ARROW = 37
var KEY_CODE_RIGHT_ARROW = 39
var KEY_CODE_ESCAPE = 27
var MIN_NUMBER_OF_GUESTS = 1
var MAX_NUMBER_OF_GUESTS = 5

var INPUT_NAME_ID = "entry.189008425"
var INPUT_EMAIL_ID = "entry.1176921021"
var INPUT_ATTENDEE_COUNT_ID = "entry.1367995216"
var RADIO_BUTTON_ATTEND_ID = "entry.644721739"
var INPUT_PERSON_1_NAME_ID = "entry.1331495851"
var SELECT_PERSON_1_FOOD_ID = "entry.812334325"
var INPUT_PERSON_2_NAME_ID = "entry.1879805707"
var SELECT_PERSON_2_FOOD_ID = "entry.313573241"
var INPUT_PERSON_3_NAME_ID = "entry.407509418"
var SELECT_PERSON_3_FOOD_ID = "entry.530507509"
var INPUT_PERSON_4_NAME_ID = "entry.162839601"
var SELECT_PERSON_4_FOOD_ID = "entry.1440417000"
var INPUT_PERSON_5_NAME_ID = "entry.464247127"
var SELECT_PERSON_5_FOOD_ID = "entry.192316455"
var PERSON_ARRAY = ["",
					INPUT_PERSON_1_NAME_ID,
					INPUT_PERSON_2_NAME_ID,
					INPUT_PERSON_3_NAME_ID,
					INPUT_PERSON_4_NAME_ID,
					INPUT_PERSON_5_NAME_ID]
var BUTTON_SUBMIT_ID = "submit"

var FORM_GROUP_WILL_ATTEND_ID = "will-attend"
var FORM_GROUP_NOT_ATTEND_ID = "not-attend"

var BIO_TAB_VIEW_CLASS = "tabview"
var BIO_SEGMENTED_CONTROL_CLASS = "tablinks"
var PREVIOUS_BIO_MODAL_CONTROL_CLASS = ".previous_modal"
var NEXT_BIO_MODAL_CONTROL_CLASS = ".next_modal"
var CLOSE_BIO_MODAL_CONTROL_CLASS = ".close_modal"

/**
 * @param  {event}
 * @return {Whether or not the event's character code is a number}
 */
function isNumberKey(event) {
	// Obtaining the pressed key code
	var charCode = event.keyCode
	if (event.which) {
		charCode = event.which
	}

	return charCode >= KEY_CODE_0 && charCode <= KEY_CODE_9
}

/**
 * Sanitizes the number of guests the user entered to be within the
 * predefined, acceptable range.
 * @param  {event}
 */
function sanitizeNumberOfGuests(event) {
	if (event.target.value == "") {
		// If nothing was provided, default to the minimum number of guests
		event.target.value = MIN_NUMBER_OF_GUESTS.toString()
		showFoodOptions(event)
	} else {
		var userValue = parseInt(event.target.value);

		// Ensuring the user value is within acceptable ranges, fixing it if it's not
		if (userValue < MIN_NUMBER_OF_GUESTS) {
			event.target.value = MIN_NUMBER_OF_GUESTS.toString()
			showFoodOptions(event)
		} else if (userValue > MAX_NUMBER_OF_GUESTS) {
			event.target.value = MAX_NUMBER_OF_GUESTS.toString()
			showFoodOptions(event)
		}
	}
}

function showFoodOptions(event) {
	if (event.target.value != ""
		&& event.target.value >= MIN_NUMBER_OF_GUESTS
		&& event.target.value <= MAX_NUMBER_OF_GUESTS) {
		// Resetting all food choice inputs to be hidden, only want to show the number that
		// the user denoted would be showing up
		for (var i = 1; i <= parseInt(MAX_NUMBER_OF_GUESTS); i++) {
			document.getElementById("person-"+i.toString()).style.display = "none";
		}

		// Showing only the number of food choice inputs the user denoted would be showing up
		for (var i = 1; i <= parseInt(event.target.value); i++) {
			document.getElementById("person-"+i.toString()).style.display = "block";
		}

		enableSubmissionButtonIfReady()
	}
}

/**
 * Checks all required form inputs to see if they're all provided.
 * If they are, then the submission button is enabled. If they're not,
 * then the submission button is disabled.
 * @param  {event}
 */
function enableSubmissionButtonIfReady(event) {
	if (document.getElementById(INPUT_NAME_ID).value != ""
	 && document.getElementById(INPUT_EMAIL_ID).value != "") {
		if (document.getElementById(RADIO_BUTTON_ATTEND_ID).checked) {
			var attendeeCount = document.getElementById(INPUT_ATTENDEE_COUNT_ID).value
			for (var i = 1; i <= attendeeCount; i++) {
				if (document.getElementById(PERSON_ARRAY[i]).value == "") {
					document.getElementById(BUTTON_SUBMIT_ID).disabled = true;
					return;
				}
			}
			document.getElementById(BUTTON_SUBMIT_ID).disabled = false;

			// if ((document.getElementById(INPUT_PERSON_1_NAME_ID).style.display === "block"
			// 	       && document.getElementById(INPUT_PERSON_1_NAME_ID).value != "")
			//  && (document.getElementById(INPUT_PERSON_2_NAME_ID).style.display === "block"
			// 	       && document.getElementById(INPUT_PERSON_2_NAME_ID).value != "")
			//  && (document.getElementById(INPUT_PERSON_3_NAME_ID).style.display === "block"
			// 	       && document.getElementById(INPUT_PERSON_3_NAME_ID).value != "")
			//  && (document.getElementById(INPUT_PERSON_4_NAME_ID).style.display === "block"
			// 	       && document.getElementById(INPUT_PERSON_4_NAME_ID).value != "")
			//  && (document.getElementById(INPUT_PERSON_5_NAME_ID).style.display === "block"
			// 	       && document.getElementById(INPUT_PERSON_5_NAME_ID).value != "")) {
			// 	document.getElementById(BUTTON_SUBMIT_ID).disabled = false;
			// } else {
			// 	document.getElementById(BUTTON_SUBMIT_ID).disabled = true;
			// }
		} else {
			document.getElementById(BUTTON_SUBMIT_ID).disabled = false;
		}
	} else {
		document.getElementById(BUTTON_SUBMIT_ID).disabled = true;
	}
}

/**
 * Shows/hides two different form groups depending on whether or not
 * the user can attend the wedding. After all, we can't have people
 * that can't make it choosing what they want to eat!
 */
$(document).ready(function(){
	$('input[type=radio]').click(function() {
		if (this.value === 'no') {
			document.getElementById(FORM_GROUP_WILL_ATTEND_ID).style.display = "none";
			document.getElementById(FORM_GROUP_NOT_ATTEND_ID).style.display = "block";
		} else {
			document.getElementById(FORM_GROUP_WILL_ATTEND_ID).style.display = "block";
			document.getElementById(FORM_GROUP_NOT_ATTEND_ID).style.display = "none";
		}
	});
});

/**
 * Hides all tabbed views and displays only the one that's currently
 * selected by the segmented control.
 */
function switchBioGroup(event, bioGroup) {
	var i, tabview, tablinks;

	// Hide all tabbed views
	tabview = document.getElementsByClassName(BIO_TAB_VIEW_CLASS);
	for (i = 0; i < tabview.length; i++) {
		tabview[i].style.display = "none";
	}

	// Deactivate all segmented control elements
	tablinks = document.getElementsByClassName(BIO_SEGMENTED_CONTROL_CLASS);
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(bioGroup).style.display = "block";
	event.currentTarget.className += " active";
}

/**
 * Adding a trigger to clicking any "leanModal" links so they can show the
 * bio modal.
 */
$(function() {
		$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".close_modal", nextModal: ".next_modal", previousModal: ".previous_modal" });
});

/**
 * It's really nice to control the bio modal with the keyboard
 * instead of having to click with the mouse. Let's support the
 * user doing this if they so desire.
 */
document.onkeydown = possiblyControlBioModal;
function possiblyControlBioModal(event) {
	event = event || window.event;
	if (event.keyCode == KEY_CODE_LEFT_ARROW) {
		$(PREVIOUS_BIO_MODAL_CONTROL_CLASS).click()
	} else if (event.keyCode == KEY_CODE_RIGHT_ARROW) {
		$(NEXT_BIO_MODAL_CONTROL_CLASS).click()
	} else if (event.keyCode == KEY_CODE_ESCAPE) {
		$(CLOSE_BIO_MODAL_CONTROL_CLASS).click()
	}
}