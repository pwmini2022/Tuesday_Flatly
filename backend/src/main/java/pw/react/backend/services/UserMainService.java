package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.exceptions.UserValidationException;
import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.web.BookingDto;
import pw.react.backend.web.OfferDto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class UserMainService implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserMainService.class);

    private final UserRepository userRepository;
    private IOfferService offerService;
    private PasswordEncoder passwordEncoder;

    public UserMainService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setUserService(IOfferService offerService) {
        this.offerService = offerService;
    }

    @Override
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User validateAndSave(User user) {
        if (isValidUser(user)) {
            log.info("User is valid");
            Optional<User> dbUser = userRepository.findByUsername(user.getUsername());
            if (dbUser.isPresent()) {
                log.info("User already exists. Updating it.");
                user.setId(dbUser.get().getId());
            }
            user = userRepository.save(user);
            log.info("User was saved.");
        }
        return user;
    }

    private boolean isValidUser(User user) {
        if (user != null) {
            if (!isValid(user.getUsername())) {
                log.error("Empty username.");
                throw new UserValidationException("Empty username.");
            }
            if (!isValid(user.getPassword())) {
                log.error("Empty user password.");
                throw new UserValidationException("Empty user password.");
            }
            if (!isValid(user.getEmail())) {
                log.error("UEmpty email.");
                throw new UserValidationException("Empty email.");
            }
            return true;
        }
        log.error("User is null.");
        throw new UserValidationException("User is null.");
    }

    private boolean isValid(String value) {
        return value != null && !value.isBlank();
    }

    @Override
    public User updatePassword(User user, String password) {
        if (isValidUser(user)) {
            if (passwordEncoder != null) {
                log.debug("Encoding password.");
                user.setPassword(passwordEncoder.encode(password));
            } else {
                log.debug("Password in plain text.");
                user.setPassword(password);
            }
            user = userRepository.save(user);
        }
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<Collection<OfferDto>> getAllOffers(Long id) {
        Optional<User> maybeUser = userRepository.findById(id);

        return maybeUser.isPresent() ? Optional.of(maybeUser.get()
                .getOffers()
                .stream()
                .map(OfferDto::valueFrom)
                .toList()) : Optional.empty();
    }

    @Override
    public Optional<Collection<BookingDto>> getAllBookings(Long id) {
        Optional<User> maybeUser = userRepository.findById(id);

        return maybeUser.isPresent() ? Optional.of(maybeUser.get()
                .getBookings()
                .stream()
                .map(BookingDto::valueFrom)
                .toList()) : Optional.empty();
    }
}
