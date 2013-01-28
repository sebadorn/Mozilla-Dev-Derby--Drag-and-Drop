"use strict";


var Level4 = {


	number: 4,
	pete: "onwards",
	text: "Good luck, Pete! Your adventure just started!",


	/**
	 * Prepare the stage for this level.
	 */
	prepareStage: function() {
		playAudio( "outro", true );
		return document.createDocumentFragment();
	}


};
