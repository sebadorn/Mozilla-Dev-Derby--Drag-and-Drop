"use strict";


window.addEventListener( "load", init, false );


var CONFIG = {
	preload: {
		audio: [
			"intro.ogg",
			"monster_hit.ogg",
			"monster_defeated.ogg",
			"uh-oh.ogg",
			"awesome.ogg",
			"outro.ogg"
	    ],
	    images: [
			"level0.gif",
			"level4.gif",
			"monster.gif",
			"monster_defeated.gif",
			"note.gif",
			"pete_back.gif",
			"pete_back_slime.gif",
			"pete_fight.gif",
			"pete_note.gif",
			"pete_onwards.gif",
			"pete_shirt.gif",
			"pete_slime.gif",
			"shirt_placeholder.gif"
		]
	},
	volume: 0.4
};

var GLOBAL = {
	audio: {},
	msgBox: null,
	nextBtn: null,
	pete: null,
	stage: null,
	volume: null
};

var PATH;


/**
 * Init. Get the required DOM objects and start the first level.
 */
function init() {
	var d = document,
	    g = GLOBAL,
	    vol = d.createDocumentFragment(),
	    v;

	preloadImages();
	preloadAudio();

	g.stage = d.getElementById( "stage" ),
	g.pete = d.getElementById( "pete" ),
	g.msgBox = d.getElementById( "msgBox" );
	g.nextBtn = d.getElementById( "next" );
	g.nextBtn.addEventListener( "click", nextLevel, false );
	g.volume = d.getElementById( "volume" );

	// Add volume bar control
	for( var i = 0; i < 10; i++ ) {
		v = d.createElement( "li" );
		v.className = ( i <= CONFIG.volume * 10 ) ? "active" : "";
		v.setAttribute( "data-vol", i );
		v.addEventListener( "click", changeVolume, false );
		vol.appendChild( v );
	}
	g.volume.appendChild( vol );

	// Set order of levels
	PATH = [Level0, Level1, Level2, Level3, Level4];

	// Start first level
	nextLevel();
};


/**
 * Preload the needed sounds.
 */
function preloadAudio() {
	var ga = GLOBAL.audio,
	    preload = CONFIG.preload.audio,
	    name;

	for( var i = 0; i < preload.length; i++ ) {
		name = preload[i];
		ga[name] = new Audio();
		ga[name].preload = "auto";
		ga[name].src = "sound/" + name;
		ga[name].volume = CONFIG.volume;
	}
};


/**
 * Preload the needed images.
 */
function preloadImages() {
	var images = [],
	    preload = CONFIG.preload.images;

	for( var i = 0; i < preload.length; i++ ) {
		images[i] = new Image();
		images[i].src = "img/" + preload[i];
	}
};


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

	// Stop all audio
	for( var a in GLOBAL.audio ) {
		GLOBAL.audio[a].src = GLOBAL.audio[a].src;
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
	setMessage( lvl.text );

	if( props ) {
		GLOBAL.stage.appendChild( props );
	}
};


/**
 * Change audio volume.
 */
function changeVolume( e ) {
	var ga = GLOBAL.audio,
	    vol = parseInt( e.target.getAttribute( "data-vol" ) ),
	    newVol = vol / 10,
	    children = GLOBAL.volume.children;

	for( var audio in ga ) {
		ga[audio].volume = newVol;
	}

	for( var i = 0; i < children.length; i++ ) {
		children[i].className = ( i <= vol ) ? "active" : "";
	}
};


/**
 * Play an audio file (ogg).
 * @param {String} name Name of file without path and file extension.
 * @param {bool}   loop Loop audio.
 */
function playAudio( name, loop ) {
	GLOBAL.audio[name + ".ogg"].loop = loop;
	GLOBAL.audio[name + ".ogg"].play();
};


/**
 * Sets the text for the message box.
 * @param {String} msg Text/HTML.
 */
function setMessage( msg ) {
	GLOBAL.msgBox.innerHTML = msg;
};


/**
 * Show the button to proceed to the next level.
 */
function showNextButton() {
	GLOBAL.nextBtn.style.display = "block";
};


function stop( e ) {
	e.preventDefault();
};
