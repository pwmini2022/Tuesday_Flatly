package pw.react.backend.services;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;

import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.web.OfferDto;

public interface UserService {
    User validateAndSave(User user);
    User updatePassword(User user, String password);
    void setPasswordEncoder(PasswordEncoder passwordEncoder);
    Optional<User> findById(Long id);
    Optional<Collection<OfferDto>> getAllOffers(Long id);
    Optional<Collection<BookingDto>> getAllBookings(Long uuid);
}
