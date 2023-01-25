package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import pw.react.backend.models.Booking;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.dao.BookingRepository;
import java.util.Optional;

class BookingService implements IBookingService {
    private final Logger logger = LoggerFactory.getLogger(BookingService.class);

    private BookingRepository repository;

    BookingService() { /*Needed only for initializing spy in unit tests*/ }

    BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Booking> updateBooking(String uuid, Booking updatedBooking) {
        Optional<Booking> maybeBooking = repository.findById(uuid);

        if (maybeBooking.isPresent()) {
            // The API should not expect to change who owns an object
            // simply via the endpoint.
            // I explicitly keep the old foreign keys here
            User admin = maybeBooking.get().getAdmin();
            Offer offer = maybeBooking.get().getOffer();

            updatedBooking.setUuid(uuid);
            updatedBooking.setAdmin(admin);
            updatedBooking.setOffer(offer);

            Booking result = repository.save(updatedBooking);
            logger.info("Booking [UUID: {}] updated.", uuid);

            return Optional.of(result);
        }

        return maybeBooking;
    }

    @Override
    public boolean deleteBooking(String uuid) {
        boolean result = false;
        if (repository.existsById(uuid)) {
            repository.deleteById(uuid);
            logger.info("Booking [UUID: {}] deleted.", uuid);
            result = true;
        }
        return result;
    }
}
