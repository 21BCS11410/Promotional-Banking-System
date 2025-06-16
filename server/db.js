const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const { MONGODB_URL } = process.env;

exports.connect = () => {

    if (!MONGODB_URL) {
		console.error("MONGODB_URL is not defined in environment variables");
		process.exit(1);
	}


	mongoose
		.connect(MONGODB_URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
