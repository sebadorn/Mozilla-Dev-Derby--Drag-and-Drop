"use strict";


/**
 * Class: A ripple on the surface.
 * @param {int} posX X coordinate of the center of the ripple.
 * @param {int} posY Y coordinate of the center of the ripple.
 * @param {Array} words Words to display along with the ripple.
 */
function Ripple( posX, posY, words ) {

	// Config
	this._tickLimit = 170;
	this._radius = 4;

	// Not config
	this._tick = 0;
	this._pos = {
		x: posX,
		y: posY
	};
	this._words = words;

};


/**
 * Draw the ripple.
 * @param {Object} ctx 2D context of the canvas.
 */
Ripple.prototype.draw = function( ctx ) {
	var time = this._tick / this._tickLimit,
	    alpha = 1.0 - time;

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(160, 160, 160, " + alpha + ")";
	ctx.arc(
		this._pos.x, this._pos.y,
		this._radius + this._tick,
		0, Math.PI * 2, false
	);
	ctx.closePath();
	ctx.stroke();

	if( this._words ) {
		// var wave_speed = 4,
		//     wave_height = 4,
		//     amplitude = Math.sin( time * wave_speed ) * wave_height;
		var font_size = 18 - 8 * time;

		ctx.font = "bold " + font_size + "px sans-serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "rgba(90, 90, 90, " + alpha + ")";

		var txt_x = this._pos.x,
		    txt_y = this._pos.y;

		for( var i = 3; i < this._words.length; i++ ) {
			ctx.fillText( this._words[i], txt_x, txt_y );
		}
	}

	this._tick++;
};


/**
 * Has the animation ended?
 * @return {Boolean} True if there is nothing more to draw for this ripple, false otherwise.
 */
Ripple.prototype.hasEnded = function() {
	return this._tick >= this._tickLimit;
};