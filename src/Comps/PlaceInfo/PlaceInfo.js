import React, { Fragment } from 'react'
import UtilService from '../../Services/UtilService'

function PlaceInfo ({placeInfo}) {
if (!placeInfo) return ''
var url = placeInfo.website || placeInfo.url

const typesMap = placeInfo.types.map((type, idx) => {
    if (idx === 3) return ''
    if (idx === placeInfo.types.length-1 || idx === 3 ) {
        return <span key={idx}>{type}.</span>
    }
    return <span key={idx}>{type}, </span>
}) //only take first 4 types

if (placeInfo.reviews) {
    var reviewsMap = placeInfo.reviews.map((review, idx) => {
        if (idx === 3) return ''
        let date = new Date(review.time)
        date = date.toLocaleDateString()
        review.text = review.text.slice(0,150)
        console.log(review)
        let lastDot = review.text.lastIndexOf('.')
        console.log(lastDot)
        review.text = review.text.slice(0,lastDot)
        return <div key={idx}>
                    {review.author_name}({date}): {review.text}...
                </div>
        }) //only take first 4 reviews
}
    
    return (
        <Fragment>
            {placeInfo &&
            <section className="place-info">
                <h3>{placeInfo.formatted_address}</h3>
                {placeInfo.types.length && typesMap}

                {url &&
                <div><a href={url} target="_blank" rel="noopener noreferrer">{url.slice(0,20)}...</a></div>}               
                {placeInfo.rating &&
                <div>
                    {UtilService.getStarsForRating(placeInfo.rating)}
                </div>}
                {placeInfo.reviews &&
                <div className="reviews-contianer">
                    <div>{placeInfo.reviews.length} reviews</div>
                    {reviewsMap}
                </div>}
            </section>}

        </Fragment>
    )
}


export default PlaceInfo