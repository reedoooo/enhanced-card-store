import jwt_decode from 'jwt-decode';

// login status
// export const LOGGED_IN_COOKIE = 'isLoggedIn';
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
  console.log('data --------------->', response);
  if (!response.data.accessToken) return null;
  const processedData = {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    authData: jwt_decode(response.data.accessToken),
    refreshData: jwt_decode(response.data.refreshToken),
    basicData: response.data?.user?.userBasicData,
    securityData: response.data?.user?.userSecurityData,
    responseData: response.data,
  };
  console.log('accessToken --------------->', processedData.accessToken);
  console.log('refreshToken --------------->', processedData.refreshToken);
  console.log('processedData --------------->', processedData);

  return processedData;
};
