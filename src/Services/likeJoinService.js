

export function updateLikeJoin(type, user, trip) {
    if (type === 'like') {
        if (user.likes.some(liked => liked === trip._id)) return;
        user.likes.unshift(trip._id)
        trip.likes++
    }
    else {
        if (user.trips.some(currTrip => currTrip === trip._id)) return;
        if (trip.members.length >= trip.maxMembers) return;
        user.trips.push(trip._id)
        trip.members.push(user._id)
        if (trip.members.length === trip.maxMembers) {
            trip.status = 'closed'
        }
    }
    
}


