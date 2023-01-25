package pw.react.backend.services;

import java.util.Collection;
import java.util.Optional;

import pw.react.backend.web.BookingDto;
import pw.react.backend.models.Offer;

public interface IOfferService {
    Optional<Offer> updateOffer(Long id, Offer updatedOffer);
    boolean deleteOffer(Long id);
    Optional<Offer> findById(Long id);
    Optional<Collection<BookingDto>> getAllBookings(Long id);
}

