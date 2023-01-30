const BASE_URL = 'https://springserviceflatly-pw2022flatly.azuremicroservices.io';

// Login

export const login = async (username, password) => (
    await fetch(`${BASE_URL}/logic/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
)


// GET methods

export const getOffers = async (token, page, itemsOnPage) => (
    await fetch(`${BASE_URL}/logic/api/offers?page=${page}&itemsOnPage=${itemsOnPage}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
)

export const getOffer = async (token, offerUuid) => (
    await fetch(`${BASE_URL}/logic/api/offers/${offerUuid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
    .catch(error => {
        console.error(JSON.stringify(error));
    })
)

export const getOfferImages = async (token, offerUuid) => (
    await fetch(`${BASE_URL}/logic/api/offerImages?offerUuid=${offerUuid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
)

export const getOfferImageBase64 = async (token, offerImageUuid) => (
    await fetch(`${BASE_URL}/logic/api/offerImages/${offerImageUuid}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }})
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw response;
        }
    })
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }))
)


export const getBookings = async (token, page, itemsOnPage) => (
    await fetch(`${BASE_URL}/logic/api/bookings?page=${page}&itemsOnPage=${itemsOnPage}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response;
        }
    })
)

// DELETE methods

export const deleteBooking = async (token, bookingUuid) => (
    await fetch(`${BASE_URL}/logic/api/bookings/${bookingUuid}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok){
            return response;
        } else {
            throw response;
        }
    })
)


/////////////////////////
//!!!!!!!!!!!!!!!!!!!!!//

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

