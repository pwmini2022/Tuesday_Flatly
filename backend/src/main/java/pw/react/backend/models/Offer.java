package pw.react.backend.models;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "offers")
public class Offer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User owner;

    @OneToMany(mappedBy="offer")
    private Set<Booking> bookings;

    @OneToMany(mappedBy="offer")
    private Set<OfferImage> images;

    @Column
    private String location;

    @Column
    private LocalDateTime dateFrom;

    @Column
    private LocalDateTime dateTo;

    @Column
    private int numberOfKids;

    @Column
    private int numberOfAdults;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public LocalDateTime getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDateTime dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDateTime getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDateTime dateTo) {
        this.dateTo = dateTo;
    }

    public int getNumberOfKids() {
        return numberOfKids;
    }

    public void setNumberOfKids(int numberOfKids) {
        this.numberOfKids = numberOfKids;
    }

    public int getNumberOfAdults() {
        return numberOfAdults;
    }

    public void setNumberOfAdults(int numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Set<OfferImage> getImages() {
        return images;
    }

    @Override
    public String toString() {
        return "Offer [id=" + id + ", owner=" + owner + ", location=" + location + ", dateFrom=" + dateFrom
                + ", dateTo=" + dateTo + ", numberOfKids=" + numberOfKids + ", numberOfAdults=" + numberOfAdults + "]";
    }
}
