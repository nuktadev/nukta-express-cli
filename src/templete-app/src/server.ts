import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/my-api';

// Connect to MongoDB
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
});
