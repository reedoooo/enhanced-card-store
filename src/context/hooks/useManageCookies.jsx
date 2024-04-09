import { useCookies } from 'react-cookie';

function useManageCookies() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const addCookie = (name, value, options = {}) => {
    setCookie(name, value, options);
  };
  const addCookies = (names, values, options = {}) => {
    if (Array.isArray(names) && Array.isArray(values)) {
      names.forEach((name, index) => {
        const value = values[index];
        if (value !== undefined) {
          // Check to prevent setting undefined cookies
          setCookie(name, JSON.stringify(value), options);
        }
      });
    } else {
      setCookie(names, JSON.stringify(values), options);
    }
  };
  const getCookie = (nameOrNames) => {
    const parseCookieValue = (value) => {
      try {
        value = JSON.parse(value);
      } catch (e) {
        if (value === 'true') return true;
        if (value === 'false') return false;
      }
      return value;
    };

    if (Array.isArray(nameOrNames)) {
      return nameOrNames.reduce((acc, name) => {
        acc[name] = parseCookieValue(cookies[name]);
        return acc;
      }, {});
    } else {
      // Handling a single cookie name
      // return {
      //   [nameOrNames]: parseCookieValue(cookies[nameOrNames]),
      // };
      return parseCookieValue(cookies[nameOrNames]);
    }
  };

  // Function to remove a cookie
  const deleteCookie = (name) => {
    removeCookie(name);
  };
  const deleteCookies = (names) => {
    if (Array.isArray(names)) {
      names.forEach((name) => {
        removeCookie(name);
      });
    } else {
      removeCookie(names);
    }
  };

  return { addCookie, addCookies, getCookie, deleteCookie, deleteCookies };
}

export default useManageCookies;
