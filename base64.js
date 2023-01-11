/*
This  program is free software;
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// text to base 64 function
function textToBase64 ( ) {
	try {
		document.getElementById ( 'ErrorBtoa' ).textContent = '';
		document.getElementById('Base64Area').value = btoa ( document.getElementById ( 'TextArea' ).value );
	}
	catch ( e ) {
		document.getElementById ( 'ErrorBtoa' ).textContent = 'The text contains an invalid character. Only characters in the Unicode Latin and Unicode Latin-1 supplement tables can be used';
		document.getElementById('Base64Area').value = '';
	}
};

//text to base64 and to clipboard button
document.getElementById ( 'TextToBase64AndClipboardBtn' ).addEventListener ( 
	'click',
	() => {
		textToBase64 ( );
		navigator.clipboard.writeText ( document.getElementById('Base64Area').value );
	}
); 

// text to base64 only button
document.getElementById ( 'TextToBase64Btn' ).addEventListener ( 'click', textToBase64 );

// base64 to text function
function base64ToText ( ) {
	document.getElementById ( 'TextArea' ).value = atob ( document.getElementById ( 'Base64Area' ).value );
}

// Base64 to text and to clipboard button
document.getElementById ( 'Base64ToTextAndClipboardBtn' ).addEventListener (
	'click',
	( ) => {
		base64ToText ( );
		const textArea = document.getElementById ( 'TextArea' );
		navigator.clipboard.writeText ( textArea.value );
	}
);

// Base64 to text button
document.getElementById ( 'Base64ToTextBtn' ).addEventListener ( 'click', base64ToText );

// Select an image to encode into base64 input		
document.getElementById ( 'ImageFileInput' ).addEventListener ( 
	'change' ,
	( ) => {
		const fileReader = new FileReader( );
		fileReader.onloadend  = function ( event ) {
			var textArea = document.getElementById('ImageToBase64Area');
			textArea.value = fileReader.result;
			document.getElementById ( 'ImagePreview' ).src = fileReader.result;
			// navigator.clipboard.writeText work without Permission in the active tab.
			// Currently ( january 2023 ) FF and chrome don't know 'clipboard-write' permission, so it's not possible to copy to the clipboard directly
			// navigator.clipboard.writeText ( fileReader.result );
		};
		fileReader.readAsDataURL ( event.target.files [ 0 ] );		
	}
);

// Copy the image encoded base64 to clipboard button
document.getElementById ( 'ImageBase64ToClipBoardBtn' ).addEventListener ( 
	'click',
	( ) => { navigator.clipboard.writeText ( document.getElementById( 'ImageToBase64Area' ).value ); }
); 

// Show the image button
document.getElementById ( 'Base64ToImageBtn' ).addEventListener ( 
	'click', 
	( ) => { document.getElementById ( 'DecodedImagePreview' ).src = document.getElementById ( 'Base64ToImageArea' ).value;	}
);

// Save image to file button
document.getElementById ( 'SaveImageToFileBtn' ).addEventListener ( 
	'click',
	( ) => {
		let element = document.createElement ( 'a' );
		element.setAttribute( 'href', document.getElementById ( 'Base64ToImageArea' ).value );
		element.setAttribute( 'download', 'img' );
		element.style.display = 'none';
		element.click ( );
	}
);


// UUID function
function getUUID ( ) {
	const ZERO = 0;
	const UUID_LENGHT = 16;
	const HEXADECIMAL = 16;
	const UUID_STRLENGHT = 2;
	let randomValues = new Uint8Array ( UUID_LENGHT );
	const UUID_SEPARATORS = [ '', '', '', '-', '', '-', '', '-', '', '-', '', '', '', '', '', '' ];
	window.crypto.getRandomValues ( randomValues );

	/* eslint-disable no-bitwise */
	/* eslint-disable no-magic-numbers */
	
	/*
	rfc 4122 section 4.4 : Set the four most significant bits (bits 12 through 15) of the
	time_hi_and_version field to the 4-bit version number from section 4.1.3.
	*/

	randomValues [ 6 ] = ( randomValues [ 6 ] & 0x0f ) | 0x40;

	/*
	rfc 4122 section 4.4 : Set the two most significant bits (bits 6 and 7) of the
	clock_seq_hi_and_reserved to zero and one, respectively.
	*/

	randomValues [ 8 ] = ( randomValues [ 8 ] & 0x3f ) | 0x80;

	/* eslint-enable no-bitwise */
	/* eslint-enable no-magic-numbers */

	let UUID = '';
	for ( let counter = ZERO; counter < UUID_LENGHT; counter ++ ) {
		UUID += randomValues [ counter ].toString ( HEXADECIMAL ).padStart ( UUID_STRLENGHT, '0' ) +
			UUID_SEPARATORS [ counter ];
	}
	const UUIDArea = document.getElementById ( 'UUID' );
	UUIDArea.value = UUID;
	navigator.clipboard.writeText ( UUID );
}

// UUID button
document.getElementById ( 'UUIDBtn' ).addEventListener ( 'click', getUUID );
