const validator = require("validator");

const validateSignIn = (req) => {
  const { firstName, email, password } = req?.body;

  if (!firstName) {
    throw new Error("Name is not valid");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be between 4 and 50");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email ID is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password!");
  }
};

const validateLogIn = (req) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    throw new Error("Please Enter proper email");
  }
};

const validateEditProfileData = (req) => {
  const EDIT_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  if (!Object.keys(req?.body).every((key) => EDIT_FIELDS.includes(key))) {
    throw new Error('Request is not valid');
  }
};

const validateEditPasswordRequest = (req) => {
  const { currentPassword, password, rePassword } = req?.body;
  if (!currentPassword || !password || !rePassword) {
    throw new Error('Request is not valid');
  }

  if (password !== rePassword) {
    throw new Error('New passwords are not matched');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Please Enter Strong Password');
  }
}

module.exports = {
  validateSignIn,
  validateLogIn,
  validateEditProfileData,
  validateEditPasswordRequest,
};
