package pw.react.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pw.react.backend.dao.*;

import javax.annotation.PostConstruct;
import java.util.*;

import static java.util.stream.Collectors.toSet;

@Configuration
public class MainConfig {
    private static final Logger log = LoggerFactory.getLogger(MainConfig.class);

    private final String corsUrls;
    private final String corsMappings;
    private final String booklyNotificationPath;

    private static final Map<String, String> envPropertiesMap = System.getenv();

    public MainConfig(@Value(value = "${cors.urls}") String corsUrls,
                      @Value(value = "${cors.mappings}") String corsMappings,
                      @Value(value = "${bookly.notificationpath}") String booklyNotificationPath) {
        this.corsUrls = corsUrls;
        this.corsMappings = corsMappings;
        this.booklyNotificationPath = booklyNotificationPath;
    }

    @PostConstruct
    private void init() {
        log.debug("************** Environment variables **************");
        for (Map.Entry<String, String> entry : envPropertiesMap.entrySet()) {
            log.debug("[{}] : [{}]", entry.getKey(), entry.getValue());
        }
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public IExternalNotificationService httpService(RestTemplate restTemplate) {
        return new ExternalNotificationService(restTemplate, booklyNotificationPath);
    }

    @Bean
    public IUserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }

    @Bean
    public IBookingService bookingService(BookingRepository bookingRepository) {
        return new BookingService(bookingRepository);
    }

    @Bean
    public IOfferService offerService(OfferRepository offerRepository) {
        return new OfferService(offerRepository);
    }

    @Bean
    public IOfferImageService offerImageService(OfferImageRepository offerImageRepository) {
        return new OfferImageService(offerImageRepository);
    }

    @Bean
    public IBookingNotificationService bookingNotificationService(BookingNotificationRepository bookingNotificationRepository) {
        return new BookingNotificationService(bookingNotificationRepository);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        getCorsUrls();
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                final Set<String> mappings = getCorsMapings();
                if (mappings.isEmpty()) {
                    registry.addMapping("/**");
                } else {
                    for (String mapping : mappings) {
                        registry.addMapping(mapping).allowedOrigins(getCorsUrls());

                    }
                }
            }
        };
    }

    private String[] getCorsUrls() {
        return Optional.ofNullable(corsUrls)
                .map(value -> value.split(","))
                .orElseGet(() -> new String[0]);
    }

    private Set<String> getCorsMapings() {
        return Optional.ofNullable(corsMappings)
                .map(value -> Arrays.stream(value.split(",")))
                .map(stream -> stream.collect(toSet()))
                .orElseGet(HashSet::new);
    }
}
