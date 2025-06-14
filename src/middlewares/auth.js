export const adminAuth = (req, res, next) => {
  const token = "abcg";
  if (token !== "abc") {
    res.send("admin unauthorized");
  } else {
    next();
  }
};

export const userAuth = (req, res, next) => {
  const token = "abc";
  if (token !== "abc") {
    res.send("user unauthorized");
  } else {
    next();
  }
};
