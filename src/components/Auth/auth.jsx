import { useContext, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/authContext';
import CartPage from '../../pages/CartPage';
import ProfilePage from '../../pages/ProfilePage';
import CollectionPage from '../../pages/CollectionPage';
import DeckBuilderPage from '../../pages/DeckBuilderPage';

function Auth({ children, capability }) {
  const authContext = useContext(AuthContext);
  const isloggedin = authContext.isloggedin;
  // const canDo = authContext.can(capability) ? true : false;
  console.log('isloggedin', isloggedin);
  // console.log('canDo', canDo);
  console.log('capability', capability);
  return isloggedin ? (
    <Routes>
      {/* <Route exact path="/cart" element={<CartPage />} />
      <Route exact path="/userprofile" element={<ProfilePage />} />
      <Route exact path="/collection" element={<CollectionPage />} />
      <Route exact path="/deckbuilder" element={<DeckBuilderPage />} /> */}
      {children}
    </Routes>
  ) : (
    <p>You do not have permission to view this page.</p>
  );
}

export default memo(Auth);
