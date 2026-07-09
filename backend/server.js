import cors from 'cors';

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

app.use(cors(corsOptions));