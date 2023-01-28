package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;

import java.util.Collection;
import java.util.Optional;

import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

import pw.react.backend.dao.OfferImageRepository;
import pw.react.backend.models.Offer;
import pw.react.backend.models.OfferImage;
import pw.react.backend.services.IOfferImageService;
import pw.react.backend.services.IOfferService;
import pw.react.backend.web.OfferImageInfo;

@RestController
@RequestMapping(path = OfferImageController.OFFER_IMAGES_PATH)
public class OfferImageController {
    public static final String OFFER_IMAGES_PATH = "/offerImages";
    private static final Logger log = LoggerFactory.getLogger(OfferImageController.class);

    private final OfferImageRepository offerImageRepository;
    private final IOfferImageService offerImageService;
    private IOfferService offerService;

    @Autowired
    public void setCompanyLogoService(IOfferService offerService) {
        this.offerService = offerService;
    }

    public OfferImageController(OfferImageRepository repository, IOfferImageService offerImageService) {
        this.offerImageRepository = repository;
        this.offerImageService = offerImageService;
    }

    @PostMapping("/{offerId}")
    public ResponseEntity<OfferImageInfo> uploadOfferImage(@RequestHeader HttpHeaders headers,
            @PathVariable Long offerId,
            @RequestParam("file") MultipartFile file) {
        logHeaders(headers);

        Optional<OfferImage> maybeOfferImage = offerImageService.storeOfferImage(offerId, file);
        return maybeOfferImage.isPresent()
                ? ResponseEntity.status(HttpStatus.CREATED).body(OfferImageInfo.valueFrom(maybeOfferImage.get()))
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/{offerImageUuid}")
    public ResponseEntity<Resource> getOfferImage(@RequestHeader HttpHeaders headers,
            @PathVariable String offerImageUuid) {
        logHeaders(headers);
        Optional<OfferImage> maybeOfferImage = offerImageService.findByUuid(offerImageUuid);

        return maybeOfferImage.isPresent() ? ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(maybeOfferImage.get().getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + maybeOfferImage.get().getFileName() + "\"")
                .body(new ByteArrayResource(maybeOfferImage.get().getData()))
                : ResponseEntity.badRequest().body(null);
    }

    @GetMapping("")
    public ResponseEntity<Collection<OfferImageInfo>> getOfferImagesInfo(@RequestHeader HttpHeaders headers,
            @RequestParam(required = false) Long offerId) {
        logHeaders(headers);

        if (offerId != null) {
            Optional<Offer> maybeOffer = offerService.findById(offerId);
            return maybeOffer.isPresent()
                    ? ResponseEntity.ok(maybeOffer.get().getImages().stream().map(OfferImageInfo::valueFrom)
                            .collect(toList()))
                    : ResponseEntity.badRequest().body(null);
        } else {
            return ResponseEntity.ok(offerImageRepository.findAll().stream().map(OfferImageInfo::valueFrom)
                    .collect(toList()));
        }
    }

    @DeleteMapping("/{offerImageUuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> deleteOfferImage(@RequestHeader HttpHeaders headers,
            @PathVariable String offerImageUuid) {
        logHeaders(headers);
        return offerImageService.deleteByUuid(offerImageUuid)
                ? ResponseEntity.ok(String.format("Offer image [UUID: %s] deleted", offerImageUuid))
                : ResponseEntity.badRequest()
                        .body(String.format("Offer image [UUID: %s] does not exist", offerImageUuid));
    }

    private void logHeaders(@RequestHeader HttpHeaders headers) {
        log.info("Controller request headers {}",
                headers.entrySet()
                        .stream()
                        .map(entry -> String.format("%s->[%s]", entry.getKey(), String.join(",", entry.getValue())))
                        .collect(joining(",")));
    }
}
