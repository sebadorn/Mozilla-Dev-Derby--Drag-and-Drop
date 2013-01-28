"use strict";


var Level1 = {


	number: 1,
	pete: "fighting_stance",
	text: "A squishy-looking monster attacks! Wonder what<br />"
	      + "happens if you drop something heavy on it.",

	SIZE_TO_DEFEAT_MONSTER: 1000000,
	_drop: null,
	_monster: null,


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

		this._monster = monster;
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

			Level1.showDrop( file.size );
		}
	},


	/**
	 * If file is big enough, the monster will be defeated.
	 * If not, try again.
	 * @param {int} size File size in bytes.
	 */
	defeatMonster: function( size ) {
		if( size >= Level1.SIZE_TO_DEFEAT_MONSTER ) {
			playAudio( "monster_defeated" );
			Level1._monster.className = "monster defeated";
			GLOBAL.pete.className = "slime";
			setMessage( "Well, that did the job." );
			showNextButton();
		}
		else {
			playAudio( "monster_hit" );
			setMessage( "This slime monster can take at least 1 MB!" );
		}
	},


	/**
	 * Show drop animation.
	 * @param {int} size File size in bytes.
	 */
	showDrop: function( filesize ) {
		var size = filesize,
		    unit = " B";

		if( size >= 1024 ) {
			size /= 1024;
			unit = " KB";
		}
		if( size >= 1024 ) {
			size /= 1024;
			unit = " MB";
		}
		if( size >= 1024 ) {
			size /= 1024;
			unit = " GB";
		}

		this._drop.textContent = Math.round( size ) + unit;
		this._drop.className = "drop animate";

		setTimeout( function() {
			Level1._drop.className = "drop";
			Level1.defeatMonster( filesize );
		}, 2000 );
	}


};
