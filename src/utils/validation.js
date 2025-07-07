const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter Valid Name!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter Valid Email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
};

module.exports = { validateSignUpData };
