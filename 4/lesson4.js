'use strict'


// Замена ковычек

document.querySelector('.after').innerHTML = document.querySelector('.before').innerHTML.replace(/'(?![a-z])/gm, '"');

