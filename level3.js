"use strict";


var Level3 = {


	number: 3,
	pete: "shirt",
	text: "He's covered in slime. Yuk! Pete changes his shirt.<br />"
	      + "Hey, nice picture!",


	_shirt: null,


	/**
	 * Prepare the stage for this level.
	 */
	prepareStage: function() {
		var shirt = document.createElement( "img" );

		shirt.className = "shirt_dropzone";
		shirt.alt = "";
		shirt.src = "img/shirt_placeholder.gif";

		// Make shirt a drop zone
		shirt.addEventListener( "dragenter", stop, false );
		shirt.addEventListener( "dragover", stop, false );
		shirt.addEventListener( "drop", this.shirtDrop, false );

		this._shirt = shirt;

		return shirt;
	},


	/**
	 * A file (image) has been dropped on the shirt.
	 */
	shirtDrop: function( e ) {
		stop( e );

		if( e.dataTransfer.files.length > 0 ) {
			var file = e.dataTransfer.files[0];

			if( !file.type.match( "image.*" ) ) {
				return;
			}

			var reader = new FileReader();

			reader.onload = function() {
				Level3._shirt.src = reader.result;
				showNextButton();
			}

			reader.readAsDataURL( file );
		}
	}


};