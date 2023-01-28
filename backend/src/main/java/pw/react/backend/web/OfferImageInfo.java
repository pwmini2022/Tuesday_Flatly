package pw.react.backend.web;

import pw.react.backend.models.OfferImage;

public record OfferImageInfo(String offerImageUuid,
        String fileName,
        String fileType,
        long fileSize) {
    public static OfferImageInfo valueFrom(OfferImage offerImage) {
        return new OfferImageInfo(
                offerImage.getUuid(),
                offerImage.getFileName(),
                offerImage.getFileType(),
                offerImage.getFileSize());
    }
}
