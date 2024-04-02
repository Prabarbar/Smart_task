import '../App.css';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import GoodsListCoordinator from './GoodsListCoordinator.js'

export default function GoodsTableCoordinator(){
  const [goods, setGoods] = useState([])
  const [counter, setCounter] = useState(0)
  const [filteredGoods, setFilteredGoods] = useState([])
  const [filterFlag, setFilterFlag]= useState(false)

  const [itemGroup, setItemGroup] = useState('')
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('')

  const [goodId, setGoodId] = useState('')

  const navigate = useNavigate();

  useEffect(()=>{
      showGoods()
  },[])

  async function showGoods(){
    try{
        const getRes = await fetch('http://localhost:8080/good/get-goods');
        const goods = await getRes.json()
        setGoods(goods)
        setFilteredGoods(goods)
      }
    catch(err){
      console.error(err)
    }
  }


  function handleSort(element){
    if(filterFlag === false){
      if(counter % 2 === 0){
        goods.sort((a, b)=>(a[element] < b[element] ? -1 : 1))
      }
      else{
        goods.sort((a, b)=>(a[element] > b[element] ? -1 : 1))
      }
      const sortedGoods = [...goods]
      setGoods(sortedGoods)
      setCounter(counter +1)
    }
    else{
      if(counter % 2 === 0){
        filteredGoods.sort((a, b)=>(a[element] < b[element] ? -1 : 1))
      }
      else{
        filteredGoods.sort((a, b)=>(a[element] > b[element] ? -1 : 1))
      }
      const sortedGoods = [...filteredGoods]
      setFilteredGoods(sortedGoods)
      setCounter(counter +1)
    }
  }

  async function handleFilter(){
      try{
          const getRes = await fetch(`http://localhost:8080/good/get-good-by?itemGroup=${itemGroup}&unitOfMeasurement=${unitOfMeasurement}`);
          const goods = await getRes.json()
          setFilteredGoods(goods)
        }
      catch(err){
        console.error(err)
      }
      setFilterFlag(true)
      if(itemGroup === '' && unitOfMeasurement === ''){
        setFilterFlag(false)
      }
    }
  
    async function handleFind(){
      try{
        const getRes = await fetch(`http://localhost:8080/good/get-good?id=${goodId}`);
        const good = await getRes.json()
        setGoods([good])
      }
      catch(err){
        console.error(err)
      }
    }
  
  return(    
    <>
      <button onClick={()=>navigate("/menu")}>Back</button>
      <button onClick={()=>navigate("/menu")}>Home</button>
      <br></br>
      <button onClick={()=>navigate("/coordinator-page/add-good")}>Add Good</button>
      <br></br>
      <p>-----------------------------------------------------------</p>
      <label>Filter Item Group:
        <select onChange={e=>setItemGroup(e.target.value)}>
          <option value=''>No filter</option>
          <option value='food'>food</option>
          <option value='tools'>tools</option>
          <option value='furniture'>furniture</option>
        </select>
      </label>
      <br></br>
      <label>Filter Unit of Measurement:
        <select onChange={e=>setUnitOfMeasurement(e.target.value)}>
          <option value=''>No filter</option>
          <option value='pieces'>pieces</option>
          <option value='grams'>grams</option>
          <option value='kilograms'>kilograms</option>
        </select>
      </label>
      <br></br>
      <button onClick={handleFilter}>Apply filters</button>
      <button onClick={()=>setFilterFlag(false)}>Clear filters</button>
      <br></br>
      <p>-----------------------------------------------------------</p>
      <label>
        Find good by Id:
        <input onChange={(e)=>setGoodId(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleFind()
                }
              }}>
        </input>
        <br></br>
        <button onClick={()=>showGoods()}>Clear</button>
      </label>
      <div>
        <h2 style={{textAlign:'center'}}>Goods Table</h2>
        <table id='goods-table' className='goods'>
          <thead>
            <tr>
              <th>Item Id
                <button id='th-button' style={{textAlign:'left'}}onClick={()=>handleSort("itemId")}>&#8595;&#8593;</button>
              </th>
              <th>Item Group
                <button id='th-button' onClick={()=>handleSort("itemGroup")}>&#8595;&#8593;</button>
              </th>
              <th>Unit of Measurement
                <button id='th-button' onClick={()=>handleSort("unitOfMeasurementt")}>&#8595;&#8593;</button>
              </th>
              <th>Quantity
                <button id='th-button' onClick={()=>handleSort("quantity")}>&#8595;&#8593;</button>
              </th>
              <th>Price Without Vat
                <button id='th-button' onClick={()=>handleSort("priceWithoutVat")}>&#8595;&#8593;</button>
              </th>
              <th>Status
                <button id='th-button' onClick={()=>handleSort("status")}>&#8595;&#8593;</button>
              </th>
              <th>Storage Location
                <button id='th-button' onClick={()=>handleSort("storageLocation")}>&#8595;&#8593;</button>
              </th>
              <th>Contact Person
                <button id='th-button' onClick={()=>handleSort("contactPerson")}>&#8595;&#8593;</button>
              </th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
            filterFlag ?(
              filteredGoods.map(good =>{
              return <GoodsListCoordinator key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} priceWithoutVat={good.priceWithoutVat}
              status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson} showGoods={showGoods}/>
              })
            )
            :
            (
              goods.map(good =>{
                return <GoodsListCoordinator key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} priceWithoutVat={good.priceWithoutVat}
                  status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson} showGoods={showGoods}/>
                })
            )
            }
          </tbody>
        </table>
      </div>
    </>
  )

}