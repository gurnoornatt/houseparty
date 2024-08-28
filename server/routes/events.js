const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single event
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event);
});

// Create a new event
router.post('/', auth, async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        price: req.body.price,
        host: req.user.id,
        image: req.body.image,
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an event
router.patch('/:id', auth, getEvent, async (req, res) => {
    if (res.event.host.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.body.title != null) {
        res.event.title = req.body.title;
    }
    if (req.body.description != null) {
        res.event.description = req.body.description;
    }
    if (req.body.date != null) {
        res.event.date = req.body.date;
    }
    if (req.body.time != null) {
        res.event.time = req.body.time;
    }
    if (req.body.location != null) {
        res.event.location = req.body.location;
    }
    if (req.body.price != null) {
        res.event.price = req.body.price;
    }
    if (req.body.image != null) {
        res.event.image = req.body.image;
    }

    try {
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', auth, getEvent, async (req, res) => {
    if (res.event.host.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    try {
        await res.event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function to get event by ID
async function getEvent(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.event = event;
    next();
}

module.exports = router;
