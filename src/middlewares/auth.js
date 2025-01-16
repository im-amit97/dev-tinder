const adminAuth = (req, res, next) => {
  const isAdminToken = "xyzwer";
  if (isAdminToken === "xyz") {
    next();
  } else {
    res.sendStatus("401").send("Unauthorised Admin User");
  }
};

const userAuth = (req, res, next) => {
  const isUserToken = "xyz";
  if (isUserToken === "xyz") {
    next();
  } else {
    res.sendStatus("401").send("Unauthorised User");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
