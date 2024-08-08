const hbs = require("hbs");

const registerHelpers = () => {
  hbs.registerHelper("toShortDate", (longDateValue) => {
    return new hbs.SafeString(longDateValue.toLocaleDateString("en-CA"));
  });
};

module.exports = {
  registerHelpers,
};