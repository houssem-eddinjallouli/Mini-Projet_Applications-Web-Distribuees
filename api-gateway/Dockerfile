FROM openjdk:17
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8099

ENTRYPOINT ["java", "-jar", "app.jar"]
