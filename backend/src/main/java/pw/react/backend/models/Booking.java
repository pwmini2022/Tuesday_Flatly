package pw.react.backend.models;

import javax.persistence.*;
import java.io.Serializable;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "bookings")
public class Booking implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String uuid;

    private Long dateFrom;
    private Long dateTo;

    private String firstName;
    private String lastName;

    private Long numberOfKids;
    private Long numberOfAdults;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User admin;

    @ManyToOne
    @JoinColumn(name="offer_id", nullable=false)
    private Offer offer;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Long getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Long startDate) {
        this.dateFrom = startDate;
    }

    public Long getDateTo() {
        return dateTo;
    }

    public void setDateTo(Long endDate) {
        this.dateTo = endDate;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    @Override
    public String toString() {
        return "Booking [uuid=" + uuid + ", startDate=" + dateFrom + ", endDate=" + dateTo + ", firstName="
                + firstName + ", lastName=" + lastName + ", admin=" + admin + ", offer=" + offer + "]";
    }
}