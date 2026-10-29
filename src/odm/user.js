export const userODM = (userObj) => {
  const user = {
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
  };
  return user;
};
