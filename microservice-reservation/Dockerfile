# Use Maven to build the project
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

# Use a lightweight OpenJDK image to run the JAR
FROM openjdk:17-jdk-slim
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8095
ENTRYPOINT ["java", "-jar", "/app.jar"]
