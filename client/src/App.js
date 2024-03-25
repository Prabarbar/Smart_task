import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddGood from './components/AddGood.js'
import GoodsTableCoordinator from './components/GoodsTableCoordinator.js'
import Home from './components/Home.js'
import GoodsTableEmployee from './components/GoodsTableEmployee.js'
import OrderForm from './components/OrderForm.js'
import CoordinatorPage from './components/CoordinatorPage.js'
import RequestsTable from './components/RequestsTable.js'

function App() {

  useEffect(() => {
    document.title = 'Smart App';
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/goods-table-employee' element={<GoodsTableEmployee/>}></Route>
      <Route path='/coordinator-page/goods-table-coordinator' element={<GoodsTableCoordinator/>}></Route>
      <Route path='/coordinator-page/add-good' element={<AddGood/>}></Route>
      <Route path='/order-form' element={<OrderForm/>}></Route>
      <Route path='/coordinator-page' element={<CoordinatorPage/>}></Route>
      <Route path='/coordinator-page/requests-table' element={<RequestsTable/>}></Route>
    </Routes>
  ) 
}

export default App;
