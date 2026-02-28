// EliteFit Gym Management System - Backend Server
// Node.js Express server with full functionality

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'elitefit-gym-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory data storage (in production, use a database like MongoDB or PostgreSQL)
let users = [];
let memberships = [];
let virtualCards = [];
let checkins = [];
let trainers = [];
let schedule = [];

// Initialize sample data
function initializeData() {
    // Sample trainers
    trainers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            specialty: 'Strength & Conditioning',
            experience: '10+ years',
            rating: 4.9,
            clients: 500,
            image: 'trainer1.jpg'
        },
        {
            id: 2,
            name: 'Mike Rodriguez',
            specialty: 'Cardio & HIIT',
            experience: '8+ years',
            rating: 4.8,
            clients: 400,
            image: 'trainer2.jpg'
        },
        {
            id: 3,
            name: 'Emily Chen',
            specialty: 'Yoga & Flexibility',
            experience: '12+ years',
            rating: 4.9,
            clients: 300,
            image: 'trainer3.jpg'
        }
    ];

    // Sample schedule
    schedule = [
        { id: 1, name: 'Morning Yoga', time: '6:00 AM', day: 'monday', trainer: 'Emily Chen', spots: '8/15' },
        { id: 2, name: 'HIIT Cardio', time: '7:00 AM', day: 'monday', trainer: 'Mike Rodriguez', spots: '12/20' },
        { id: 3, name: 'Strength Training', time: '8:00 AM', day: 'monday', trainer: 'Sarah Johnson', spots: '6/12' },
        { id: 4, name: 'Morning Yoga', time: '6:00 AM', day: 'tuesday', trainer: 'Emily Chen', spots: '10/15' },
        { id: 5, name: 'Boxing Class', time: '7:00 AM', day: 'tuesday', trainer: 'Mike Rodriguez', spots: '15/20' },
        { id: 6, name: 'Power Lifting', time: '8:00 AM', day: 'tuesday', trainer: 'Sarah Johnson', spots: '8/12' },
        { id: 7, name: 'Morning Yoga', time: '6:00 AM', day: 'wednesday', trainer: 'Emily Chen', spots: '12/15' },
        { id: 8, name: 'HIIT Cardio', time: '7:00 AM', day: 'wednesday', trainer: 'Mike Rodriguez', spots: '18/20' },
        { id: 9, name: 'Strength Training', time: '8:00 AM', day: 'wednesday', trainer: 'Sarah Johnson', spots: '10/12' },
        { id: 10, name: 'Morning Yoga', time: '6:00 AM', day: 'thursday', trainer: 'Emily Chen', spots: '9/15' },
        { id: 11, name: 'Boxing Class', time: '7:00 AM', day: 'thursday', trainer: 'Mike Rodriguez', spots: '16/20' },
        { id: 12, name: 'Power Lifting', time: '8:00 AM', day: 'thursday', trainer: 'Sarah Johnson', spots: '7/12' },
        { id: 13, name: 'Morning Yoga', time: '6:00 AM', day: 'friday', trainer: 'Emily Chen', spots: '14/15' },
        { id: 14, name: 'HIIT Cardio', time: '7:00 AM', day: 'friday', trainer: 'Mike Rodriguez', spots: '20/20' },
        { id: 15, name: 'Strength Training', time: '8:00 AM', day: 'friday', trainer: 'Sarah Johnson', spots: '12/12' },
        { id: 16, name: 'Weekend Yoga', time: '9:00 AM', day: 'saturday', trainer: 'Emily Chen', spots: '15/20' },
        { id: 17, name: 'Weekend HIIT', time: '10:00 AM', day: 'saturday', trainer: 'Mike Rodriguez', spots: '18/25' },
        { id: 18, name: 'Weekend Strength', time: '11:00 AM', day: 'saturday', trainer: 'Sarah Johnson', spots: '14/18' },
        { id: 19, name: 'Sunday Stretch', time: '10:00 AM', day: 'sunday', trainer: 'Emily Chen', spots: '12/16' },
        { id: 20, name: 'Sunday Cardio', time: '11:00 AM', day: 'sunday', trainer: 'Mike Rodriguez', spots: '16/20' }
    ];
}

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'EliteFit Gym API is running' });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, gender } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password || !phone || !gender) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (users.some(u => u.email === email)) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            gender,
            joinDate: new Date().toISOString(),
            membership: null
        };

        users.push(user);

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                joinDate: user.joinDate,
                membership: user.membership
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                joinDate: user.joinDate,
                membership: user.membership
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            joinDate: user.joinDate,
            membership: user.membership
        }
    });
});

// Membership plans
app.get('/api/memberships/plans', (req, res) => {
    const plans = [
        {
            name: 'Basic',
            price: 49,
            features: [
                'Gym Access (6 AM - 10 PM)',
                'Cardio Equipment',
                'Weight Training',
                'Group Classes'
            ],
            excluded: [
                'Personal Training',
                'Recovery Facilities'
            ]
        },
        {
            name: 'Premium',
            price: 79,
            features: [
                '24/7 Gym Access',
                'All Equipment',
                'Unlimited Group Classes',
                '2 Personal Training Sessions',
                'Recovery Facilities'
            ],
            excluded: [
                'Nutrition Consultation'
            ]
        },
        {
            name: 'Elite',
            price: 129,
            features: [
                'VIP Access',
                'All Premium Features',
                'Unlimited Personal Training',
                'Nutrition Consultation',
                'Priority Booking',
                'Progress Tracking'
            ],
            excluded: []
        }
    ];

    res.json(plans);
});

