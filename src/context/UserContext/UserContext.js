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
  const [isCronJobTriggered, setIsCronJobTriggered] = useState(false);
  const [allCollections, setAllCollections] = useState([]);
  const { user, setUser } = useAuthContext(); // Use the useAuthContext hook

  const triggerCronJob = async () => {
    // Add your code here
  };

  useEffect(() => {
    const { id, username } = cookies.userCookie || {};
    const userID = id;
    if (userID) {
      const updatedUser = { userID, username };
      setUser(updatedUser);
    }
  }, [cookies]);

  const updateUser = (userData) => {
    setUser(userData);
    setCookie('userCookie', userData, { path: '/' });
    console.log('User Data Sent to Server and Cookie Updated:', userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        allCollections,
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
