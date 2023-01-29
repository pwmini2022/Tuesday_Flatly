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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import pw.react.backend.models.Offer;
import pw.react.backend.services.IOfferService;
import pw.react.backend.services.UserService;
import pw.react.backend.utils.MySimpleUtils;
import pw.react.backend.web.OfferDto;
import pw.react.backend.dao.OfferRepository;

@RestController
@RequestMapping(path = OfferController.OFFERS_PATH)
public class OfferController {
    public static final String OFFERS_PATH = "/logic/api/offers";
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
    @GetMapping(path = {"", "/{offerUuid}"})
    public ResponseEntity<Collection<OfferDto>> getAllOffers(@RequestHeader HttpHeaders headers,
            @PathVariable(required = false) String offerUuid,
            @RequestParam(required = false) Long ownerId,

            @RequestParam(required = false) String location,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long dateFrom,
            @RequestParam(required = false) Long dateTo,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer itemsOnPage,
            @RequestParam(required = false) Long numberOfAdults,
            @RequestParam(required = false) Long numberOfKids) {
        logHeaders(headers);

        List<OfferDto> offerDtos = null;

        if (offerUuid != null) {
            Optional<Offer> maybeOffer = offerService.findById(offerUuid);

            if (maybeOffer.isPresent()) {
                offerDtos = new ArrayList<>();
                offerDtos.add(OfferDto.valueFrom(maybeOffer.get()));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else if (ownerId != null) {
            Optional<Collection<OfferDto>> maybeSpecificOffers = userService.getAllOffers(ownerId);
            if (maybeSpecificOffers.isPresent()) {
                offerDtos = new ArrayList<>(maybeSpecificOffers.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(offerDtos);
            }
        } else {
            offerDtos = offerRepository.findAll().stream().map((Offer Offer) -> {
                System.out.println(Offer.getOwner().getId());
                return OfferDto.valueFrom(Offer);
            }).collect(toList());
        }

        if (sortBy != null) {
            if (sortBy.contains("name")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.name().compareTo(dto2.name());
                });
            } else if (sortBy.contains("location")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.location().compareTo(dto2.location());
                });
            } else if (sortBy.contains("price")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.price().compareTo(dto2.price());
                });
            } else if (sortBy.contains("kids")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.numberOfKids().compareTo(dto2.numberOfKids());
                });
            } else if (sortBy.contains("adults")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.numberOfAdults().compareTo(dto2.numberOfAdults());
                });
            } else if (sortBy.contains("from")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.dateFrom().compareTo(dto2.dateFrom());
                });
            } else if (sortBy.contains("to")) {
                offerDtos.sort((OfferDto dto1, OfferDto dto2) -> {
                    return dto1.dateTo().compareTo(dto2.dateTo());
                });
            }

            if (sortBy.contains("-")) {
                Collections.reverse(offerDtos);
            }
        }

        Stream<OfferDto> offerDtoStream = offerDtos.stream();

        if (location != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.location().contains(location);
            });
        }

        if (name != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.location().contains(name);
            });
        }

        if (numberOfAdults != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.numberOfAdults() >= numberOfAdults;
            });
        }

        if (numberOfKids != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.numberOfKids() >= numberOfKids;
            });
        }

        if (dateFrom != null && dateTo != null && dateFrom > dateTo) {
            return ResponseEntity.badRequest().body(null); // meh?
        }

        if (dateFrom != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.dateFrom() <= dateFrom && dateFrom <= dto.dateTo();
            });
        }

        if (dateTo != null) {
            offerDtoStream = offerDtoStream.filter((OfferDto dto) -> {
                return dto.dateFrom() <= dateTo && dateTo <= dto.dateTo();
            });
        }

        offerDtos = offerDtoStream.collect(toList());

        // this is to avoid sending error codes for responses that were empty
        // without even failing to page...
        if (offerDtos.isEmpty()) {
            ResponseEntity.ok(offerDtos);
        }

        if (page != null && itemsOnPage == null || page == null && itemsOnPage != null) {
            return ResponseEntity.badRequest().body(null);
        }

        if (page != null && itemsOnPage != null) {
            offerDtos = MySimpleUtils.getPage(offerDtos, page, itemsOnPage);

            // ...so now we can only get empty pages from getting bad
            // request params
            if (offerDtos.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        return ResponseEntity.ok(offerDtos);
    }

    @Operation(summary = "Create new Offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Offer created")
    })
    @PostMapping(path = "/{ownerId}")
    public ResponseEntity<Collection<OfferDto>> createOffers(@RequestHeader HttpHeaders headers,
            @RequestBody List<OfferDto> offers,
            @PathVariable Long ownerId) {
        logHeaders(headers);
        Optional<Collection<OfferDto>> maybeSaved = offerService.saveAll(offers, ownerId);
        return maybeSaved.isPresent() ? ResponseEntity.status(HttpStatus.CREATED).body(maybeSaved.get())
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @Operation(summary = "Update an offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Offer [ID: ...] updated"),
            @ApiResponse(responseCode = "400", description = "Offer [ID: ...] does not exist")
    })
    @PutMapping(path = "")
    public ResponseEntity<String> updateOffer(@RequestHeader HttpHeaders headers,
            @RequestBody OfferDto updatedOffer,
            @RequestParam String offerUuid) {
        Offer offer = OfferDto.convertToOffer(updatedOffer);
        offer.setUuid(offerUuid);
        if (offerService.updateOffer(offerUuid, offer).isEmpty()) {
            return ResponseEntity.badRequest().body(String.format("Offer [ID: %s] does not exist.", offerUuid));
        }
        return ResponseEntity.ok(String.format("Offer [ID: %s] updated.", offerUuid));
    }

    @Operation(summary = "Delete an offer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Offer [ID: ...] deleted"),
            @ApiResponse(responseCode = "400", description = "Offer [ID: ...] does not exist")
    })
    @DeleteMapping(path = "")
    public ResponseEntity<String> deleteOffer(@RequestHeader HttpHeaders headers,
            @RequestParam String offerUuid) {
        logHeaders(headers);
        boolean deleted = offerService.deleteOffer(offerUuid);

        if (!deleted) {
            return ResponseEntity.badRequest().body(String.format("Offer [ID: %s] does not exist", offerUuid));
        }
        return ResponseEntity.ok(String.format("Offer [ID: %s] deleted", offerUuid));
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(",")));
    }
}
