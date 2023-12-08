import jwt_decode from 'jwt-decode';

export const LOGGED_IN_COOKIE = 'loggedIn';
export const AUTH_COOKIE = 'authToken';
export const USER_COOKIE = 'user';

// Validator function
export const validateData = (data, eventName, functionName) => {
  if (!data || Object.keys(data).length === 0) {
    console.warn(`Invalid data in ${functionName} for ${eventName}`);
    return false;
  }
  return true;
};

// Process the server response based on the action type (Login/Signup)
export const processResponseData = (data, type) => {
  if (!validateData(data, `${type} Response`, `process${type}Data`))
    return null;

  if (type === 'Login') {
    const token = data?.data?.token;
    if (!token) return null;
    const user = jwt_decode(token);
    return { token, user };
  }

  if (type === 'Signup') {
    const { success, newUser } = data;
    if (success && newUser) return { success, newUser };
  }

  return null;
};
