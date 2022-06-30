import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path='/signup' exact element={<Signup/>}/>
    </Routes>

  );
}

export default App;
