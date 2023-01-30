package pw.react.backend.web;

import java.util.Arrays;
import java.util.List;

public record ExternalBookingNotificationDto(String service,
                        List<String> bookings) {

    public static final ExternalBookingNotificationDto EMPTY = new ExternalBookingNotificationDto("", null);

    public static ExternalBookingNotificationDto valueFrom(String bookingUuid) {
        return new ExternalBookingNotificationDto("FLATLY", Arrays.asList(bookingUuid));
    }
}
