FROM openjdk:17 AS build

# Set the working directory
WORKDIR /app

# Copy the built JAR file into the image
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8092
ARG JAR_FILE=target/*.jar
ADD target/microservice-inscriptions-0.0.1-SNAPSHOT.jar microservice-inscriptions.jar
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
