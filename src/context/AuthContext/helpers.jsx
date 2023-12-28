import jwt_decode from 'jwt-decode';

export const LOGGED_IN_COOKIE = false;
export const AUTH_COOKIE = 'authToken';
export const USER_COOKIE = 'user';
export const AUTH_USER_COOKIE = 'authUser';
export const USER_ID_COOKIE = 'userId';
// Validator function
export const validateData = (data, eventName, functionName) => {
  if (!data || Object.keys(data).length === 0) {
    console.warn(`Invalid data in ${functionName} for ${eventName}`);
    return false;
  }
  return true;
};

// Process the server response based on the action type (Login/Signup)
export const processResponseData = (response, type) => {
  // if (!validateData(data, `${type} Response`, `process${type}Data`))
  //   return null;
  const { message, data } = response.data;
  const token = data?.token;
  console.log('token --------------->', token);
  if (!token) return null;
  const processedData = {
    token: token,
    authData: jwt_decode(token),
    userData: data?.user,
    data: data,
    message: message,
  };
  console.log('processedData --------------->', processedData);

  return processedData;
};
