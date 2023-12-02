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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [isCronJobTriggered, setIsCronJobTriggered] = useState(false);
  const [allCollections, setAllCollections] = useState([]);
  const { user, setUser } = useAuthContext(); // Use the useAuthContext hook

  const triggerCronJob = async () => {
    // Add your code here
  };

  useEffect(() => {
    const userId = user?.id;
    const username = user?.username;
    if (userId) {
      const updatedUser = { userId, username };
      setUser(updatedUser);
    }
  }, [cookies]);

  const updateUser = (userData) => {
    setUser(userData);
    setCookie('user', userData, { path: '/' });
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
