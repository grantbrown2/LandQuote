import './App.css';
import LoginReg from './components/LoginReg';
import Main from './views/Main';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginReg/>} />
        <Route path='/home' element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
