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

// Connecting to database
database.connect();
 
// Middlewares
app.use(cors({
    origin: "http://localhost:3000",
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

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
