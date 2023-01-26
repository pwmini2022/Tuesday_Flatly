package pw.react.backend.services;

import java.util.Optional;

import pw.react.backend.models.Booking;

public interface IBookingService {
    Optional<Booking> updateBooking(String uuid, Booking updatedCompany);
    boolean deleteBooking(String uuid);
}
