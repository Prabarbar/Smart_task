import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RequestList({requestId, employeeName, itemId, unitOfMeasurement, quantity, priceWithoutVat, comment, status, showRequests}){


  const [newComment, setNewComment] = useState(comment)
  const [rejectFlag, setRejectFlag] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [requestedGoods, setRequestedGoods] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    if(status === 'Approved' || status === "Rejected"){
      setButtonDisabled(true)
    }
    getRequestedGoods()
  },[])


  async function getRequestedGoods(){
    try{
      const getRes = await fetch(`http://localhost:8080/request/get-requested-goods?requestId=${requestId}`)
      const data = await getRes.json()
      setRequestedGoods(data)
      
  }
  catch(err){
      console.error(err)
  }
  }

  async function handleConfirm(){
    for(let i=0; i<requestedGoods.length; i++){
      // In the try{} below i substract the quantity of the item, if request is approved.
      let newQuantity = ''
      let requestedGoodId = requestedGoods[i].itemId
      let indexOfDot = requestedGoodId.indexOf('.')
      requestedGoodId = requestedGoodId.substring(0,indexOfDot)
      try{
          const getRes = await fetch(`http://localhost:8080/good/get-good?id=${requestedGoodId}`)
          const good = await getRes.json()
          let newQuantityNum = parseInt(good.quantity) - parseInt(requestedGoods[i].requestedQuantity)
          if(newQuantityNum < 0){
              newQuantityNum = 0
          }
          newQuantity = newQuantityNum.toString()
      }
      catch(err){
          console.error(err)
      }
      try{
          await fetch(`http://localhost:8080/good/update-good?id=${requestedGoodId}`, {
              method: 'PATCH',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({quantity: newQuantity})
          })
      }
      catch(err){
          console.error( err)
      }
      if(newQuantity === '0'){
        try{
          await fetch(`http://localhost:8080/good/delete-good?id=${requestedGoodId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
            })
        }
        catch(err){
          console.error(err)
        }
      }
    }
    try{
      await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                              quantity:quantity, priceWithoutVat:priceWithoutVat, comment:comment, status:'Approved'})
      })
    }
    catch(err){
      console.error(err)
    }
      // I commited deleting a request, just in case..
      //
      // try{
      //     const delRes = await fetch(`http://localhost:8080/request/delete-request?id=${requestId}`, {
      //       method: 'DELETE',
      //       headers: {'Content-Type': 'application/json'}
      //       })
      //     const request = await delRes.json()
      //     console.log(request)
      //   }
      //   catch(err){
      //     console.error(err)
      //   }   

    showRequests()
    setButtonDisabled(true)
  }

  async function handleReject(){
    try{
      await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                              quantity:quantity, priceWithoutVat:priceWithoutVat, comment:comment, status:'Rejected'})
      })
    }
    catch(err){
      console.error(err)
    }
    setRejectFlag(true)
    showRequests()
  }

  async function handleNewComment(){
    try{
      await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                              quantity:quantity, priceWithoutVat:priceWithoutVat, comment:newComment, status:'Rejected'})
      })
    }
    catch(err){
      console.error(err)
    }
    setRejectFlag(false)
    showRequests()
    setButtonDisabled(true)
  }
     

  return(
    !rejectFlag ?(
    <>
    <tr>
      <td>{requestId}</td>
      <td>{employeeName}</td>
      <td>{comment}</td>
      <td>{status}</td>
      <td><button onClick={()=>navigate('/opened-request', {state:{requestId:requestId}})}>Open</button></td>
      <td><button disabled={isButtonDisabled} onClick={handleConfirm}>Confirm</button></td>
      <td><button disabled={isButtonDisabled} onClick={handleReject}>Reject</button></td>
    </tr>
    </>
    )
    :
    (
      <tr>
      <td>{requestId}</td>
      <td>{employeeName}</td>
      <td>
        <textarea maxLength='100' placeholder='Maximum 100 characters' onChange={e => setNewComment(e.target.value)}></textarea>
        <button onClick={handleNewComment}>Send</button>
      </td>
      <td>{status}</td>
      </tr>
    )
  )
}