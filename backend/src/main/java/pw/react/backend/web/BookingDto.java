package pw.react.backend.web;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import java.time.LocalDateTime;

import pw.react.backend.models.Booking;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;

public record BookingDto(String uuid,
                        long admin_id,
                        long offer_id,
                         @JsonDeserialize(using = JsonDateDeserializer.class) @JsonSerialize(using = JsonDateSerializer.class)
                         LocalDateTime startDate,
                         @JsonDeserialize(using = JsonDateDeserializer.class) @JsonSerialize(using = JsonDateSerializer.class)
                         LocalDateTime endDate,
                         String first_name,
                         String last_name) {

    public static final BookingDto EMPTY = new BookingDto("", 0, 0, null, null, "", "");

    public static BookingDto valueFrom(Booking booking) {
        return new BookingDto(booking.getUuid(), booking.getAdmin().getId(), booking.getOffer().getId(), booking.getStartDate(), booking.getEndDate(), booking.getFirstName(), booking.getLastName());
    }

    public static Booking convertToBooking(BookingDto bookingDto) { // suus
        Booking booking = new Booking();

        booking.setUuid(bookingDto.uuid());
        booking.setStartDate(bookingDto.startDate());
        booking.setEndDate(bookingDto.endDate());
        booking.setFirstName(bookingDto.first_name());
        booking.setLastName(bookingDto.last_name());

        return booking;
    }

    public static Booking convertToBooking(BookingDto bookingDto, Offer offer, User admin) {
        Booking booking = new Booking();

        booking.setUuid(bookingDto.uuid());
        booking.setOffer(offer);
        booking.setAdmin(admin);
        booking.setStartDate(bookingDto.startDate());
        booking.setEndDate(bookingDto.endDate());
        booking.setFirstName(bookingDto.first_name());
        booking.setLastName(bookingDto.last_name());

        return booking;
    }
}
