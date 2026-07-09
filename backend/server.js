import cors from 'cors';
import rateLimit from 'express-rate-limit';
// Define allowed origins
const allowedOrigins = [
  'https://tayosmart-dashboard-frontend.vercel.app', // Your Live Frontend
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

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.path === '/health' // Optional: skip health checks if you have them
});

// Apply rate limiting to all routes
app.use(limiter);
app.use(cors(corsOptions));