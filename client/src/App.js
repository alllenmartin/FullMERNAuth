import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';


function App() {
  return (
    <Routes>
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/signin' exact element={<Signin/>}/>
    </Routes>

  );
}

export default App;
