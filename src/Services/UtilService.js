
import React from 'react'

export default {
    getRandomIntInclusive,
    makeId,
    getIconForType,
    getStarsForRating
}

function getIconForType(type) {
    if (type) type = type.toLowerCase()
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
        default:
            return <i className="fas fa-suitcase"></i>
    }
}
function getStarsForRating(rate) {

    rate = Number(rate*2/10).toFixed(1)
    rate = rate/2*10
    switch (rate) {
        case rate === 0.5 : //return half
            return ( <span>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)
        case 1: //return 1 
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)
        case 1.5:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)
        case 2:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)        
        case 2.5:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)
            
        case 3:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)        
            
        case 3.5:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star no"></i>
            </span>)
            
        case 4:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="far fa-star no"></i>
            </span>)        
            
        case 4.5:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star-half-alt"></i>
            </span>)
            
        case 5:
            return ( <span>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
                <i className="fas fa-star yes"></i>
            </span>)        
            
        default: //empty stars
            return ( <span>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
                <i className="far fa-star no"></i>
            </span>)        
            
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