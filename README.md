# Starter
This is the starter for the backend application.

### Installed Prerequisites
In order to launch the application the following items must be installed:
* [Java 11](https://adoptopenjdk.net/)
* [Maven](https://maven.apache.org/download.cgi)
* [MySQL Community Server + Workbench](https://dev.mysql.com/downloads/installer/)
* [Git](https://git-scm.com/downloads)

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.4.0-SNAPSHOT/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-developing-web-applications)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#boot-features-jpa-and-spring-data)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#production-ready)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/2.3.3.RELEASE/reference/htmlsingle/#using-boot-devtools)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

### AWS setup
1. Go to Elastic Bean Stalk
2. Create new environment
3. Create new application
4. Choose Java 11 and MySQL database.
5. System parameters to set:
```
RDS_DB_NAME ebdb //this is default db name created automatically with the application
RDS_HOSTNAME something similar to this: aa16my1gs1126vw.czyphws3wq6b.eu-central-1.rds.amazonaws.com
RDS_PASSWORD MySQL password set during the creation
RDS_PORT 3306 //MySQL server port
RDS_USERNAME root //database user
SERVER_PORT 5000 //it must be 5000 and it is defined in the application.properties
SPRING_PROFILES_ACTIVE prod-mysql
```
6. IMPORTANT: Add inbound rule to the db ecurity group to allow access all inbound ips. Mysql/Aurora anywhere 