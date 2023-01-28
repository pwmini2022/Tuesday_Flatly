package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import pw.react.backend.models.OfferImage;

@Transactional
public interface OfferImageRepository extends JpaRepository<OfferImage, String> {
}
