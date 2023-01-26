package pw.react.backend.web;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pw.react.backend.utils.JsonDateDeserializer;
import pw.react.backend.utils.JsonDateSerializer;

import java.time.LocalDateTime;

import pw.react.backend.models.Offer;
import pw.react.backend.models.User;

public record OfferDto(long id,
        long owner_id,
        String location,
        @JsonDeserialize(using = JsonDateDeserializer.class) @JsonSerialize(using = JsonDateSerializer.class) LocalDateTime startDate,
        @JsonDeserialize(using = JsonDateDeserializer.class) @JsonSerialize(using = JsonDateSerializer.class) LocalDateTime endDate,
        int numberOfKids,
        int numberOfAdults) {

    public static final OfferDto EMPTY = new OfferDto(-1, 0, "", null, null, 0, 0);

    public static OfferDto valueFrom(Offer offer) {
        return new OfferDto(offer.getId(), offer.getOwner().getId(), offer.getLocation(), offer.getDateFrom(), offer.getDateTo(), offer.getNumberOfKids(), offer.getNumberOfAdults());
    }

    public static Offer convertToOffer(OfferDto offerDto) { // sus
        Offer offer = new Offer();

        offer.setId(offerDto.id());
        offer.setLocation(offerDto.location());
        offer.setDateFrom(offerDto.startDate());
        offer.setDateTo(offerDto.endDate());
        offer.setNumberOfKids(offerDto.numberOfKids());
        offer.setNumberOfAdults(offerDto.numberOfAdults());

        return offer;
    }

    public static Offer convertToOffer(OfferDto offerDto, User admin) { // sus
        Offer offer = new Offer();

        offer.setId(offerDto.id());
        offer.setOwner(admin);
        offer.setLocation(offerDto.location());
        offer.setDateFrom(offerDto.startDate());
        offer.setDateTo(offerDto.endDate());
        offer.setNumberOfKids(offerDto.numberOfKids());
        offer.setNumberOfAdults(offerDto.numberOfAdults());

        return offer;
    }
}
