export default function RequestList({requestId, employeeName, itemId, unitOfMeasurement, quantity, priceWithoutVat, comment, showRequests}){



    async function handleConfirm(id, requestId, quantity){
        let newQuantity = ''
        try{
            const getRes = await fetch(`http://localhost:8080/good/get-good?id=${id}`)
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
            const patchRes = await fetch(`http://localhost:8080/good/update-good?id=${id}`, {
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
            const delRes = await fetch(`http://localhost:8080/request/delete-request?id=${requestId}`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'}
              })
            const request = await delRes.json()
            console.log(request)
          }
          catch(err){
            console.error(err)
          }
        showRequests()
    }

    async function handleReject(requestId){
        try{
            const delRes = await fetch(`http://localhost:8080/request/delete-request?id=${requestId}`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'}
              })
            const request = await delRes.json()
            console.log(request)
          }
          catch(err){
            console.error(err)
          }
        showRequests()
    }

    return(
        <>
      <tr>
        <td>{requestId}</td>
        <td>{employeeName}</td>
        <td>{itemId}</td>
        <td>{unitOfMeasurement}</td>
        <td>{quantity}</td>
        <td>{priceWithoutVat}</td>
        <td>{comment}</td>
        <td><button onClick={()=>handleConfirm(itemId, requestId, quantity)}>Confirm</button></td>
        <td><button onClick={()=>handleReject(requestId)}>Reject</button></td>
      </tr>
    </>
    )
}