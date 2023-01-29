package pw.react.backend.services;

import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import pw.react.backend.models.OfferImage;

public interface IOfferImageService {
    Optional<OfferImage> storeOfferImage(String offerUuid, MultipartFile file);
    Optional<OfferImage> findByUuid(String uuid);
    boolean deleteByUuid(String uuid);
}
