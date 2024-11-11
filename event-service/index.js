const express = require('express');
const sequelize = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3002;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Event service running on port ${PORT}`);
    });
}).catch(error => console.log('Database connection error:', error));
