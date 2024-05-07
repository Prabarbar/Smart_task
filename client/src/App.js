import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddGood from './components/AddGood.js'
import GoodsTableCoordinator from './components/GoodsTableCoordinator.js'
import Home from './components/Home.js'
import GoodsTableEmployee from './components/GoodsTableEmployee.js'
import OrderForm from './components/OrderForm.js'
import Menu from './components/Menu.js'
import RequestsTable from './components/RequestsTable.js'
import NavBar from './components/Bars/NavBar.js';
import FootBar from './components/Bars/FootBar.js';
import OpenedRequestTable from './components/OpenedRequestTable.js';

function App() {


  // commit check 2
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = 'Smart App';
  }, [])

  return (
    <>
    <header>
      <NavBar setUser={setUser} user={user}/>
    </header>
    <Routes>
      <Route path='/' element={<Home user={user} setUser={setUser} />}></Route>
      <Route path='/goods-table-employee' element={<GoodsTableEmployee user={user}/>}></Route>
      <Route path='/goods-table-coordinator' element={<GoodsTableCoordinator/>}></Route>
      <Route path='/coordinator-page/add-good' element={<AddGood/>}></Route>
      <Route path='/order-form' element={<OrderForm/>}></Route>
      <Route path='/menu' element={<Menu user={user}/>}></Route>
      <Route path='/requests-table' element={<RequestsTable/>}></Route>
      <Route path='/opened-request' element={<OpenedRequestTable/>}></Route>
    </Routes>
    <footer>
      <FootBar user={user}/>
    </footer>
    </>
  ) 
}

export default App;
