import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import RequestsList from './RequestsList.js'

export default function RequestsTable(){
    const [requests, setRequests] = useState([])
    const [counter, setCounter] = useState(0)

  const navigate = useNavigate();

  useEffect(()=>{
      showRequests()
  },[])

  async function showRequests(){
    try{
        const getRes = await fetch('http://localhost:8080/request/get-requests');
        const requests = await getRes.json()
        setRequests(requests)
      }
    catch(err){
      console.error(err)
    }
  }


  function handleSort(element){
    if(counter % 2 === 0){
      requests.sort((a, b)=>{
        if(a[element] < b[element]){
          return -1;
        }
        else {
          return 1;
        }
      })
      const ascendingRequests = Object.assign([],requests);
      setRequests(ascendingRequests)
      setCounter(counter+1)
    }
    else{
      requests.sort((a, b)=>{
        if(a[element] > b[element]){
          return -1;
        }
        else {
          return 1;
        }
      })
      const descendingRequests= Object.assign([], requests);
      setRequests(descendingRequests);
      setCounter(counter +1)
    }
  }

  
  return(    
    <>
      <button onClick={()=>navigate("/coordinator-page")}>Back</button>
      <button onClick={()=>navigate("/")}>Home</button>
      <br></br>
      <div>
        <h2 style={{textAlign:'center'}}>Requests Table</h2>
        <table id='requests-table' className='requests'>
          <thead>
            <tr>
              <th>Request Id
                <button id='th-button' style={{textAlign:'left'}}onClick={()=>handleSort("requestId")}>&#8595;&#8593;</button>
              </th>
              <th>Emloyee Name
                <button id='th-button' onClick={()=>handleSort("employeeName")}>&#8595;&#8593;</button>
              </th>
              <th>Item Id
                <button id='th-button' onClick={()=>handleSort("itemId")}>&#8595;&#8593;</button>
              </th>
              <th>Unit of measurement
                <button id='th-button' onClick={()=>handleSort("unitOfMeasurement")}>&#8595;&#8593;</button>
              </th>
              <th>Quantity
                <button id='th-button' onClick={()=>handleSort("quantity")}>&#8595;&#8593;</button>
              </th>
              <th>Price without VAT
                <button id='th-button' onClick={()=>handleSort("priceWithoutVat")}>&#8595;&#8593;</button>
              </th>
              <th>Comment</th>
              <th>Confirm</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request =>{
            return <RequestsList key={request.requestId} requestId={request.requestId} employeeName={request.employeeName} itemId={request.itemId} unitOfMeasurement={request.unitOfMeasurement}
                                quantity={request.quantity} priceWithoutVat={request.priceWithoutVat} comment={request.comment} showRequests={showRequests}/>
            })}
          </tbody>
        </table>
      </div>
    </>
  )


}