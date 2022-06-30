import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin';

function App() {
  return (
    <Routes>
      <Route path='/signup' exact element={<SignUp/>}/>
      <Route path='/signin' exact element={<SignIn/>}/>
    </Routes>

  );
}

export default App;
