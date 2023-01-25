package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
