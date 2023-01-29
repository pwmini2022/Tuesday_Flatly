package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import static pw.react.backend.utils.MySimpleUtils.intervalsOverlap;
import static pw.react.backend.utils.MySimpleUtils.intevalIsValid;
import static pw.react.backend.utils.MySimpleUtils.inveralIsASubset;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import pw.react.backend.models.Booking;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dao.OfferRepository;

class BookingService implements IBookingService {
    private final Logger logger = LoggerFactory.getLogger(BookingService.class);

    private BookingRepository repository;
    private OfferRepository offerRepository;

    @Autowired
    public void setOfferRepository(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    BookingService() {
        /* Needed only for initializing spy in unit tests */ }

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
    public Optional<Collection<BookingDto>> saveAll(Collection<BookingDto> bookings, String offerUuid) {
        Optional<Offer> maybeOffer = offerRepository.findById(offerUuid);
        if (maybeOffer.isEmpty()) {
            return Optional.empty();
        }
        Offer offer = maybeOffer.get();

        // technically should also do O(n^2) checks to make sure that the bookings in
        // the request dont
        // also overlap with each other?
        for (BookingDto dto : bookings) {
            if (!(intevalIsValid(dto.dateFrom(), dto.dateTo())
                    && inveralIsASubset(dto.dateFrom(), dto.dateTo(), offer.getDateFrom(), offer.getDateTo()))) {
                return Optional.empty();
            }
        }

        // this is probably the important one ig?
        // can probably be done faster with a smart algorithm but ehh
        for (Booking booking : offer.getBookings()) {
            for (BookingDto dto : bookings) {
                if (intervalsOverlap(dto.dateFrom(), dto.dateTo(), booking.getDateFrom(), booking.getDateTo())) {
                    return Optional.empty();
                }
            }
        }

        List<Booking> createdBookings = bookings.stream()
                .map((BookingDto dto) -> BookingDto.convertToBooking(dto, offer))
                .toList();

        List<BookingDto> result = repository.saveAll(createdBookings)
                .stream()
                .map(BookingDto::valueFrom)
                .toList();

        return Optional.of(result);
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
