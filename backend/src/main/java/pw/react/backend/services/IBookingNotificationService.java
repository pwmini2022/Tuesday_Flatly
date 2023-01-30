package pw.react.backend.services;

import java.util.List;
import java.util.Optional;

import pw.react.backend.models.BookingNotification;
import pw.react.backend.web.BookingDto;
import pw.react.backend.web.BookingNotificationDto;

public interface IBookingNotificationService {
    public static final Integer DELETED = 0; // TODO: consider enum?
    public static final Integer UPDATED = 1;
    public static final Integer CREATED = 2;

    BookingNotification save(BookingDto booking, String offerUuid, Integer actionType);

    // should be "destructive get" ig
    // like deletes whatever it finds
    Optional<List<BookingNotificationDto>> getByOffer(String offerUuid);
    Optional<List<BookingNotificationDto>> getByUser(Long id);
    List<BookingNotificationDto> getAll();
}
