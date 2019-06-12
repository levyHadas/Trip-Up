import React from 'react'

function ItineraryItem ({place,onRemoveFromItinerary}) {
    return (
        <div className="place-container" key={place.place_id}>
            <span>{place.name}</span>
            <i className="far fa-minus-square remove" 
                    value={place.place_id}
                    onClick={onRemoveFromItinerary}>
            </i>
        </div>)
}

export default ItineraryItem