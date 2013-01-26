"use strict";


var Level2 = {


	number: 2,
	pete: "back",
	text: "There is a note in the dead slime lump. Pete refuses to touch it.<br />"
	      + "<em>(Sigh)</em> Can you get it for him?",

	_note: null,


	/**
	 * Prepare the stage for this level.
	 */
	prepareStage: function() {
		var d = document,
		    p = GLOBAL.pete;
		var frag = d.createDocumentFragment(),
		    monster = d.createElement( "div" ),
		    note = d.createElement( "div" );

		monster.className = "monster defeated";
		note.className = "note";

		// Drag and Drop
		note.draggable = "true";
		note.addEventListener( "dragstart", this.dragNote, false );
		p.addEventListener( "dragenter", stop, false );
		p.addEventListener( "dragover", stop, false );
		p.addEventListener( "drop", this.dropNote, false );

		frag.appendChild( monster );
		frag.appendChild( note );
		this._note = note;

		return frag;
	},


	/**
	 * User starts dragging the note.
	 */
	dragNote: function( e ) {
		// Some data has to be set.
		// Otherwise it wouldn't work in Firefox.
		e.dataTransfer.setData( "text/plain", "" );
	},


	/**
	 * User drops the note on Pete.
	 */
	dropNote: function( e ) {
		stop( e );
		Level2._note.parentNode.removeChild( Level2._note );
		GLOBAL.pete.className = "hold_note";
		showNextButton();
	}


};