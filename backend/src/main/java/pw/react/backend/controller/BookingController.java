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

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.Arrays;

import pw.react.backend.models.Booking;
import pw.react.backend.services.IBookingService;
import pw.react.backend.services.IOfferService;
import pw.react.backend.services.UserService;
import pw.react.backend.utils.MySimpleUtils;
import pw.react.backend.web.BookingDto;
import pw.react.backend.dao.BookingRepository;

@RestController
@RequestMapping(path = BookingController.BOOKINGS_PATH)
public class BookingController {
    public static final String BOOKINGS_PATH = "/logic/api/bookings";
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
    @GetMapping(path = {"", "/{bookingUuid}"})
    public ResponseEntity<Collection<BookingDto>> getBookings(@RequestHeader HttpHeaders headers,
            @PathVariable(required = false) String bookingUuid,
            @RequestParam(required = false) String offerUuid,
            @RequestParam(required = false) Long ownerId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer itemsOnPage) {
        logHeaders(headers);

        List<BookingDto> bookingDtos = null;

        if (bookingUuid != null) { // speicific booking
            Optional<Booking> maybeBooking = repository.findById(bookingUuid);

            if (maybeBooking.isPresent()) {
                bookingDtos = new ArrayList<>();
                bookingDtos.add(BookingDto.valueFrom(maybeBooking.get()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (offerUuid != null) { // bookings by offer
            Optional<Collection<BookingDto>> maybeSpecificBookings = offerService.getAllBookings(offerUuid);
            if (maybeSpecificBookings.isPresent()) {
                bookingDtos = new ArrayList<>(maybeSpecificBookings.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (ownerId != null) { // bookings by user
            Optional<Collection<BookingDto>> maybeSpecificBookings = userService.getAllBookings(ownerId);
            if (maybeSpecificBookings.isPresent()) {
                bookingDtos = new ArrayList<>(maybeSpecificBookings.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else { // all bookings
            bookingDtos = repository.findAll().stream().map(BookingDto::valueFrom)
                    .collect(toList());
        }

        // again, not redundant b/c paging
        if (bookingDtos.isEmpty()) {
            ResponseEntity.ok(bookingDtos);
        }

        if (page != null && itemsOnPage == null || page == null && itemsOnPage != null) {
            return ResponseEntity.badRequest().body(null);
        }

        if (page != null && itemsOnPage != null) {
            bookingDtos = MySimpleUtils.getPage(bookingDtos, page, itemsOnPage);

            if (bookingDtos.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        return ResponseEntity.ok(bookingDtos);
    }

    @Operation(summary = "Create new booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Booking created"),
            @ApiResponse(responseCode = "400", description = "Admin doesn't exist")
    })
    @PostMapping(path = {"/{offerUuid}"})
    public ResponseEntity<Collection<BookingDto>> createBookings(@RequestHeader HttpHeaders headers,
            @RequestBody List<BookingDto> bookings,
            @PathVariable String offerUuid) {
        logHeaders(headers);

        Optional<Collection<BookingDto>> maybeSaved = bookingService.saveAll(bookings, offerUuid);
        return maybeSaved.isPresent() ? ResponseEntity.status(HttpStatus.CREATED).body(maybeSaved.get())
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Operation(summary = "Create new booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Booking created"),
            @ApiResponse(responseCode = "400", description = "Admin doesn't exist")
    })
    @PostMapping(path = {""})
    public ResponseEntity<BookingDto> createBooking(@RequestHeader HttpHeaders headers,
            @RequestBody BookingDto booking) {
        logHeaders(headers);

        String offerUuid = booking.offer_uuid();
        Optional<Collection<BookingDto>> maybeSaved = bookingService.saveAll(Arrays.asList(booking), offerUuid);
        return maybeSaved.isPresent() ? ResponseEntity.status(HttpStatus.CREATED).body(maybeSaved.get().iterator().next())
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Operation(summary = "Update a booking")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Booking [UUID: ...] updated"),
            @ApiResponse(responseCode = "400", description = "Booking [UUID: ...] does not exist")
    })
    @PutMapping(path = "/{bookingUuid}")
    public ResponseEntity<String> updateBooking(@RequestHeader HttpHeaders headers,
            @PathVariable String bookingUuid,
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
    @DeleteMapping(path = "/{bookingUuid}")
    public ResponseEntity<String> deleteBooking(@RequestHeader HttpHeaders headers,
            @PathVariable String bookingUuid) {
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