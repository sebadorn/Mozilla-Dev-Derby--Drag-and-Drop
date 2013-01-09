"use strict";


/**
 * Class: A ripple on the surface.
 * @param {int} posX X coordinate of the center of the ripple.
 * @param {int} posY Y coordinate of the center of the ripple.
 */
function Ripple( posX, posY ) {

	// Config
	this._tickLimit = 100;
	this._radius = 10;

	// Not config
	this._tick = 0;
	this._pos = {
		x: posX,
		y: posY
	};

};


/**
 * Draw the ripple.
 * @param {Object} ctx 2D context of the canvas.
 */
Ripple.prototype.draw = function( ctx ) {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#a0a0a0";
	ctx.arc(
		this._pos.x, this._pos.y,
		this._radius + this._tick,
		0, Math.PI * 2, false
	);
	ctx.closePath();
	ctx.stroke();

	this._tick++;
};


/**
 * Has the animation ended?
 * @return {Boolean} True if there is nothing more to draw for this ripple, false otherwise.
 */
Ripple.prototype.hasEnded = function() {
	return this._tick >= this._tickLimit;
};