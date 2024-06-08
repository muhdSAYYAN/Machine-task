import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index  element={<LoginPage/>}/>
        
        <Route path='/home'  element={<HomePage/>}/>
        </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
