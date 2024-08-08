const hbs = require("hbs");

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

const formatTime12Hour = (date) => {
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  return new Date(date)
    .toLocaleTimeString("en-CA", options)
    .replace(/^0+/, "")
    .toUpperCase();
};

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

  hbs.registerHelper("getStatusClass", (status) => {
    return new hbs.SafeString(getStatusClass(status));
  });

  hbs.registerHelper("incrementedIndex", function (index) {
    return index + 1;
  });
};

module.exports = {
  getHelpers,
};
