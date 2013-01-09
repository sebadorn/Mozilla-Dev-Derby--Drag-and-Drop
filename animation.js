"use strict";


var PondAnimate = {


	// Feel free to edit
	_mainLoopInterval: 24,

	// Hands off
	_pond: null,
	_ctx: null,
	_mainLoop: false,
	_animatableObjects: [],
	_animatableObjectsWaiting: [],


	/**
	 * Init "class".
	 * @param {DOMElement} pond Drop area.
	 */
	init: function( pond ) {
		this._pond = pond;
		this._ctx = this._pond.getContext( "2d" );

		window.addEventListener( "resize", this.resize );
		this.resize();

		this.startMainLoop();
	},


	/**
	 * Start main loop.
	 */
	startMainLoop: function() {
		if( !this._mainLoop ) {
			setTimeout( this.redraw, this._mainLoopInterval );
			this._mainLoop = true;
		}
	},


	/**
	 * Stop main loop.
	 */
	stopMainLoop: function() {
		this._mainLoop = false;
	},


	/**
	 * Redraw context of canvas.
	 */
	redraw: function() {
		var pa = PondAnimate;
		var drawCount,
		    ani,
		    removeAni = [];

		// Clear canvas
		pa._pond.width = pa._pond.width;
		pa._pond.height = pa._pond.height;

		// Merge with waiting queue
		pa._animatableObjects = pa._animatableObjects.concat( pa._animatableObjectsWaiting );
		pa._animatableObjectsWaiting = [];

		// Draw objects
		drawCount = pa._animatableObjects.length;
		for( var i = 0; i < drawCount; i++ ) {
			ani = pa._animatableObjects[i];
			ani.draw( pa._ctx );

			if( ani.hasEnded() ) {
				removeAni[removeAni.length] = i;
			}
		}

		// Remove objects which won't be visible anymore
		for( var i = 0; i < removeAni.length; i++ ) {
			pa._animatableObjects.splice( i, 1 );
		}

		if( pa._mainLoop ) {
			setTimeout( pa.redraw, pa._mainLoopInterval );
		}
	},


	/**
	 * Show a ripple at the given position.
	 * @param {int} x X coordinate of the center of the ripple.
	 * @param {int} y Y coordinate of the center of the ripple.
	 */
	showRipple: function( x, y ) {
		this._animatableObjectsWaiting.push( new Ripple( x, y ) );
	},


	/**
	 * Resize pond to window dimensions.
	 */
	resize: function( e ) {
		PondAnimate._pond.width = window.innerWidth;
		PondAnimate._pond.height = window.innerHeight;
	}


};