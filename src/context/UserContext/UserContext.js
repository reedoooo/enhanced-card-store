import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../hooks/auth';
import { useCollectionStore } from '../CollectionContext/CollectionContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['userCookie']);
  // const [user, setUser] = useState(null);
  const [isCronJobTriggered, setIsCronJobTriggered] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  const { user, setUser } = useAuthContext(); // Use the useAuthContext hook
  // const { fetchCollections, fetchAllCollectionsForUser } = useCollectionStore();

  const triggerCronJob = async () => {
    // Add your code here
  };

  useEffect(() => {
    const { id, username } = cookies.userCookie || {};
    const userID = id;
    if (userID) {
      const updatedUser = { userID, username };
      setUser(updatedUser);
      // setAuthUser(updatedUser); // Update the user in AuthContext as well
    }
  }, [cookies]);

  const updateUser = (userData) => {
    setUser(userData);
    // setAuthUser(userData); // Update the user in AuthContext
    setCookie('userCookie', userData, { path: '/' });
    console.log('User Data Sent to Server and Cookie Updated:', userData);
  };

  // const fetchAndSetCollections = useCallback(async () => {
  //   const collections = fetchAllCollectionsForUser(user.id);
  //   if (collections) {
  //     setAllCollections(collections); // This is saved in the context
  //   }
  // }, [user.id, fetchCollections]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        allCollections,
        // fetchAndSetCollections,
        setCookie,
        updateUser,
        triggerCronJob,
        isCronJobTriggered,
        setIsCronJobTriggered,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export default UserContext;
