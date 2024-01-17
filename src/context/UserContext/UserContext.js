import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { useCookies } from 'react-cookie';
import useFetchWrapper from '../hooks/useFetchWrapper';
import { createApiUrl } from '../Helpers';
import { useAuthContext } from '../AuthContext/authContext';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['authUser', 'user', 'userId']);
  // const [allCollections, setAllCollections] = React.useState([]);
  // const [selectedCollection, setSelectedCollection] = React.useState(null);
  const { isLoggedIn } = useAuthContext();
  const { authUser, user, userId } = cookies;
  const fetchWrapper = useFetchWrapper();

  const fetchUserData = useCallback(async () => {
    if (userId) {
      // Get request to fetch user data
      const endPoint = `${userId}/userData`;
      const url = createApiUrl(endPoint);
      try {
        const response = await fetchWrapper(url, 'GET');
        const { message, data } = response;
        console.log('Response from server for fetch user:', message, data);
        setCookie('user', data.userDoc, { path: '/' });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [userId, fetchWrapper, setCookie]);

  const updateUser = useCallback(
    async (updatedUser) => {
      if (userId) {
        try {
          console.log('User Data Sent to Server:', updatedUser);
          const url = `/api/users/${userId}/userData/update`;
          const response = await fetchWrapper(url, 'PUT', updatedUser);
          const { message, data } = response;
          console.log('Response from server for update user:', message, data);
          setCookie('user', data.updatedUserDoc, { path: '/' });
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    },
    [userId, fetchWrapper, setCookie]
  );

  useEffect(() => {
    if (userId && isLoggedIn) fetchUserData();
  }, [fetchUserData]);

  const contextValue = {
    user: cookies.user,
    userId: authUser?.userId,
    updateUser,
    getUserData: fetchUserData,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;

// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useCallback,
// } from 'react';
// import { useCookies } from 'react-cookie';
// import { useAuthContext } from '../hooks/auth';
// import { createUrl } from '../Helpers';
// import useFetchWrapper from '../hooks/useFetchWrapper';
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const { setUser, isLoggedIn, basicData, securityData } = useAuthContext(); // Use the useAuthContext hook
//   const [cookies, setCookie] = useCookies(['authUser', 'user']);
//   const fetchWrapper = useFetchWrapper();
//   const authUser = cookies?.authUser;
//   const user = cookies?.user;
//   const userId = cookies?.authUser?.userId;
//   const fetchUserData = useCallback(async () => {
//     // Get request to fetch user data
//     const endpoint = `/users/${userId}/userData`;
//     const url = createUrl(endpoint);
//     const response = await fetchWrapper(url, 'GET');
//     const { message, data } = response;
//     console.log('Response from server for fetch user:', message, data);
//     // setUser(data.userDoc);
//     // const response = await fetchWrapper.get(`/api/users/${userId}`);
//     // const userData = response.data;
//   }, []);

//   const updateUser = async (updatedUser) => {
//     try {
//       console.log('User Data Sent to Server:', updatedUser);
//       const endpoint = `users/${userId}/userData/update`;
//       const url = createUrl(endpoint);
//       const response = await fetchWrapper(url, 'PUT', updatedUser);
//       const { message, data } = response;
//       console.log('Response from server for update user:', message, data);
//       setUser(data.updatedUserDoc);
//       console.log('User Data Sent to Server and Cookie Updated:', updatedUser);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       console.log('User ID found, fetching user data...', cookies.user);
//       const updatedUser = {
//         ...user,
//         userSecurityData: securityData,
//         userBasicData: basicData,
//       };
//       updateUser(updatedUser);
//     }
//   }, [userId]);

//   return (
//     <UserContext.Provider
//       value={{
//         user: user,
//         userId: authUser?.userId,
//         setUser,
//         updateUser,
//         getUserData: fetchUserData,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   return useContext(UserContext);
// };

// export default UserContext;
