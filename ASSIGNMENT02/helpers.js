const hbs = require("hbs");

// Format a date and time string
const formatDateTime = (date) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};
	return new Date(date).toLocaleString("en-CA", options).replace(",", "");
};

// Format a time string in 12-hour format
const formatTime12Hour = (date) => {
	const options = { hour: "numeric", minute: "2-digit", hour12: true };
	return new Date(date)
		.toLocaleTimeString("en-CA", options)
		.replace(/^0+/, "")
		.toUpperCase();
};

// Get the status class based on the status
const getStatusClass = (status) => {
	switch (status) {
		case "On-time":
			return "bg-gradient-to-tl from-green-600 to-lime-400";
		case "Scheduled":
			return "bg-gradient-to-tl from-blue-600 to-blue-400";
		case "Cancelled":
			return "bg-gradient-to-tl from-red-600 to-red-400";
		default:
			return "bg-gradient-to-tl from-gray-600 to-gray-400";
	}
};

// Get the role class based on the role
const getRoleClass = (role) => {
	switch (role) {
		case "Admin":
			return "bg-gradient-to-tl from-gray-600 to-gray-400";
		case "Agent":
			return "bg-gradient-to-tl from-blue-600 to-blue-400";
		default:
			return "bg-gradient-to-tl from-gray-600 to-gray-400";
	}
};

const getHelpers = () => {
	// Register Date and time Helpers
	hbs.registerHelper("toShortDate", (longDateValue) => {
		return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
	});

	hbs.registerHelper("toDateTime", (date) => {
		return new hbs.SafeString(formatDateTime(date));
	});

	hbs.registerHelper("toTime12Hour", (date) => {
		return new hbs.SafeString(formatTime12Hour(date));
	});

	// Register Status and Role Tag Formatting Helpers
	hbs.registerHelper("getStatusClass", (status) => {
		return new hbs.SafeString(getStatusClass(status));
	});

	hbs.registerHelper("getRoleClass", (role) => {
		return new hbs.SafeString(getRoleClass(role));
	});

	// Register Table Helpers
	hbs.registerHelper("incrementedIndex", function (index) {
		return index + 1;
	});

	// Register Comparison Helper
	hbs.registerHelper('eq', function (arg1, arg2) {
		return arg1 == arg2;
	});

	// Register Select Helpers
	hbs.registerHelper("selectAirline", (airline, selectedAirline) => {
		return airline === selectedAirline ? "selected" : "";
	});

	hbs.registerHelper("trimFlightNumber", (flightNumber) => {
		return flightNumber ? flightNumber.substring(2) : "";
	});

	hbs.registerHelper("selectItem", ( currentItem, newItem) => {
		return currentItem === newItem ? "selected" : "";
	});

	hbs.registerHelper("selectAirport", (airportIATA, selectedIATA) => {
		return airportIATA === selectedIATA ? "selected" : "";
	});

	hbs.registerHelper("selectGateCarousel", (name, selectedName) => {
		return name === selectedName ? "selected" : "";
	});

	hbs.registerHelper("selectRole", function(roleName, selectedRole) {
		return roleName === selectedRole ? "selected" : "";
	});
	
};

module.exports = {
	getHelpers,
};
