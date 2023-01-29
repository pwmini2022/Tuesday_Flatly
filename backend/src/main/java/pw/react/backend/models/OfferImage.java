package pw.react.backend.models;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "offer_images")
public class OfferImage {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String uuid;

    private String fileName;
    private String fileType;
    private Long fileSize;

    @ManyToOne
    @JoinColumn(name="offer_id", nullable=false)
    private Offer offer;

    public OfferImage() {
        // must be default constructible
        // to send lol
    }

    public OfferImage(Offer offer, MultipartFile file, byte[] bytes) {
        this.fileName = StringUtils.cleanPath(file.getOriginalFilename());
        this.fileType = file.getContentType();
        this.fileSize = file.getSize();
        this.offer = offer;
        this.data = bytes;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    @Lob
    private byte[] data;

    @Override
    public int hashCode() {
        int result = Objects.hash(uuid, fileName, fileType, offer.getUuid());
        result = 31 * result + Arrays.hashCode(data);
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OfferImage that = (OfferImage) o;
        return uuid == that.uuid && offer.getUuid() == that.offer.getUuid() && fileName.equals(that.fileName) && fileType.equals(that.fileType) && Arrays.equals(data, that.data);
    }
}
