
import React from 'react'

export default {
    getRandomIntInclusive,
    makeId,
    getIconForType
}

function getIconForType(type) {
    switch (type) {
        case 'hiking':
            return <i className="fas fa-hiking" title="Hiking"></i>
        case 'music': 
            return <i className="fas fa-music" title="Music"></i>
        case 'art':
            return <i className="fas fa-palette" title="Art"></i>
        case 'food':
            return <i className="fas fa-utensils" title="Food"></i>
        case 'nature':
            return <i className="fas fa-tree" title="Nature"></i>
        case 'photography':
            return <i className="fas fa-camera-retro" title="Nhotography"></i>
        case 'shoping':
            return <i className="fas fa-shopping-bag" title="Shoping"></i>
    }
}
  
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function makeId(length=3) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}