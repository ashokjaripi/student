import { Route, Routes } from 'react-router-dom';

import './App.css';
// import Footer from './components/Footer';
import Header from "./components/Header";
import Home from './components/Home';
import AddStudent from './components/AddStudent/index'



const App = () => (
  <>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path='/students' element={ <AddStudent/> } />
    </Routes> 
    </>
  )
export default App;
