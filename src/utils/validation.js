const validator = require("validator");

function validateSignupCreds(req) {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    const error = new Error("Invalid name");
    error.statusCode = 400;
    throw error;
  }
  if (!validator.isEmail(emailId)) {
    const error = new Error("Invalid Email");
    error.statusCode = 400;
    throw error;
  }
  if (!validator.isStrongPassword(password)) {
    const error = new Error("Password is not strong");
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { validateSignupCreds };
