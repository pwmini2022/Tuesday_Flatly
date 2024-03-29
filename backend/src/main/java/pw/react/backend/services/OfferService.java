package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import pw.react.backend.models.Booking;
import pw.react.backend.models.BookingNotification;
import pw.react.backend.models.Offer;
import pw.react.backend.models.OfferImage;
import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.web.OfferDto;
import pw.react.backend.dao.BookingNotificationRepository;
import pw.react.backend.dao.OfferImageRepository;
import pw.react.backend.dao.OfferRepository;
import pw.react.backend.dao.UserRepository;

import static pw.react.backend.utils.MySimpleUtils.intevalIsValid;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

class OfferService implements IOfferService {
    private final Logger logger = LoggerFactory.getLogger(BookingService.class);

    private OfferRepository offerRepository;
    private IBookingService bookingService;

    @Autowired
    private BookingNotificationRepository bookingNotificationRepository;

    @Autowired
    private OfferImageRepository offerImageRepository;

    private UserRepository userRepository;
    @Autowired
    public void setOfferRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    OfferService() {
        /* Needed only for initializing spy in unit tests */ }

    OfferService(OfferRepository repository) {
        this.offerRepository = repository;
    }

    @Autowired
    public void setBookingService(IBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Override
    public Optional<Offer> updateOffer(String uuid, Offer updatedOffer) {
        Optional<Offer> maybeOffer = offerRepository.findById(uuid);

        if (maybeOffer.isPresent()) {
            User admin = maybeOffer.get().getOwner();

            updatedOffer.setUuid(uuid);
            updatedOffer.setOwner(admin);

            Offer result = offerRepository.save(updatedOffer);
            logger.info("Offer [ID: {}] updated.", uuid);
            return Optional.of(result);
        }

        return Optional.empty();
    }

    @Override
    public boolean deleteOffer(String uuid) {
        Optional<Offer> maybeOffer = offerRepository.findById(uuid);

        if (maybeOffer.isPresent()) {
            for (Booking booking : maybeOffer.get().getBookings()) {
                bookingService.deleteBooking(booking.getUuid());
            }

            for (BookingNotification notification : maybeOffer.get().getBookingNotifications()) {
                bookingNotificationRepository.deleteById(notification.getId());
            }

            for (OfferImage image : maybeOffer.get().getImages()) {
                offerImageRepository.deleteById(image.getUuid());
            }

            offerRepository.deleteById(uuid);
            logger.info("Offer [ID: {}] deleted.", uuid);

            return true;
        }

        return false;
    }

    @Override
    public Optional<Collection<OfferDto>> saveAll(Collection<OfferDto> offers, Long ownerId) {
        Optional<User> maybeUser = userRepository.findById(ownerId);

        if (maybeUser.isEmpty()) {
            return Optional.empty();
        }
        User user = maybeUser.get();

        for (OfferDto dto : offers) {
            if (!(intevalIsValid(dto.dateFrom(), dto.dateTo()))) {
                return Optional.empty();
            }
        }

        List<Offer> createdOffers = offers.stream()
                .map((OfferDto dto) -> OfferDto.convertToOffer(dto, user)).toList();
        List<OfferDto> result = offerRepository.saveAll(createdOffers)
                .stream()
                .map(OfferDto::valueFrom)
                .toList();

        return Optional.of(result);
    }

    @Override
    public Optional<Offer> findById(String uuid) {
        return offerRepository.findById(uuid);
    }

    @Override
    public Optional<Collection<BookingDto>> getAllBookings(String uuid) {
        Optional<Offer> maybeOffer = offerRepository.findById(uuid);

        return maybeOffer.isPresent() ? Optional.of(maybeOffer.get()
                .getBookings()
                .stream()
                .map(BookingDto::valueFrom)
                .toList()) : Optional.empty();
    }
}
