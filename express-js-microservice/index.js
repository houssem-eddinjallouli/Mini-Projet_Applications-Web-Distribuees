const express = require('express');
const cors = require('cors'); // Import cors
const sequelize = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Other middleware
app.use(express.json());

// Eureka client configuration
const client = new Eureka({
    instance: {
        app: 'event-service',
        hostName: 'event-service',
        ipAddr: 'event-service',
        port: {
            '$': process.env.PORT || 3002,
            '@enabled': true,
        },
        vipAddress: 'event-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'discovery-server',
        port: 8090,
        servicePath: '/eureka/apps/',
    },
});

// Register with Eureka
client.start(error => {
    if (error) {
        console.error('Error starting Eureka client:', error);
    } else {
        console.log('Eureka client started');
        // Only start the server after Eureka client is ready
        sequelize.sync().then(() => {
            app.listen(PORT, () => {
                console.log(`Event service running on port ${PORT}`);
            });
        }).catch(error => console.log('Database connection error:', error));
    }
});

app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3002;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Event service running on port ${PORT}`);
    });
}).catch(error => console.log('Database connection error:', error));
