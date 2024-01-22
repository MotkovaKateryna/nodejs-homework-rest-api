const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const uuid = require('uuid').v4;

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email already in use");

  const verificationToken = uuid();

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { d: 'retro'}, false)
  // const avatarURL =  `https://www.gravatar.com/avatar/${email}.jpg?d=identicon`;// without module gravatar
  
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription,
    },
  });
};

module.exports = register;