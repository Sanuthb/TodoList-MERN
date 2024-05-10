import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Edit from './pages/Edit';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="*" element={"Not Found"} />
    </Routes>
  );
}

export default App
