"use strict";


window.addEventListener( "load", init, false );


var GLOBAL = {
	msgBox: null,
	nextBtn: null,
	pete: null,
	stage: null
};

var PATH;


/**
 * Init. Get the required DOM objects and start the first level.
 */
function init() {
	var d = document;

	preloadImages();

	GLOBAL.stage = d.getElementById( "stage" ),
	GLOBAL.pete = d.getElementById( "pete" ),
	GLOBAL.msgBox = d.getElementById( "msgBox" );
	GLOBAL.nextBtn = d.getElementById( "next" );
	GLOBAL.nextBtn.addEventListener( "click", nextLevel, false );

	PATH = [Level0, Level1, Level2, Level3, Level4];

	nextLevel();
};


/**
 * Preload the needed images.
 */
function preloadImages() {
	var images = [],
	    preload = [
	    	"monster.gif",
	    	"monster_defeated.gif",
	    	"note.gif",
	    	"pete_back.gif",
	    	"pete_fight.gif",
	    	"pete_note.gif",
	    	"pete_onwards.gif",
	    	"pete_shirt.gif",
	    	"shirt_placeholder.gif"
	    ];

	for( var i = 0; i < preload.length; i++ ) {
		images[i] = new Image();
		images[i].src = "img/" + preload[i];
	}
}


/**
 * Remove all children of the stage except Pete, the message box and the next button.
 */
function clearStage() {
	var children = GLOBAL.stage.children,
	    del = [],
	    i, flag;

	GLOBAL.nextBtn.style.display = "none";

	// Find all children that shall be removed
	for( i = 0; i < children.length; i++ ) {
		flag = children[i].getAttribute( "data-flag" );

		if( !flag || flag != "keep" ) {
			del.push( children[i] );
		}
	}

	// Actually remove them
	for( i = 0; i < del.length; i++ ) {
		GLOBAL.stage.removeChild( del[i] );
	}
};


/**
 * Start the next level.
 */
function nextLevel() {
	clearStage();

	var lvl = PATH.splice( 0, 1 )[0],
	    props = lvl.prepareStage();

	document.body.className = "level" + lvl.number;
	GLOBAL.pete.className = lvl.pete;
	GLOBAL.msgBox.innerHTML = lvl.text;

	if( props ) {
		GLOBAL.stage.appendChild( props );
	}
};


/**
 * Show the button to proceed to the next level.
 */
function showNextButton() {
	GLOBAL.nextBtn.style.display = "block";
}


function stop( e ) {
	e.preventDefault();
}
