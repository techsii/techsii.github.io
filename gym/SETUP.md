# EliteFit Gym Management System - Setup Guide

This guide will help you set up and run the complete EliteFit Gym Management System with both frontend and backend components.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd gym
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Or production mode
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`
   - The frontend will be served directly from the server

## 📁 Project Structure

```
gym/
├── server.js              # Backend Node.js server
├── package.json           # Backend dependencies and scripts
├── index.html            # Main frontend HTML
├── styles.css            # Complete CSS styling
├── app.js                # Frontend JavaScript
├── hero-gym.jpg          # Hero section background (SVG)
├── trainer1.jpg          # Trainer profile images (SVG)
├── trainer2.jpg
├── trainer3.jpg
├── README.md             # Main documentation
├── SETUP.md              # This setup guide
└── LICENSE               # License file
```

## 🔧 Backend Configuration

### Server Details
- **Port**: 3000 (configurable in `server.js`)
- **API Base URL**: `http://localhost:3000/api`
- **Database**: In-memory (for demo purposes)

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/memberships/plans` | Get membership plans | No |
| POST | `/api/memberships/purchase` | Purchase membership | Yes |
| GET | `/api/memberships/card` | Get virtual card | Yes |
| POST | `/api/memberships/card/refresh` | Refresh QR code | Yes |
| POST | `/api/checkin` | Gym check-in | Yes |
| GET | `/api/checkin/history` | Check-in history | Yes |
| GET | `/api/trainers` | Get trainers | No |
| GET | `/api/schedule` | Get class schedule | No |
| POST | `/api/schedule/book` | Book class | Yes |
| GET | `/api/admin/stats` | Admin statistics | Yes |
| GET | `/api/admin/memberships` | Admin memberships | Yes |

### Authentication

The system uses JWT (JSON Web Tokens) for authentication:
- Tokens are valid for 24 hours
- Tokens are stored in localStorage as `elitefit_token`
- All authenticated endpoints require `Authorization: Bearer <token>` header

## 🎨 Frontend Features

### Core Functionality
- ✅ User registration and login
- ✅ Membership management with 3-tier plans
- ✅ Virtual membership cards with QR codes
- ✅ Gym check-in system
- ✅ Class scheduling and booking
- ✅ Trainer profiles
- ✅ Responsive design

### Virtual Card System
- Unique card numbers (format: EF + 12 digits)
- Dynamic QR codes for gym entry
- Card status and expiry tracking
- Download and refresh functionality

### Admin Features
- User statistics dashboard
- Membership management
- Check-in monitoring
- System health monitoring

## 🌐 Running in Production

### Environment Variables
Create a `.env` file in the project root:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### Database Integration
For production use, replace the in-memory storage with a real database:

```javascript
// Example: MongoDB integration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/elitefit');

// Replace in-memory arrays with database models
```

### Security Considerations
- Use HTTPS in production
- Store JWT secret securely
- Implement rate limiting
- Add input validation and sanitization
- Use a production-ready database

## 🧪 Testing the System

### User Registration
1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Fill in registration form
4. Submit and verify account creation

### Membership Purchase
1. Login to your account
2. Click "View Plans"
3. Select a membership plan
4. Fill in payment details
5. Complete purchase
6. View your virtual card

### Gym Check-in
1. Ensure you have an active membership
2. Click "Check In" (available in virtual card modal)
3. Verify successful check-in message

### Class Booking
1. Navigate to "Schedule" section
2. Filter by day if desired
3. Click "Book Now" on any class
4. Verify booking confirmation

## 🔧 Customization

### Changing Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Adding Membership Plans
Update the plans in `server.js`:
```javascript
app.get('/api/memberships/plans', (req, res) => {
    const plans = [
        // Add new plans here
    ];
    res.json(plans);
});
```

### Customizing Virtual Cards
Modify the card generation in `app.js`:
```javascript
function renderVirtualCard(card) {
    // Customize card layout and styling
}
```

## 🐛 Troubleshooting

### Common Issues

**Server won't start:**
- Check Node.js version (`node --version`)
- Ensure port 3000 is available
- Check for syntax errors in `server.js`

**Frontend not loading:**
- Verify server is running
- Check browser console for errors
- Ensure all files are in the correct directory

**API calls failing:**
- Check server is running on correct port
- Verify CORS settings
- Check network tab in browser dev tools

**Authentication issues:**
- Clear browser localStorage
- Check JWT secret consistency
- Verify token expiration

### Getting Help

1. Check the browser console for JavaScript errors
2. Check the server console for backend errors
3. Verify all files are present and correctly named
4. Ensure Node.js and npm are properly installed

## 📊 System Architecture

### Frontend (Client-Side)
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with Grid, Flexbox, and animations
- **JavaScript ES6+**: Modern JavaScript with async/await
- **Fetch API**: HTTP requests to backend
- **LocalStorage**: Client-side data persistence

### Backend (Server-Side)
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing

### Data Flow
1. User interacts with frontend
2. Frontend makes API calls to backend
3. Backend processes requests and validates data
4. Backend responds with JSON data
5. Frontend updates UI based on response

## 🚀 Deployment Options

### Local Development
```bash
npm run dev
```

### Production Server
```bash
npm start
```

### Docker (Future Enhancement)
```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

For questions, issues, or feature requests:
1. Check this setup guide first
2. Review the code comments and documentation
3. Test with the provided examples
4. Report issues with detailed error messages

---

**Note**: This is a demo application for educational purposes. For production use, additional security measures, database integration, and error handling would be required.