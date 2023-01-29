package pw.react.backend.web;

import pw.react.backend.models.Offer;
import pw.react.backend.models.User;

public record OfferDto(String uuid,
        long owner_id,
        String name,
        Long price,
        String location,
        Long dateFrom,
        Long dateTo,
        Long numberOfKids,
        Long numberOfAdults) {

    public static final OfferDto EMPTY = new OfferDto("", 0, "", 0L, "", 0L, 0L, 0L, 0L);

    public static OfferDto valueFrom(Offer offer) {
        return new OfferDto(offer.getUuid(), offer.getOwner().getId(), offer.getName(), offer.getPrice(), offer.getLocation(), offer.getDateFrom(), offer.getDateTo(), offer.getNumberOfKids(), offer.getNumberOfAdults());
    }

    public static Offer convertToOffer(OfferDto offerDto) { // sus
        Offer offer = new Offer();

        offer.setUuid(offerDto.uuid());
        offer.setName(offerDto.name());
        offer.setPrice(offerDto.price());
        offer.setLocation(offerDto.location());
        offer.setDateFrom(offerDto.dateFrom());
        offer.setDateTo(offerDto.dateTo());
        offer.setNumberOfKids(offerDto.numberOfKids());
        offer.setNumberOfAdults(offerDto.numberOfAdults());

        return offer;
    }

    public static Offer convertToOffer(OfferDto offerDto, User admin) { // sus
        Offer offer = new Offer();

        offer.setUuid(offerDto.uuid());
        offer.setName(offerDto.name());
        offer.setPrice(offerDto.price());
        offer.setOwner(admin);
        offer.setLocation(offerDto.location());
        offer.setDateFrom(offerDto.dateFrom());
        offer.setDateTo(offerDto.dateTo());
        offer.setNumberOfKids(offerDto.numberOfKids());
        offer.setNumberOfAdults(offerDto.numberOfAdults());

        return offer;
    }
}
