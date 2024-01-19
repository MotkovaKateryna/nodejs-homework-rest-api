const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const changeSubscription = require("./changeSubscription");
const updateAvatar = require("./updateAvatar");
const verificationToken = require("./verificationToken");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  changeSubscription: ctrlWrapper(changeSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verificationToken: ctrlWrapper(verificationToken),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};