const hbs = require("hbs");

const formatDateTime = (date) => {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
	return new Date(date).toLocaleString('en-CA', options).replace(',', '');
};

const formatTime12Hour = (date) => {
	const options = { hour: 'numeric', minute: '2-digit', hour12: true };
	return new Date(date).toLocaleTimeString('en-CA', options).replace(/^0+/, '').toUpperCase();
};


const getHelpers = () => {
	hbs.registerHelper("toShortDate", (longDateValue) => {
		return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
	});

	hbs.registerHelper("toDateTime", (date) => {
		return new hbs.SafeString(formatDateTime(date));
	});

	hbs.registerHelper("toTime12Hour", (date) => {
		return new hbs.SafeString(formatTime12Hour(date));
	});
};


module.exports = {
	getHelpers,
};