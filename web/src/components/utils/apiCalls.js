const BASE_URL = 'https://springserviceflatly-pw2022flatly.azuremicroservices.io';

const convertToQuery = (selectedParam, param) => {
    let query = "";

    if (!selectedParam || !param)
        return query;

    if (selectedParam == "dateFrom" || selectedParam == "dateTo" || selectedParam == "numberOfAdults"
        || selectedParam == "numberOfAdults") {
        if (!isNaN(parseInt(param)))
            query = `?${selectedParam}=${parseInt(param)}`;
    } else if (selectedParam == "uuid") {
        query = `${param}`;
    } else {
        query = `?${selectedParam}=${param}`;
    }

    return query;
}

// Login & Signup

export const login = async (userCredentials) => (
    await fetch(`${BASE_URL}/logic/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
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

export const signup = async (userCredentials) => (
    await fetch(`${BASE_URL}/logic/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials)
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

export const getOffers = async (token, selectedParam, queryParams, sort) => {
    const params = convertToQuery(selectedParam, queryParams);
    return await fetch(`${BASE_URL}/logic/api/offers/${params}?${sort ? `sortBy=${sort}` : ''}`, {
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
}

export const getOfferImages = async (token, offerUuid) => {
    const images = [];

    const imagesData = await fetch(`${BASE_URL}/logic/api/offerImages?offerUuid=${offerUuid}`, {
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

    for (const imageData of imagesData) {
        const image = await fetch(`${BASE_URL}/logic/api/offerImages/${imageData.offerImageUuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw response;
                }
            })
            .then(blob => {
                return URL.createObjectURL(blob);
            })
            .catch(error => {
                console.error(JSON.stringify(error));
            });

        images.push(image);
    }

    return images;
}

/////////////////////////////////////////
/* DOWN FROM HERE WE HAVE TO CHANGE!!! */
/////////////////////////////////////////

export const getBookings = async (token, bookingId, ownerId) => {
    let query = "";
    if (bookingId) {
        query += `/${bookingId}`;
    } else if (ownerId) {
        query = `?ownerId=${ownerId}`;
    }

    return await fetch(`${BASE_URL}/logic/api/bookings${query}`, {
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
}

// POST methods

export const postOffer = async (token, ownerId, offers) => {
    return await fetch(`${BASE_URL}/logic/api/offers/${ownerId}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(offers),
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
}

export const postBooking = async (token, offerId, bookings) => {
    return await fetch(`${BASE_URL}/logic/api/bookings/${offerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookings),
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
}

// PUT methods

export const putOffer = async (token, offerId, offer) => {
    return await fetch(`${BASE_URL}/logic/api/offers/${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
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
}

export const putBooking = async (token, bookingId, booking) => {
    await fetch(`${BASE_URL}/logic/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
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
}

// DELETE methods

export const deleteOffer = async (token, offerId) => {
    await fetch(`${BASE_URL}/logic/api/offers/${offerId}`, {
        method: 'DELETE',
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
}

export const deleteBooking = async (token, bookingId) => {
    await fetch(`${BASE_URL}/logic/api/bookings/${bookingId}`, {
        method: 'DELETE',
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
}