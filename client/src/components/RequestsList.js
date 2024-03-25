import { useEffect } from "react"
import { useState } from "react"

export default function RequestList({requestId, employeeName, itemId, unitOfMeasurement, quantity, priceWithoutVat, comment, status, showRequests}){

  const [newComment, setNewComment] = useState(comment)
  const [rejectFlag, setRejectFlag] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  useEffect(()=>{
    if(status === 'Approved' || status === "Rejected"){
      setButtonDisabled(true)
    }
  },[])

    async function handleConfirm(){
      // In the try{} below i substract the quantity of the item, if request is approved.
        let newQuantity = ''
        try{
            const getRes = await fetch(`http://localhost:8080/good/get-good?id=${itemId}`)
            const good = await getRes.json()
            let newQuantityNum = parseInt(good.quantity) - parseInt(quantity)
            if(newQuantityNum < 0){
                newQuantityNum = 0
            }
            newQuantity = newQuantityNum.toString()
        }
        catch(err){
            console.error(err)
        }
        try{
            const patchRes = await fetch(`http://localhost:8080/good/update-good?id=${itemId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({quantity: newQuantity})
            })
            const request = await patchRes.json()
            console.log(request)
        }
        catch(err){
            console.error( err)
        }

        try{
          const patchRes = await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                                  quantity:quantity, priceWithoutVat:priceWithoutVat, comment:comment, status:'Approved'})
          })
          const request = await patchRes.json()
          console.log(request)
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

          if(newQuantity === '0'){
            try{
              const delRes = await fetch(`http://localhost:8080/good/delete-good?id=${itemId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
                })
              const good = await delRes.json()
              console.log(good)
            }
            catch(err){
              console.error(err)
            }
          }

        showRequests()
        setButtonDisabled(true)
    }

    async function handleReject(){
      try{
        const patchRes = await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                                quantity:quantity, priceWithoutVat:priceWithoutVat, comment:comment, status:'Rejected'})
        })
        const request = await patchRes.json()
        console.log(request)
      }
      catch(err){
        console.error(err)
      }
      setRejectFlag(true)
      showRequests()
    }

    async function handleNewComment(){
      try{
        const patchRes = await fetch(`http://localhost:8080/request/update-request?id=${requestId}`,{
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({employeeName:employeeName, itemId:itemId, unitOfMeasurement:unitOfMeasurement,
                                quantity:quantity, priceWithoutVat:priceWithoutVat, comment:newComment, status:'Rejected'})
        })
        const request = await patchRes.json()
        console.log(request)
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
        <td>{itemId}</td>
        <td>{unitOfMeasurement}</td>
        <td>{quantity}</td>
        <td>{priceWithoutVat}</td>
        <td>{comment}</td>
        <td>{status}</td>
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
        <td>{itemId}</td>
        <td>{unitOfMeasurement}</td>
        <td>{quantity}</td>
        <td>{priceWithoutVat}</td>
        <td>
          <textarea maxLength='100' placeholder='Maximum 100 characters' onChange={e => setNewComment(e.target.value)}></textarea>
          <button onClick={handleNewComment}>Send</button>
        </td>
        <td>{status}</td>
        </tr>
      )
    )
}