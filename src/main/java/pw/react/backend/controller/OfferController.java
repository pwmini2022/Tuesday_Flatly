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

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import pw.react.backend.models.Offer;
import pw.react.backend.models.User;
import pw.react.backend.services.IOfferService;
import pw.react.backend.services.UserService;
import pw.react.backend.web.OfferDto;
import pw.react.backend.dao.OfferRepository;

@RestController
@RequestMapping(path = OfferController.OFFERS_PATH)
public class OfferController {
    public static final String OFFERS_PATH = "/offers";
    private static final Logger log = LoggerFactory.getLogger(OfferController.class);

    private final OfferRepository offerRepository;

    private final IOfferService offerService;
    private UserService userService;

    public OfferController(OfferRepository repository, IOfferService offerService) {
        this.offerRepository = repository;
        this.offerService = offerService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "List all offers")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All offers sent, OK")
    })
    @GetMapping(path = "")
    public ResponseEntity<Collection<OfferDto>> getAllOffers(@RequestHeader HttpHeaders headers,
        @RequestParam(required = false) Long ownerId) {
        logHeaders(headers);

        if (ownerId != null) {
            Optional<Collection<OfferDto>> maybeSpecificOffers = userService.getAllOffers(ownerId);
            if (maybeSpecificOffers.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(maybeSpecificOffers.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else {
            return ResponseEntity.ok(offerRepository.findAll().stream().map((Offer Offer) -> {
                System.out.println(Offer.getOwner().getId());
                return OfferDto.valueFrom(Offer);
            }).collect(toList()));
        }
    }

    @Operation(summary = "Create new Offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Offer created")
    })
    @PostMapping(path = "")
    public ResponseEntity<Collection<OfferDto>> createOffers(@RequestHeader HttpHeaders headers,
            @RequestBody List<OfferDto> offers,
            @RequestParam Long ownerId) {
        logHeaders(headers);
        Optional<User> maybeUser = userService.findById(ownerId);

        if (maybeUser.isPresent()) {
            List<Offer> createdOffers = offers.stream()
                    .map((OfferDto dto) -> OfferDto.convertToOffer(dto, maybeUser.get())).toList();
            List<OfferDto> result = offerRepository.saveAll(createdOffers)
                    .stream()
                    .map(OfferDto::valueFrom)
                    .toList();
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Operation(summary = "Update an offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Offer [ID: ...] updated"),
            @ApiResponse(responseCode = "400", description = "Offer [ID: ...] does not exist")
    })
    @PutMapping(path = "")
    public ResponseEntity<String> updateOffer(@RequestHeader HttpHeaders headers,
            @RequestBody OfferDto updatedOffer,
            @RequestParam Long offerId) {
        Offer offer = OfferDto.convertToOffer(updatedOffer);
        offer.setId(offerId);
        if (offerService.updateOffer(offerId, offer).isEmpty()) {
            return ResponseEntity.badRequest().body(String.format("Offer [ID: %d] does not exist.", offerId));
        }
        return ResponseEntity.ok(String.format("Offer [ID: %d] updated.", offerId));
    }

    @Operation(summary = "Delete an offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Offer [ID: ...] deleted"),
            @ApiResponse(responseCode = "400", description = "Offer [ID: ...] does not exist")
    })
    @DeleteMapping(path = "")
    public ResponseEntity<String> deleteOffer(@RequestHeader HttpHeaders headers,
            @RequestParam Long offerId) {
        logHeaders(headers);
        boolean deleted = offerService.deleteOffer(offerId);

        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Offer [ID: %d] does not exist", offerId));
        }
        return ResponseEntity.ok(String.format("Offer [ID: %d] deleted", offerId));
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(",")));
    }
}
