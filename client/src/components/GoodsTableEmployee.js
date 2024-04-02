import '../App.css';
import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import GoodsListEmployee from './GoodsListEmployee.js'

export default function GoodsTableEmployee({user}){
  const location = useLocation

  const [goods, setGoods] = useState([])
  const [counter, setCounter] = useState(0)
  const [filteredGoods, setFilteredGoods] = useState([])
  const [filterFlag, setFilterFlag]= useState(false)

  const [itemGroup, setItemGroup] = useState('')
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('')

  const [goodId, setGoodId] = useState('')

  const [info, setInfo] = useState(null)
  const [request, setRequest] = useState('')

  const [requests, setRequests] = useState([])

  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
      showGoods()
      getRequests()
  },[])
  useEffect(()=>{
    getLastRequest()
  },[requests])

  async function getRequests(){
    try{
      const getRes = await fetch('http://localhost:8080/request/get-requests');
      const data = await getRes.json()
      setRequests(data)
    }
    catch(err){
      console.error(err)
    }
    
  }

  async function getLastRequest(){
    if(requests.length ===0){
      setButtonDisabled(true)
    }
    if(requests.length>0){
      setButtonDisabled(false)
      try{
        const getRes = await fetch('http://localhost:8080/request/get-last-request')
        if(getRes.status=== 200){
          const request = await getRes.json()
          setRequest(request)
        }
        else{
          console.error('No requests')
          setButtonDisabled(true)
        }
      }
      catch{
        console.error("no requests")
      }
    }
  }


  async function createRequest(){
    try{
      const postRes = await fetch('http://localhost:8080/request/add-request',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({employeeName:user.userName, comment:'', status:'New'})
      })
      const request = await postRes.json()
      setRequest(request)
      setInfo(`Request ID ${request.requestId} created`)
      setTimeout(() => {
        setInfo('')
      }, "1000");
    }
    catch(err){
      console.error(err)
    }
    setButtonDisabled(false)
  }


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
      <br></br>
      <button onClick={()=>createRequest()}>Create a request</button><p style={{display:'inline-block'}}><b>------- Click to create a new request</b></p> 
      <br></br>
      {info && <h2 style={{color: 'green'}}>{info}</h2>}
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
        <table id='goods-table-employee' className='goods'>
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
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {
            filterFlag ?(
              filteredGoods.map(good =>{
              return <GoodsListEmployee key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} priceWithoutVat={good.priceWithoutVat}
              status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson} request={request.requestId} user={user} isButtonDisabled={isButtonDisabled}/>
              })
            )
            :
            (
              goods.map(good =>{
                return <GoodsListEmployee key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} priceWithoutVat={good.priceWithoutVat}
                  status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson} request={request.requestId} user={user} isButtonDisabled={isButtonDisabled}/>
                })
            )
            }
          </tbody>
        </table>
      </div>
    </>
  )

}