FROM openjdk:17-alpine
EXPOSE 8069
 # Le nom du livrable doit être sous la forme classe-groupe-nomProjet (exemple : 5SIM1-G1-nomProjet)
COPY target/*.jar 5SAE7-G1-ski.jar

ENTRYPOINT ["java", "-jar", "/5SAE7-G1-ski.jar"]