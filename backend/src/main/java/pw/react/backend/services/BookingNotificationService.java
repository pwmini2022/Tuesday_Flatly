package pw.react.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import pw.react.backend.dao.BookingNotificationRepository;
import pw.react.backend.dao.OfferRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.models.BookingNotification;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.web.BookingNotificationDto;

public class BookingNotificationService implements IBookingNotificationService {
    private BookingNotificationRepository bookingNotificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OfferRepository offerRepository;

    public BookingNotificationService(BookingNotificationRepository bookingNotificationRepository) {
        this.bookingNotificationRepository = bookingNotificationRepository;
    }

    @Override
    public BookingNotification save(BookingDto booking, String offerUuid, Integer actionType) {
        Optional<Offer> maybeOffer = offerRepository.findById(offerUuid);

        if (maybeOffer.isEmpty()) {
            // since this is called in only some specific points after
            // the related Dto should be valid, I think there's no need to be graceful
            throw new IllegalArgumentException("Bruh.");
        }

        return bookingNotificationRepository
                .save(new BookingNotification(booking, maybeOffer.get(), actionType, System.currentTimeMillis()));
    }

    // TODO: maybe generalize these next two?
    // probably some design patterns would help
    @Override
    public Optional<List<BookingNotificationDto>> getByOffer(String uuid) {
        Optional<Offer> maybeOffer = offerRepository.findById(uuid);

        if (maybeOffer.isPresent()) {
            Set<BookingNotification> notifications = maybeOffer.get().getBookingNotifications();
            List<BookingNotificationDto> notificationDtos = notifications.stream()
                    .map(BookingNotificationDto::valueFrom)
                    .toList();

            // can't get notifications twice?
            for (BookingNotification notification : notifications) {
                bookingNotificationRepository.deleteById(notification.getId());
            }

            return Optional.of(notificationDtos);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<List<BookingNotificationDto>> getByUser(Long id) {
        Optional<User> maybeUser = userRepository.findById(id);

        if (maybeUser.isPresent()) {
            Set<BookingNotification> notifications = maybeUser.get().getBookingNotifications();
            List<BookingNotificationDto> notificationDtos = notifications.stream()
                    .map(BookingNotificationDto::valueFrom)
                    .toList();

            for (BookingNotification notification : notifications) {
                bookingNotificationRepository.deleteById(notification.getId());
            }

            return Optional.of(notificationDtos);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<BookingNotificationDto> getAll() {
        List<BookingNotification> notifications = bookingNotificationRepository.findAll();
        List<BookingNotificationDto> notificationDtos = notifications.stream()
                .map(BookingNotificationDto::valueFrom)
                .toList();

        for (BookingNotification notification : notifications) {
            bookingNotificationRepository.deleteById(notification.getId());
        }

        return notificationDtos;
    }
}
