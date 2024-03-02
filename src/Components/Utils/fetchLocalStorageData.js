export const fetchUser = function () {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.removeItem("user");

  return userInfo;
};
