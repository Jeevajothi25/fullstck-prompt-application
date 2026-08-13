const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env first
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const startServer = async () => {
	try {
		await connectDB();
		const PORT = process.env.PORT || 5000;
		const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.error(`Port ${PORT} is already in use. Please stop the process using that port or change PORT in .env.`);
				process.exit(1);
			} else {
				console.error('Server error:', err);
			}
		});
	} catch (err) {
		console.error('Failed to start server due to DB error.');
		process.exit(1);
	}
};

startServer();
