import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Main from './components/Main';
import EmailVerify from './components/EmailVerify';


function App() {
  return (
    <Routes>
      <Route path='/verify' exact element={<Main/>}/>
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/signin' exact element={<Signin/>}/>
      <Route path='/signin' exact element={<Navigate replace to='/login'/>}/>
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
    </Routes>

  );
}

export default App;
