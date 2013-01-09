"use strict";


var PondInteract = {


	_pond: null,


	/**
	 * Init "class".
	 * @param {DOMElement} pond Drop area.
	 */
	init: function( pond ) {
		this._pond = pond;
		PondAnimate.init( pond );
		this._registerDragDropListener();

		// FOR TESTING ONLY
		this._pond.addEventListener( "click", function( e ) {
			PondAnimate.showRipple( e.clientX, e.clientY );
		} );
	},


	/**
	 * Register drag and drop listener.
	 */
	_registerDragDropListener: function() {
		this._pond.ondragover = this._dragover;
		this._pond.ondragleave = this._dragleave;
		this._pond.ondragend = this._dragend;
		this._pond.ondrop = this._dropped;
	},


	/**
	 * Object gets dragged over drop area.
	 */
	_dragover: function( e ) {
		e.preventDefault();
	},


	/**
	 * Object got dragged off drop area.
	 */
	_dragleave: function( e ) {
		e.preventDefault();
	},


	/**
	 * End of dragging.
	 */
	_dragend: function( e ) {
		e.preventDefault();
	},


	/**
	 * Object got dropped.
	 */
	_dropped: function( e ) {
		e.preventDefault();

		if( e.dataTransfer.files.length ) {
			var reader = new FileReader();

			reader.onload = function() {
				var fileAsString = reader.result;
			};

			reader.readAsText( e.dataTransfer.files[0] );
		}

		var mouse = { x: e.clientX, y: e.clientY };

		PondAnimate.showRipples( mouse );
	}


};