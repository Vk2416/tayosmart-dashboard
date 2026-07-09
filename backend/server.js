import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// 1. CORS CONFIGURATION
// =============================================
const allowedOrigins = [
  'https://tayosmart-dashboard-frontend.vercel.app', // Your Live Frontend (FIX THIS URL)
  'http://localhost:5173' // Local development (Vite default)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies/authorization headers
  optionsSuccessStatus: 200
};

// =============================================
// 2. RATE LIMITING CONFIGURATION
// =============================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health'
});

// =============================================
// 3. APPLY MIDDLEWARE (Order Matters!)
// =============================================
app.use(cors(corsOptions));       // CORS first
app.use(helmet());                // Security headers
app.disable('x-powered-by');      // Hide tech stack
app.use(express.json());          // Parse JSON bodies
app.use(limiter);                 // Rate limiting

// =============================================
// 4. ROUTES (Your API endpoints)
// =============================================
// Example route - replace with your actual routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Your login, dashboard, etc. routes go here...

// =============================================
// 5. START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});