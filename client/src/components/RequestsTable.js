import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import RequestsList from './RequestsList.js'

export default function RequestsTable(){
    const [requests, setRequests] = useState([])
    const [counter, setCounter] = useState(0)
    const [filteredRequests, setFilteredRequests] = useState([])
    const [filterFlag, setFilterFlag]= useState(false)

    const [employeeName, setEmployeeName] = useState('')

    const [requestId, setRequestId] = useState('')


  const navigate = useNavigate();

  useEffect(()=>{
      showRequests()
  },[])

  async function showRequests(){
    try{
        const getRes = await fetch('http://localhost:8080/request/get-requests');
        const requests = await getRes.json()
        setRequests(requests)
        setFilteredRequests(requests)
      }
    catch(err){
      console.error(err)
    }
  }


  function handleSort(element){
    if(filterFlag === false){
      if(counter % 2 === 0){
        requests.sort((a, b)=>(a[element] < b[element] ? -1 : 1))
      }
      else{
        requests.sort((a, b)=>(a[element] > b[element] ? -1 : 1))
      }
      const sortedRequests = [...requests]
      setRequests(sortedRequests)
      setCounter(counter +1)
    }
    else{
      if(counter % 2 === 0){
        filteredRequests.sort((a, b)=>(a[element] < b[element] ? -1 : 1))
      }
      else{
        filteredRequests.sort((a, b)=>(a[element] > b[element] ? -1 : 1))
      }
      const sortedRequests = [...filteredRequests]
      setFilteredRequests(sortedRequests)
      setCounter(counter +1)
    }
  }


  async function handleFilter(){
    try{
        const getRes = await fetch(`http://localhost:8080/request/get-request-by?employeeName=${employeeName}`);
        const requests = await getRes.json()
        setFilteredRequests(requests)
      }
    catch(err){
      console.error(err)
    }
    setFilterFlag(true)
    if(employeeName === ''){
      setFilterFlag(false)
    }
  }

  async function handleFind(){
    try{
      const getRes = await fetch(`http://localhost:8080/request/get-request?id=${requestId}`);
      const request = await getRes.json()
      setRequests([request])
    }
    catch(err){
      console.error(err)
    }
  }

  async function handleDeleteRequests(){
    try{
      await fetch('http://localhost:8080/request/delete-requests',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
  })
    }
    catch(err){
      console.error(err)
    }
    showRequests()
}
  
  return(    
    <>
      <button onClick={()=>navigate("/menu")}>Back</button>
      <button onClick={()=>navigate("/menu")}>Home</button>
      <p>-----------------------------------------------------------</p>
      <label>Filter Employee Name:
        <input onChange={e=>setEmployeeName(e.target.value)}></input>
      </label>
      <br></br>
      <button onClick={handleFilter}>Apply filters</button>
      <button onClick={()=>setFilterFlag(false)}>Clear filters</button>
      <br></br>
      <p>-----------------------------------------------------------</p>
      <label>
        Find request by Id:
        <input onChange={(e)=>setRequestId(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleFind()
                }
              }}>
        </input>
        <br></br>
        <button onClick={()=>showRequests()}>Clear</button>
      </label>
      <br></br>
      <button onClick={()=>handleDeleteRequests()}>Delete Requests</button>
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
              <th>Comment</th>
              <th>Status</th>
              <th>Open request</th>
              <th>Confirm</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {
            filterFlag ?(
              filteredRequests.map(request =>{
              return <RequestsList key={request.requestId} requestId={request.requestId} employeeName={request.employeeName} itemId={request.itemId} unitOfMeasurement={request.unitOfMeasurement}
              quantity={request.quantity} priceWithoutVat={request.priceWithoutVat} comment={request.comment} status={request.status} showRequests={showRequests}/>
              })
            )
            :
            (
              requests.map(request =>{
                return <RequestsList key={request.requestId} requestId={request.requestId} employeeName={request.employeeName} itemId={request.itemId} unitOfMeasurement={request.unitOfMeasurement}
                quantity={request.quantity} priceWithoutVat={request.priceWithoutVat} comment={request.comment} status={request.status} showRequests={showRequests}/>
                })
            )
            }
          </tbody>
        </table>
      </div>
    </>
  )


}