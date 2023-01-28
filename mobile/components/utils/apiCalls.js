const BASE_URL = 'https://springserviceflatly-pw2022flatly.azuremicroservices.io'
const JWT = 'YOUR_TOKEN'


// GET methods

export const getOffers = async (ownerId) => {
    return await fetch(`${BASE_URL}/offers?${ownerId ? `ownerId=${ownerId}` : ""}`, {
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

export const getBookings = async (ownerId, offerId) => {
    return await fetch(`${BASE_URL}/bookings?${ownerId ? `ownerId=${ownerId}&` : ""}${offerId ? `offerId=${offerId}` : ""}`)
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

// POST methods

export const postOffer = async (ownerId, offers) => {
    return await fetch(`${BASE_URL}/offers?ownerId=${ownerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offers)
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {    
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

export const postBooking = async (offerId, bookings) => {
    return await fetch(`${BASE_URL}/bookings?offerId=${offerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookings)
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

// PUT methods

export const putOffer = async (offerId, offer) => {
    return await fetch(`${BASE_URL}/offers?offerId=${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

export const putBooking = async (bookingId, booking) => {
    await fetch(`${BASE_URL}/bookings?bookingUuid=${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

// DELETE methods

export const deleteOffer = async (offerId) => {
    await fetch(`${BASE_URL}/offers?offerId=${offerId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}

export const deleteBooking = async (bookingId) => {
    await fetch(`${BASE_URL}/bookings?bookingUuid=${bookingId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok){
                return response.json();
            } else {
                throw response;
            }
        })
        .catch(error => {
            console.error(JSON.stringify(error));
        })
}
