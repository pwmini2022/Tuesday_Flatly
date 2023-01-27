package pw.react.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import pw.react.backend.models.Offer;
import pw.react.backend.models.Booking;
import pw.react.backend.services.IBookingService;
import pw.react.backend.services.IOfferService;
import pw.react.backend.services.UserService;
import pw.react.backend.web.BookingDto;
import pw.react.backend.dao.BookingRepository;

@RestController
@RequestMapping(path = BookingController.BOOKINGS_PATH)
public class BookingController {
    public static final String BOOKINGS_PATH = "/bookings";
    private static final Logger log = LoggerFactory.getLogger(BookingController.class);

    private final BookingRepository repository;
    private final IBookingService bookingService;
    private UserService userService;
    private IOfferService offerService;

    public BookingController(BookingRepository repository, IBookingService bookingService) {
        this.repository = repository;
        this.bookingService = bookingService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setOfferService(IOfferService offerService) {
        this.offerService = offerService;
    }

    @Operation(summary = "List all bookings")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All bookings sent, OK"),
            @ApiResponse(responseCode = "200", description = "Bookings for specific offer sent, OK"),
            @ApiResponse(responseCode = "400", description = "Offer doesn't exist")
    })
    @GetMapping(path = "")
    public ResponseEntity<Collection<BookingDto>> getAllBookings(@RequestHeader HttpHeaders headers,
            @RequestParam(required = false) Long offerId,
            @RequestParam(required = false) Long ownerId) {
        logHeaders(headers);
        if (offerId != null) { // bookings by offer
            Optional<Collection<BookingDto>> maybeSpecificBookings = offerService.getAllBookings(offerId);
            if (maybeSpecificBookings.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(maybeSpecificBookings.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (ownerId != null) { // bookings by user
            Optional<Collection<BookingDto>> maybeSpecificBookings = userService.getAllBookings(ownerId);
            if (maybeSpecificBookings.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(maybeSpecificBookings.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else { // all bookings
            return ResponseEntity.ok(repository.findAll().stream().map(BookingDto::valueFrom)
                    .collect(toList()));
        }
    }

    @Operation(summary = "Create new booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Booking created"),
            @ApiResponse(responseCode = "400", description = "Admin doesn't exist")
    })
    @PostMapping(path = "")
    public ResponseEntity<Collection<BookingDto>> createBookings(@RequestHeader HttpHeaders headers,
            @RequestBody List<BookingDto> bookings,
            @RequestParam Long offerId) {
        logHeaders(headers);
        Optional<Offer> maybeOffer = offerService.findById(offerId);
        if (maybeOffer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        List<Booking> createdBookings = bookings.stream()
                .map((BookingDto dto) -> BookingDto.convertToBooking(dto, maybeOffer.get()))
                .toList();
        List<BookingDto> result = repository.saveAll(createdBookings)
                .stream()
                .map(BookingDto::valueFrom)
                .toList();
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @Operation(summary = "Update a booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Booking [UUID: ...] updated"),
            @ApiResponse(responseCode = "400", description = "Booking [UUID: ...] does not exist")
    })
    @PutMapping(path = "")
    public ResponseEntity<String> updateBooking(@RequestHeader HttpHeaders headers,
            @RequestParam String bookingUuid,
            @Valid @RequestBody BookingDto updatedBooking) {
        Booking booking = BookingDto.convertToBooking(updatedBooking);
        booking.setUuid(bookingUuid);
        if (bookingService.updateBooking(bookingUuid, booking).isEmpty()) {
            return ResponseEntity.badRequest().body(String.format("Booking [ID: %s] does not exist.", bookingUuid));
        }
        return ResponseEntity.ok(String.format("Booking [ID: %s] updated.", bookingUuid));
    }

    @Operation(summary = "Delete a booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Booking [UUID: ...] deleted"),
            @ApiResponse(responseCode = "400", description = "Booking [UUID: ...] does not exist")
    })
    @DeleteMapping(path = "")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
            @RequestParam String bookingUuid) {
        logHeaders(headers);
        boolean deleted = bookingService.deleteBooking(bookingUuid);

        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Booking [UUID: %s] does not exist", bookingUuid));
        }
        return ResponseEntity.ok(String.format("Booking [UUID: %s] deleted", bookingUuid));
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(",")));
    }
}