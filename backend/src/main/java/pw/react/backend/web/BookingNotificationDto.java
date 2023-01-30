package pw.react.backend.web;

import pw.react.backend.models.BookingNotification;

public record BookingNotificationDto(
        Long id,
        String bookingUuid,
        String offerUuid,
        Long ownerId,
        Integer actionType,
        Long actionTime) {

    public static final BookingNotificationDto EMPTY = new BookingNotificationDto(0L, "", "", 0L, 0, 0L);

    public static BookingNotificationDto valueFrom(BookingNotification bookingNotification) {
        return new BookingNotificationDto(bookingNotification.getId(),
                bookingNotification.getBookingUuid(),
                bookingNotification.getOffer().getUuid(),
                bookingNotification.getOwner().getId(),
                bookingNotification.getActionType(),
                bookingNotification.getActionTime());
    }
}
