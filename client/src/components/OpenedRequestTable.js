import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import OpenedRequestList from "./OpenedRequestList"

export default function OpenedRequestTable(){

    const location = useLocation()
    const navigate = useNavigate()
    const [requestedGoods, setRequestedGoods] = useState([])

    useEffect(()=>{
        getRequestedGoods()
    },[])

    async function getRequestedGoods(){
        try{
            const getRes = await fetch(`http://localhost:8080/request/get-requested-goods?requestId=${location.state.requestId}`)
            const data = await getRes.json()
            setRequestedGoods(data)
        }
        catch(err){
            console.error(err)
        }
      }

    return(
        <>
        <button onClick={()=>navigate('/requests-table')}>Back</button>
        <table id='requested-goods' className='goods'>
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Group</th>
              <th>Unit of Measurement</th>
              <th>Quantity</th>
              <th>Price Without Vat</th>
              <th>Status</th>
              <th>Storage Location</th>
              <th>Contact Person </th>
            </tr>
          </thead>
          <tbody>
              {requestedGoods.map(good =>{
                return <OpenedRequestList key={good.itemId} itemId={good.itemId} itemGroup={good.itemGroup} unitOfMeasurement={good.unitOfMeasurement} quantity = {good.quantity} requestedQuantity={good.requestedQuantity} priceWithoutVat={good.priceWithoutVat}
                  status={good.status} storageLocation={good.storageLocation} contactPerson={good.contactPerson}/>
                })}
          </tbody>
        </table>
        </>
    )
}