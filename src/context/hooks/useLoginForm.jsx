// import { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { useAuthContext } from '../../context/hooks/auth';

// export const useLoginForm = (onLogin) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [roleData, setRoleData] = useState('admin');
//   const [signupMode, setSignupMode] = useState(false);

//   const { signup, login, logout, isLoggedIn, error, isLoading } =
//     useAuthContext();
//   const [cookies, setCookie, removeCookie] = useCookies([
//     'isLoggedIn',
//     'userId',
//   ]);

//   const setLoginState = (isLoggedIn, userId) => {
//     const expires = new Date();
//     expires.setMinutes(expires.getMinutes() + 45);
//     setCookie('isLoggedIn', isLoggedIn, { expires });
//     setCookie('userId', userId, { expires });
//     onLogin(isLoggedIn, userId);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let response = null;

//       if (signupMode) {
//         response = await signup(username, password, email, name, roleData);
//       } else {
//         response = await login(username, password);
//       }

//       if (response?.loggedIn) {
//         setLoginState(true, response.userId);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   const handleLogout = () => {
//     removeCookie('userId', { path: '/' });
//     logout();
//   };

//   return {
//     username,
//     setUsername,
//     password,
//     setPassword,
//     email,
//     setEmail,
//     name,
//     setName,
//     roleData,
//     setRoleData,
//     signupMode,
//     setSignupMode,
//     handleSubmit,
//     handleLogout,
//     isLoggedIn,
//     error,
//     isLoading,
//     cookies,
//   };
// };
