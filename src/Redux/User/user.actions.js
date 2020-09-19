import userType from "./user.types";

export const setCurrentUser = (user) => {
  return {
    type: userType.SET_CURRENT_USER,
    payload: user,
  };
};
