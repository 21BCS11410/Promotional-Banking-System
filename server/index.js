// Importing necessary modules and packages
const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./db");
const dotenv = require("dotenv");
const promotionRoutes = require("./routes/promotionRoutes");    

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Middlewares
app.use(cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Setting up routes
app.use("/anydesk/banking/promotion", promotionRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
});

// Start the server first
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
	// Try to connect to database after server starts
	try {
		database.connect();
	} catch (error) {
		console.error("Database connection failed:", error);
		// Server will continue running even if database connection fails
	}
});

// End of code.
