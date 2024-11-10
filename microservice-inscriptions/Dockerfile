# Use an official Maven image to build the app
FROM maven:3.8.1-openjdk-17-slim AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean install

FROM openjdk:17-jdk-slim

COPY --from=builder /app/target/*.jar /eureka.jar

EXPOSE 8093

# Start the Java application
ENTRYPOINT ["java", "-jar", "/eureka.jar"]