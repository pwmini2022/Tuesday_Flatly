package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import pw.react.backend.web.ExternalBookingNotificationDto;

public class ExternalNotificationService implements IExternalNotificationService {
    private final Logger logger = LoggerFactory.getLogger(ExternalNotificationService.class);
    private final RestTemplate restTemplate;
    private String booklyNotificationPath;

    public ExternalNotificationService(RestTemplate restTemplate, String booklyNotificationPath) {
        this.restTemplate = restTemplate;
        this.booklyNotificationPath = booklyNotificationPath;

        logger.info("\n\nBookly URL:{}\n",
                booklyNotificationPath);
    }

    // only for bookings' deletions?
    public ResponseEntity<?> notifyBookly(String bookingUuid) { // TODO: FIX RETURN TYPE?
        final ResponseEntity<?> postReponse = restTemplate.postForEntity(
                String.format("%s", booklyNotificationPath),
                new HttpEntity<>(ExternalBookingNotificationDto.valueFrom(bookingUuid)),
                Object.class);
        logger.info("Code: {}\n", postReponse.getStatusCode());
        logger.info("Response:\n{}\n", postReponse);
        logger.info("Headers:\n{}\n", postReponse.getHeaders());
        logger.info("Body:\n{}\n", postReponse.getBody());

        return postReponse;
    }
}
