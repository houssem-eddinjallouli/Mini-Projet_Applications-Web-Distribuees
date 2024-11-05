FROM openjdk:17-jdk-slim AS build


COPY ./target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
