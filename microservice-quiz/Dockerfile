# Use an official Maven image to build the app
FROM maven:3.8.1-openjdk-17-slim AS builder

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Run mvn clean install to build the JAR
RUN mvn clean install

# Now copy the built JAR into the final image
FROM openjdk:17-jdk-slim

# Copy the JAR from the builder stage
COPY --from=builder /app/target/*.jar /eureka.jar

# Expose the necessary port
EXPOSE 8090

# Start the Java application
ENTRYPOINT ["java", "-jar", "/eureka.jar"]