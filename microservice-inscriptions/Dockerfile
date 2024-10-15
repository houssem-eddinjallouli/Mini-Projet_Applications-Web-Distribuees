FROM openjdk:17 AS build

# Set the working directory
WORKDIR /app

# Copy the built JAR file into the image
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8099

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
