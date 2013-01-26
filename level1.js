"use strict";


var Level1 = {


	number: 1,
	pete: "fighting_stance",
	text: "A monster attacks! Looks very squishy.<br />"
	      + "Wonder what happens when you drop something heavy on it.",

	SIZE_TO_DEFEAT_MONSTER: 1000000,
	_drop: null,


	/**
	 * Prepare the stage for this level.
	 */
	prepareStage: function() {
		var d = document;
		var frag = d.createDocumentFragment(),
		    monster = d.createElement( "div" ),
		    drop = d.createElement( "div" );

		monster.className = "monster";
		drop.className = "drop";

		monster.addEventListener( "dragenter", stop, false );
		monster.addEventListener( "dragover", stop, false );
		monster.addEventListener( "drop", this.monsterDrop, false );

		frag.appendChild( monster );
		frag.appendChild( drop );
		this._drop = drop;

		return frag;
	},


	/**
	 * File has been dropped on the monster.
	 */
	monsterDrop: function( e ) {
		stop( e );

		if( e.dataTransfer.files.length ) {
			var file = e.dataTransfer.files[0];

			if( file.size >= Level1.SIZE_TO_DEFEAT_MONSTER ) {
				e.target.className = "monster defeated";
				showNextButton();
			}
		}
	}


};