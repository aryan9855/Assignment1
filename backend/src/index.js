const app = require('./app');
const { connectDB, sequelize } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Sync Models (Create tables if they don't exist)
    // Use { force: true } only in development if you want to wipe DB on every restart
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    // 3. Start Express Server
    app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`Documentation available at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
