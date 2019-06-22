import { PANDING } from '../config/consts'
import { APPROVED } from '../config/consts'
import { DECLINED } from '../config/consts'
import requestService from '../services/requestService'

export function updateLikeJoin(type, user, trip) {
    if (type === 'like') {
        if (user.likes.some(liked => liked === trip._id)) return;
        user.likes.unshift(trip._id)
        trip.likes++
    }
    else {
        // if (user.trips.some(currTripId => currTripId === trip._id)) return; 
        if (trip.members.length >= trip.maxMembers) return; //if trip is full - return
        _createNewJoinRequest(user, trip) //else - set join request
    }
}

async function _createNewJoinRequest(member, trip) {
    console.log('here')
    // if (!member.outgoingRequests) member.outgoingRequests = [] //for users that wew created before adding these fields
    // if (member.outgoingRequests.some(currRequest => currRequest.tripId === trip._id)) return; //if user already requested to join - return
    // member.outgoingRequests.push(
        //     {   tripId : trip._id, 
        //         status :PANDING 
        //     })
        
    const newRequest = 
    {   tripId : trip._id, 
        memberId : member._id, 
        status : PANDING
    }
    const updatedOrganizer = await requestService.addIncoming(newRequest, trip.organizer._id)
    const updatedMember = await requestService.addOutgoing(newRequest, member._id)
    console.log('request has been sent', updatedOrganizer, updatedMember)
    // socketService.
    
    
}

export async function updateJoinRequest(request, currUserId) {
    await requestService.updateIncoming(request, currUserId)
    await requestService.updateOutgoing(request, request.memberId)
    // const updatedOrganizer = await requestService.updateIncoming(request, currUserId)
    // const updatedMember = await requestService.updateOutgoing(request, request.memberId)

}



