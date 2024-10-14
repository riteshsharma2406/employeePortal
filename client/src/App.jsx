import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Logo from './Components/Logo';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Employee from './Components/Employee';
import CreateEmployee from './Components/CreateEmployee';
import EditEmployee from './Components/EditEmployee';

function App() {

  return (
    <>
      <Router>
        <Logo/>
        <Navbar/>
        <Routes>
          <Route path={'/'} element= {<Home/>}/>
          <Route path= {"/login"} element = {<Login/>}/>
          <Route path={"/employee"} element={<Employee/>}/>
          <Route path={"/createEmployee"} element={<CreateEmployee/>} />
          <Route path={"/employee/:empId"} element={<EditEmployee/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
