import jwt_decode from 'jwt-decode';

// login status
export const LOGGED_IN_COOKIE = false;
// token
export const AUTH_COOKIE = 'authToken';
// user login token + data
export const AUTH_USER_COOKIE = 'authUser';
// user basic data
export const USER_BASIC_DATA_COOKIE = 'userBasicData';
// user security data
export const USER_SECURITY_DATA_COOKIE = 'userSecurityData';
// all user data
export const USER_COOKIE = 'user';
// user id
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
  console.log('message --------------->', message);
  const token = data?.token;
  console.log('token --------------->', token);
  if (!token) return null;
  const processedData = {
    token: token,
    authData: jwt_decode(token),
    basicData: data?.userBasicData,
    securityData: data?.userSecurityData,
    data: data,
    message: message,
  };
  console.log('processedData --------------->', processedData);

  return processedData;
};
