package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import pw.react.backend.models.Booking;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.dao.OfferRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

class OfferService implements IOfferService {
    private final Logger logger = LoggerFactory.getLogger(BookingService.class);

    private OfferRepository offerRepository;
    private IBookingService bookingService;

    OfferService() {
        /* Needed only for initializing spy in unit tests */ }

    OfferService(OfferRepository repository) {
        this.offerRepository = repository;
    }

    @Autowired
    public void setUserService(IBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public Optional<Offer> updateOffer(Long id, Offer updatedOffer) {
        Optional<Offer> maybeOffer = offerRepository.findById(id);

        if (maybeOffer.isPresent()) {
            User admin = maybeOffer.get().getOwner();

            updatedOffer.setId(id);
            updatedOffer.setOwner(admin);

            Offer result = offerRepository.save(updatedOffer);
            logger.info("Offer [ID: {}] updated.", id);
            return Optional.of(result);
        }

        return Optional.empty();
    }

    @Override
    public boolean deleteOffer(Long id) {
        Optional<Offer> maybeOffer = offerRepository.findById(id);

        if (maybeOffer.isPresent()) {
            Set<Booking> relatedBookings = maybeOffer.get().getBookings();

            for (Booking booking : relatedBookings) {
                bookingService.deleteBooking(booking.getUuid());
            }

            offerRepository.deleteById(id);
            logger.info("Offer [ID: {}] deleted.", id);

            return true;
        }

        return false;
    }

    @Override
    public Optional<Offer> findById(Long id) {
        return offerRepository.findById(id);
    }

    @Override
    public Optional<Collection<BookingDto>> getAllBookings(Long id) {
        Optional<Offer> maybeOffer = offerRepository.findById(id);

        if (maybeOffer.isPresent()) {
            return Optional.of(maybeOffer.get()
                    .getBookings()
                    .stream()
                    .map(BookingDto::valueFrom)
                    .toList());
        }

        return Optional.empty();
    }
}
