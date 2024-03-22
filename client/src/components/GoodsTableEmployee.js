import '../App.css';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import GoodsListEmployee from './GoodsListEmployee.js'

export default function GoodsTableEmployee(){
  const [goods, setGoods] = useState([])
  const [counter, setCounter] = useState(0)

  const navigate = useNavigate();

  useEffect(()=>{
      showGoods()
  },[])

  async function showGoods(){
    try{
        const getRes = await fetch('http://localhost:8080/good/get-goods');
        const goods = await getRes.json()
        setGoods(goods)
      }
    catch(err){
      console.error(err)
    }
  }


  function handleSort(element){
    if(counter % 2 === 0){
      goods.sort((a, b)=>{
        if(a[element] < b[element]){
          return -1;
        }
        else {
          return 1;
        }
      })
      const ascendingGoods = Object.assign([],goods);
      setGoods(ascendingGoods)
      setCounter(counter+1)
    }
    else{
      goods.sort((a, b)=>{
        if(a[element] > b[element]){
          return -1;
        }
        else {
          return 1;
        }
      })
      const descendingGoods= Object.assign([], goods);
      setGoods(descendingGoods);
      setCounter(counter +1)
    }
  }

  
  return(    
    <>
      <button onClick={()=>navigate("/")}>Back</button>
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
            {goods.map(good =>{
            return <GoodsListEmployee key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} priceWithoutVat={good.priceWithoutVat}
             status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson}/>
            })}
          </tbody>
        </table>
      </div>
    </>
  )

}