require("dotenv").config();

const configurations = {
	ConnectionStrings: {
		MongoDB: process.env.CONNECTION_STRING_MONGODB
	},
	ApiKeys: {
		OpenAI: process.env.OPENAI_API_KEY
	},
	Credentials: {
		GmailUser: process.env.GMAIL_USER,
		GmailPass: process.env.GMAIL_PASS
	}
}

module.exports = configurations;