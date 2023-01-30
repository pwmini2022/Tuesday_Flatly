package pw.react.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import pw.react.backend.web.BookingDto;

@Entity
@Table(name = "booking_notifications")
public class BookingNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "offer_uuid", nullable = false)
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private String bookingUuid;
    private Integer actionType;
    private Long actionTime;

    public BookingNotification () {}

    public BookingNotification (BookingDto bookingDto, Offer offer, Integer actionType, Long actionTime) {
        this.bookingUuid = bookingDto.uuid();
        this.offer = offer;
        this.owner = offer.getOwner();
        this.actionType = actionType;
        this.actionTime = actionTime;
    }

    public Long getId() {
        return id;
    }
    public Offer getOffer() {
        return offer;
    }
    public User getOwner() {
        return owner;
    }
    public String getBookingUuid() {
        return bookingUuid;
    }
    public Integer getActionType() {
        return actionType;
    }
    public Long getActionTime() {
        return actionTime;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setBookingUuid(String bookingUuid) {
        this.bookingUuid = bookingUuid;
    }
    public void setActionType(Integer actionType) {
        this.actionType = actionType;
    }
    public void setActionTime(Long actionTime) {
        this.actionTime = actionTime;
    }
}
