// Necessary for the RSVP form. The default state for the form is unsubmitted
var rsvpFormSubmitted = false

// Constants
var KEY_CODE_0 = 48
var KEY_CODE_9 = 57
var KEY_CODE_LEFT_ARROW = 37
var KEY_CODE_RIGHT_ARROW = 39
var KEY_CODE_ESCAPE = 27
var MIN_NUMBER_OF_GUESTS = 1
var MAX_NUMBER_OF_GUESTS = 20

var INPUT_NAME_ID = "entry.189008425"
var INPUT_EMAIL_ID = "entry.1176921021"
var INPUT_MEAL_ID = "entry.368489061"
var RADIO_BUTTON_ATTEND_ID = "entry.644721739"
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
	} else {
		var userValue = parseInt(event.target.value);

		// Ensuring the user value is within acceptable ranges, fixing it if it's not
		if (userValue < MIN_NUMBER_OF_GUESTS) {
			event.target.value = MIN_NUMBER_OF_GUESTS.toString()
		} else if (userValue > MAX_NUMBER_OF_GUESTS) {
			event.target.value = MAX_NUMBER_OF_GUESTS.toString()
		}
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
			if (document.getElementById(INPUT_MEAL_ID).value == "") {
				document.getElementById(BUTTON_SUBMIT_ID).disabled = true;
			} else {
				document.getElementById(BUTTON_SUBMIT_ID).disabled = false;
			}
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