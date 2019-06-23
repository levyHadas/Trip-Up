// import { PANDING } from '../config/consts'
// import { APPROVED } from '../config/consts'
// import { DECLINED } from '../config/consts'
// import requestService from '../services/requestService'

// export function createNewJoinRequest(member, trip) {

//     if (user.trips.some(currTripId => currTripId === trip._id)) return; 
//     if (trip.members.length >= trip.maxMembers) return; //if trip is full - return
//     _createNewJoinRequest(user, trip) //else - set join request
//     const newRequest = 
//     {   tripId : trip._id, 
//         memberId : member._id, 
//         status : PANDING
//     }
//     const updatedOrganizer = await requestService.addIncoming(newRequest, trip.organizer._id)
//     const updatedMember = await requestService.addOutgoing(newRequest, member._id)
//     console.log('request has been sent', updatedOrganizer, updatedMember)
//     // socketService. tell organizer there is a request
    
// }

 
        

    
    


// export async function updateJoinRequest(request, currUserId) {
//     await requestService.updateIncoming(request, currUserId)
//     await requestService.updateOutgoing(request, request.memberId)
//     // const updatedOrganizer = await requestService.updateIncoming(request, currUserId)
//     // const updatedMember = await requestService.updateOutgoing(request, request.memberId)
// }



