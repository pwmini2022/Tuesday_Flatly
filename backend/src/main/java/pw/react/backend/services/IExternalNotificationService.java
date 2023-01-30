package pw.react.backend.services;

import org.springframework.http.ResponseEntity;

public interface IExternalNotificationService {
    ResponseEntity<?> notifyBookly(String bookingUuid);
}
