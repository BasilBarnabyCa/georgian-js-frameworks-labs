require("dotenv").config();

const configurations = {
	ConnectionStrings: {
		MongoDB: process.env.CONNECTION_STRING_MONGODB
	},
	ApiKeys: {
		OpenAI: process.env.OPENAI_API_KEY
	},
	Credentials: {
		Gmail: {
			User: process.env.GMAIL_USER,
			Pass: process.env.GMAIL_PASS
		},
		Github: {
			ClientID: process.env.GITHUB_CLIENT_ID,
			ClientSecret: process.env.GITHUB_CLIENT_SECRET,
			CallbackUrl: process.env.GITHUB_CALLBACK_URL
		},
	}

}

module.exports = configurations;