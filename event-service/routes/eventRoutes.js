const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create Event
router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