// Purchase membership
app.post('/api/memberships/purchase', authenticateToken, (req, res) => {
    try {
        const { planName, price, paymentMethod } = req.body;
        const user = users.find(u => u.id === req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!planName || !price || !paymentMethod) {
            return res.status(400).json({ error: 'Plan name, price, and payment method are required' });
        }

        // Create membership
        const membership = {
            id: Date.now().toString(),
            userId: user.id,
            plan: planName,
            price: price,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            paymentMethod: paymentMethod,
            status: 'active'
        };

        memberships.push(membership);
        user.membership = membership;

        // Generate virtual card
        const cardNumber = 'EF' + Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
        const qrCode = `ELITEFIT:${user.id}:${membership.id}:${Date.now()}`;

        const virtualCard = {
            id: Date.now().toString(),
            userId: user.id,
            membershipId: membership.id,
            cardNumber: cardNumber,
            qrCode: qrCode,
            name: `${user.firstName} ${user.lastName}`,
            plan: membership.plan,
            expiryDate: membership.endDate,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        virtualCards.push(virtualCard);

        res.json({
            message: `Welcome to ${planName} plan! Your membership is now active.`,
            membership,
            virtualCard
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's virtual card
app.get('/api/memberships/card', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || !user.membership) {
        return res.status(404).json({ error: 'No active membership found' });
    }

    const card = virtualCards.find(c => c.userId === user.id && c.membershipId === user.membership.id);
    if (!card) {
        return res.status(404).json({ error: 'Virtual card not found' });
    }

    res.json(card);
});

// Refresh virtual card QR code
app.post('/api/memberships/card/refresh', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || !user.membership) {
        return res.status(404).json({ error: 'No active membership found' });
    }

    const cardIndex = virtualCards.findIndex(c => c.userId === user.id && c.membershipId === user.membership.id);
    if (cardIndex === -1) {
        return res.status(404).json({ error: 'Virtual card not found' });
    }

    // Generate new QR code
    virtualCards[cardIndex].qrCode = `ELITEFIT:${user.id}:${user.membership.id}:${Date.now()}`;
    virtualCards[cardIndex].updatedAt = new Date().toISOString();

    res.json({
        message: 'QR code refreshed successfully',
        card: virtualCards[cardIndex]
    });
});

// Gym check-in
app.post('/api/checkin', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || !user.membership) {
        return res.status(400).json({ error: 'Please login and ensure you have an active membership' });
    }

    const card = virtualCards.find(c => c.userId === user.id && c.membershipId === user.membership.id);
    if (!card) {
        return res.status(400).json({ error: 'Virtual card not found. Please contact support.' });
    }

    // Check membership expiry
    const now = new Date();
    const expiry = new Date(card.expiryDate);
    
    if (now > expiry) {
        return res.status(400).json({ error: 'Your membership has expired. Please renew.' });
    }

    // Record check-in
    const checkIn = {
        id: Date.now().toString(),
        userId: user.id,
        membershipId: user.membership.id,
        cardId: card.id,
        timestamp: new Date().toISOString(),
        location: req.body.location || 'Main Entrance'
    };

    checkins.push(checkIn);

    res.json({
        message: `Welcome ${user.firstName}! Check-in successful at ${new Date(checkIn.timestamp).toLocaleTimeString()}`,
        checkIn
    });
});

// Get user's check-in history
app.get('/api/checkin/history', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const userCheckins = checkins.filter(c => c.userId === user.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(userCheckins);
});

// Get trainers
app.get('/api/trainers', (req, res) => {
    res.json(trainers);
});

// Get schedule
app.get('/api/schedule', (req, res) => {
    const day = req.query.day;
    let filteredSchedule = schedule;

    if (day && day !== 'all') {
        filteredSchedule = schedule.filter(item => item.day === day);
    }

    res.json(filteredSchedule);
});

// Book class
app.post('/api/schedule/book', authenticateToken, (req, res) => {
    const { classId } = req.body;
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const classItem = schedule.find(s => s.id === parseInt(classId));
    if (!classItem) {
        return res.status(404).json({ error: 'Class not found' });
    }

    // In a real system, you would update the spots and create a booking record
    // For now, just return success
    res.json({
        message: 'Class booked successfully!',
        class: classItem,
        user: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        }
    });
});

// Admin endpoints
app.get('/api/admin/stats', authenticateToken, (req, res) => {
    // In a real system, you'd check if user is admin
    const stats = {
        totalUsers: users.length,
        activeMemberships: memberships.filter(m => m.status === 'active').length,
        totalCheckins: checkins.length,
        todayCheckins: checkins.filter(c => {
            const checkinDate = new Date(c.timestamp);
            const today = new Date();
            return checkinDate.toDateString() === today.toDateString();
        }).length
    };

    res.json(stats);
});

app.get('/api/admin/memberships', authenticateToken, (req, res) => {
    // In a real system, you'd check if user is admin
    const membershipsWithUsers = memberships.map(m => ({
        ...m,
        user: users.find(u => u.id === m.userId)
    }));

    res.json(membershipsWithUsers);
});

// Start server
app.listen(PORT, () => {
    initializeData();
    console.log(`EliteFit Gym Server running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}`);
});

module.exports = app;