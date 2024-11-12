# Mini-Projet_Applications-Web-Distribuees
 Développement d’une application qui contient deux parties: ● Partie Back office qui , est une application à base de l’architecture micro-services. ● Partie Front office qui, consomme la partie back déveoppée

# Mini-Projet_Applications-Web-Distribuees

## Développement d’une application

Ce projet est divisé en deux parties :

- **Partie Back Office** : une application basée sur l'architecture micro-services.
- **Partie Front Office** : consomme les services de la partie Back Office.

## Création de notre application micro-services

Pour créer notre application micro-services, nous utilisons Docker et Docker Compose pour orchestrer les différents services nécessaires à l'application. Voici une explication de la configuration contenue dans le fichier `docker-compose.yml`.

### Services

1. **Discovery Server (Eureka)**
   - Gère l'enregistrement et la découverte des services.
   - Exposé sur le port `8090`.

2. **API Gateway**
   - Point d'entrée unique pour les clients.
   - Exposé sur le port `8099` et dépend du `discovery-server`.

3. **Configuration Server**
   - Fournit une configuration centralisée pour les services.
   - Exposé sur le port `8888`.

4. **Base de données PostgreSQL**
   - Utilisée pour stocker les données des micro-services.
   - Exposée sur le port `5432`.

5. **Microservices**
   - **Python Microservice** : Exposé sur le port `5001`.
   - **Event Service** : Exposé sur le port `3002`.
   - **Microservice Quiz** : Exposé sur le port `8092`.
   - **Microservice Inscriptions** : Exposé sur le port `8093`.
   - **Microservice Forum** : Exposé sur le port `8094`.
   - **Microservice Reservation** : Exposé sur le port `8095`.
   - **Microservice Spring** : Exposé sur le port `8069`.
   - **Node.js Microservice** : Exposé sur le port `3003`.

6. **Keycloak**
   - Service d'authentification et de gestion des utilisateurs.
   - Exposé sur le port `9090`.

7. **Base de données MySQL**
   - Utilisée pour certains micro-services.
   - Exposée sur le port `3307`.

8. **Application Angular (Front Office)**
   - Exposée sur le port `4200`, consomme les services via l'API Gateway.

### Réseaux et Volumes

- Tous les services sont connectés à un réseau Docker nommé `app-network` pour faciliter la communication entre eux.
- Des volumes Docker sont utilisés pour stocker les données des bases de données et assurer la persistance des données.

## Démarrage de l'application

Pour démarrer l'application, exécutez la commande suivante dans le terminal à la racine du projet :

```bash
docker-compose up --build


Made with ❤️ by Jallouli Houssem-eddin, manef SWAIDI,bacem JAZA and anas ATALLAH