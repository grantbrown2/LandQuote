import './App.css';
import LoginReg from './components/LoginReg';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginReg/>} />
        <Route path='/home' element={<div>LOGGED IN</div>} />
      </Routes>
    </div>
  );
}

export default App;
