"use strict";


var PondInteract = {

	// Config
	_pauseMouseRipple: 600, // [ms]

	// Not config
	_pond: null,
	_lastMouseRipple: 0,


	/**
	 * Init "class".
	 * @param {DOMElement} pond Drop area.
	 */
	init: function( pond ) {
		this._pond = pond;
		PondAnimate.init( pond );
		this._registerDragDropListener();
		this._pond.addEventListener( "mousemove", function( e ) {
			var now = Date.now();

			if( PondInteract._lastMouseRipple < now - PondInteract._pauseMouseRipple ) {
				PondAnimate.showRipple( e.clientX, e.clientY );
			}
			PondInteract._lastMouseRipple = now;
		}, false );
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
				var fileAsString = reader.result,
				    words = fileAsString.split( ' ' ).splice( 0, 4 );

				PondAnimate.showRipple( e.clientX, e.clientY, words );
			};

			reader.readAsText( e.dataTransfer.files[0] );
		}
	}


};