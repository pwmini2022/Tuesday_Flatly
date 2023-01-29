package pw.react.backend.services;

import java.util.Collection;
import java.util.Optional;

import pw.react.backend.models.Booking;
import pw.react.backend.web.BookingDto;

public interface IBookingService {
    Optional<Booking> updateBooking(String uuid, Booking updatedCompany);
    boolean deleteBooking(String uuid);
    Optional<Collection<BookingDto>> saveAll(Collection<BookingDto> bookings, String offerUuid);
}
