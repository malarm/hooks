import React, { useContext } from 'react';
import Auth from './components/Auth';
import { AuthuContext } from './components/context/auth.context';

import Ingredients from './components/Ingredients/Ingredients';

const App = props => {
  return <Ingredients />
  /*const authContext = useContext(AuthuContext);
  let content = <Auth />
  if (authContext.isAuth) {
    content = <Ingredients />
  }
  return content;*/
};

export default App;
