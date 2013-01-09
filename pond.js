"use strict";


function init() {
	var pond = document.getElementById( "pond" );
	PondInteract.init( pond );
}


if( document.body && PondInteract && PondAnimate ) {
	init();
}
else {
	window.addEventListener( "load", init );
}