package pw.react.backend.web;

import pw.react.backend.models.Booking;
import pw.react.backend.models.Offer;

public record BookingDto(String uuid,
                        long admin_id,
                        String offer_uuid,
                         long dateFrom,
                         long dateTo,
                         String first_name,
                         String last_name,
                         long numberOfKids,
                         long numberOfAdults) {

    public static final BookingDto EMPTY = new BookingDto("", 0, "", 0, 0, "", "", 0, 0);

    public static BookingDto valueFrom(Booking booking) {
        return new BookingDto(booking.getUuid(), booking.getAdmin().getId(), booking.getOffer().getUuid(), booking.getDateFrom(), booking.getDateTo(), booking.getFirstName(), booking.getLastName(), booking.getNumberOfKids(), booking.getNumberOfAdults());
    }

    public static Booking convertToBooking(BookingDto bookingDto) {
        Booking booking = new Booking();

        booking.setUuid(bookingDto.uuid());
        booking.setDateFrom(bookingDto.dateFrom());
        booking.setDateTo(bookingDto.dateTo());
        booking.setFirstName(bookingDto.first_name());
        booking.setLastName(bookingDto.last_name());
        booking.setNumberOfKids(bookingDto.numberOfKids());
        booking.setNumberOfAdults(bookingDto.numberOfAdults());

        return booking;
    }

    public static Booking convertToBooking(BookingDto bookingDto, Offer offer) {
        Booking booking = new Booking();

        booking.setUuid(bookingDto.uuid());
        booking.setOffer(offer);
        booking.setAdmin(offer.getOwner());
        booking.setDateFrom(bookingDto.dateFrom());
        booking.setDateTo(bookingDto.dateTo());
        booking.setFirstName(bookingDto.first_name());
        booking.setLastName(bookingDto.last_name());
        booking.setNumberOfKids(bookingDto.numberOfKids());
        booking.setNumberOfAdults(bookingDto.numberOfAdults());

        return booking;
    }
}
