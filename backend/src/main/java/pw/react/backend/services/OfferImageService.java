package pw.react.backend.services;

import java.io.IOException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import pw.react.backend.dao.OfferImageRepository;
import pw.react.backend.exceptions.InvalidFileException;
import pw.react.backend.models.Offer;
import pw.react.backend.models.OfferImage;

public class OfferImageService implements IOfferImageService {
    private final Logger logger = LoggerFactory.getLogger(OfferImageService.class);

    private final OfferImageRepository repository;
    private IOfferService offerService;

    @Autowired
    public void setOfferService(IOfferService offerService) {
        this.offerService = offerService;
    }

    public OfferImageService(OfferImageRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<OfferImage> storeOfferImage(Long offerId, MultipartFile file) {
        Optional<Offer> maybeOffer = offerService.findById(offerId);
        if (maybeOffer.isEmpty()) {
            return Optional.empty();
        }

        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new InvalidFileException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            OfferImage offerImage = new OfferImage(maybeOffer.get(), file, file.getBytes());
            //repository.findByCompanyId(companyId).ifPresent(companyLogo -> newCompanyLogo.setId(companyLogo.getId())); // ???
            return Optional.of(repository.save(offerImage));
        } catch (IOException ex) {
            throw new InvalidFileException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public Optional<OfferImage> findByUuid(String uuid) {
        return repository.findById(uuid);
    }

    @Override
    public boolean deleteByUuid(String uuid) {
        boolean result = false;
        if (repository.existsById(uuid)) {
            repository.deleteById(uuid);
            logger.info("OfferImage [UUID: {}] deleted.", uuid);
            result = true;
        }
        return result;
    }
}
