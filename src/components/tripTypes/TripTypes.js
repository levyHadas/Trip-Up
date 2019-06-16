import React from 'react'
import TripService from '../../services/tripService'


function TripTypes({ currType, onTypeSelected, className }) {
    const tripTypes = TripService.getTripTypes()
    const tripTypseMap = tripTypes.map((option, idx) => {
        if (currType === option) {
            return <option name={option} value={option} 
                        key={idx} selected >{option} 
                    </option>
        } else return <option value={option} key={idx}>{option}</option>
    })
    return ( 
        <select className={className} placeholder="Type" 
            onChange={onTypeSelected} name="type">
            {tripTypseMap}
        </select>)
}
export default TripTypes