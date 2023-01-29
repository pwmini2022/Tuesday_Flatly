package pw.react.backend.models;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "offers")
public class Offer implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String uuid;

    private String name;
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Long dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Long getDateTo() {
        return dateTo;
    }

    public void setDateTo(Long dateTo) {
        this.dateTo = dateTo;
    }

    public Long getNumberOfKids() {
        return numberOfKids;
    }

    public void setNumberOfKids(Long numberOfKids) {
        this.numberOfKids = numberOfKids;
    }

    public Long getNumberOfAdults() {
        return numberOfAdults;
    }

    public void setNumberOfAdults(Long numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
    }

    private Long price;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "offer")
    private Set<Booking> bookings;

    @OneToMany(mappedBy = "offer")
    private Set<OfferImage> images;

    private String location;

    private Long dateFrom;

    private Long dateTo;

    private Long numberOfKids;

    private Long numberOfAdults;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Set<OfferImage> getImages() {
        return images;
    }

    @Override
    public String toString() {
        return "Offer [uuid=" + uuid + ", name=" + name + ", price=" + price + ", owner=" + owner + ", bookings="
                + bookings + ", images=" + images + ", location=" + location + ", dateFrom=" + dateFrom + ", dateTo="
                + dateTo + ", numberOfKids=" + numberOfKids + ", numberOfAdults=" + numberOfAdults + "]";
    }
}
