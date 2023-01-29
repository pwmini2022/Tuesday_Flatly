package pw.react.backend.services;

import java.util.Collection;
import java.util.Optional;

import pw.react.backend.web.BookingDto;
import pw.react.backend.web.OfferDto;
import pw.react.backend.models.Offer;

public interface IOfferService {
    Optional<Offer> updateOffer(String uuid, Offer updatedOffer);
    boolean deleteOffer(String uuid);
    Optional<Offer> findById(String iuud);
    Optional<Collection<BookingDto>> getAllBookings(String uuid);
    Optional<Collection<OfferDto>> saveAll(Collection<OfferDto> offers, Long ownerId);
}
