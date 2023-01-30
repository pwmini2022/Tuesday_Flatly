package pw.react.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.models.BookingNotification;

public interface BookingNotificationRepository extends JpaRepository<BookingNotification, Long> {
}
