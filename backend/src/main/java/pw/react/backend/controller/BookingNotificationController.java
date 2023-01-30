package pw.react.backend.controller;

import java.util.Optional;

import static java.util.stream.Collectors.joining;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pw.react.backend.services.IBookingNotificationService;
import pw.react.backend.web.BookingNotificationDto;

@RestController
@RequestMapping(path = BookingNotificationController.NOTIFICATIONS_PATH)
public class BookingNotificationController {
    public static final String NOTIFICATIONS_PATH = "/logic/api/notifications";
    private static final Logger log = LoggerFactory.getLogger(BookingNotificationController.class);

    @Autowired
    private IBookingNotificationService bookingNotificationService;

    @GetMapping({"", "/{userId}"})
    public ResponseEntity<List<BookingNotificationDto>> getNotifications(@RequestHeader HttpHeaders headers,
            @PathVariable(required = false) Long userId,
            @RequestParam(required = false) String offerUuid) {
        logHeaders(headers);

        List<BookingNotificationDto> notificationDtos = null;
        if (offerUuid != null) {
            Optional<List<BookingNotificationDto>> maybeNotifications = bookingNotificationService.getByOffer(offerUuid);

            if (maybeNotifications.isPresent()) {
                notificationDtos = maybeNotifications.get();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (userId != null) {
            Optional<List<BookingNotificationDto>> maybeNotifications = bookingNotificationService.getByUser(userId);

            if (maybeNotifications.isPresent()) {
                notificationDtos = maybeNotifications.get();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else {
            notificationDtos = bookingNotificationService.getAll();
        }

        return ResponseEntity.ok(notificationDtos);
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(",")));
    }
}
