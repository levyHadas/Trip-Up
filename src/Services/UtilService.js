
import React from 'react'

export default {
    getRandomIntInclusive,
    makeId,
    getIconForType,
    getStarsForRating,
    toDatePickerFormat
}

function toDatePickerFormat(timestamp) {
    const date = new Date(timestamp)
    const year = '' + date.getFullYear()
    let month = date.getMonth()+1
    if (month < 10) month = '0'+ month
    let day = date.getDate()
    if (day < 10) day = '0'+ day
    return `${year}-${month}-${day}`
}

function getIconForType(type) {
    if (type) type = type.toLowerCase()
    switch (type) {
        case 'hiking':
            return <i className="fas fa-hiking" title="Trip type - Hiking"></i>
        case 'music': 
            return <i className="fas fa-music" title="Trip type - Music"></i>
        case 'art':
            return <i className="fas fa-palette" title="Trip type - Art"></i>
        case 'food':
            return <i className="fas fa-utensils" title="Trip type - Food"></i>
        case 'nature':
            return <i className="fas fa-tree" title="Trip type - Nature"></i>
        case 'photography':
            return <i className="fas fa-camera-retro" title="Trip type - Nhotography"></i>
        case 'shoping':
            return <i className="fas fa-shopping-bag" title="Trip type - Shoping"></i>
        case 'work':
            return <i className="fas fa-suitcase" title="Trip type - Work"></i>
        default:
            return <i className="fas fa-plane-departure" title="Trip type - Other"></i>
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