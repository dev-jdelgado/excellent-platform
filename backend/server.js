require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Allow frontend URL (local or Netlify)
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('EXCELLENT API is running'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
