const express = require('express');
const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', async (req, res) => {
    const { message, sender, receiver } = req.body;
    try {
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
            return res.status(404).json({ success: false, message: 'Sender or receiver not found' });
        }

        const newMessage = new Message({ message, sender, receiver });
        await newMessage.save();

        res.json({ success: true, message: 'Message sent successfully', data: newMessage });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const messages = await Message.find({ receiver: mongoose.Types.ObjectId(userId) }).populate('sender', 'username');
        res.json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
