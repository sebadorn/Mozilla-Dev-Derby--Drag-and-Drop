"use strict";


var Level0 = {


	number: 0,
	pete: "back",
	text: "This is Pete. He is out for a walk, when …",


	/**
	 * Prepare the stage for this level.
	 */
	prepareStage: function() {
		playAudio( "intro", true );
		showNextButton();
		return false;
	}


};
