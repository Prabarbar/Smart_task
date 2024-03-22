import {useState} from 'react'

export default function GoodsListCoordinator({itemId, itemGroup, unitOfMeasurement, quantity, priceWithoutVat, status, storageLocation, contactPerson, showGoods }){

  const [editFlag, setEditFlag] = useState(false)

  const [newItemGroup, setNewItemGroup] = useState('')
  const [newUnitOfMeasurement, setNewUnitOfMeasurement] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [newPriceWithoutVat, setNewPriceWithoutVat] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newStorageLocation, setNewStorageLocation] = useState('')
  const [newContactPerson, setNewContactPerson] = useState('')

  async function handleRemove(id){
    try{
      const delRes = await fetch(`http://localhost:8080/good/delete-good?id=${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
        })
      const good = await delRes.json()
      console.log(good)
    }
    catch(err){
      console.error(err)
    }
    showGoods()
  }

  async function handleEdit(id){
    try{
        const patchRes = await fetch(`http://localhost:8080/good/update-good?id=${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({itemGroup:newItemGroup, unitOfMeasurement:newUnitOfMeasurement, quantity:newQuantity, priceWithoutVat:newPriceWithoutVat,
                                  status:newStatus, storageLocation:newStorageLocation, contactPerson:newContactPerson})
        })
        const good = await patchRes.json()
        console.log(good)
    }
    catch(err){
        console.error( err)
    }
    setEditFlag(false)
    showGoods()
}

  return(
    !editFlag ?(
    <>
      <tr>
        <td>{itemId}</td>
        <td>{itemGroup}</td>
        <td>{unitOfMeasurement}</td>
        <td>{quantity}</td>
        <td>{priceWithoutVat}</td>
        <td>{status}</td>
        <td>{storageLocation}</td>
        <td>{contactPerson}</td>
        <td><button onClick={()=>setEditFlag(true)}>Edit</button></td>
        <td><button onClick={()=>handleRemove(itemId)}>Remove</button></td>
      </tr>
    </>
    )
    :
    (
    //Accepting edited data is possible by clicking on "Submit Button" or just pressing the "Enter" key. Normally i would create one option, but as it is a recruitment task i created both.
    <>
      <tr>
        <td>{itemId}</td>
        <td>{itemGroup} <input type='text' onChange={e => setNewItemGroup(e.target.value)}></input></td>
        <td>{unitOfMeasurement}<input type='text' onChange={e => setNewUnitOfMeasurement(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}></input></td>
        <td>{quantity} <input type='text' onChange={e => setNewQuantity(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}
        ></input></td>
        <td>{priceWithoutVat} <input type='text' onChange={e => setNewPriceWithoutVat(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}
        ></input></td>
        <td>{status} <input type='text' onChange={e => setNewStatus(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}></input></td>
        <td>{storageLocation} <input type='text' onChange={e => setNewStorageLocation(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}></input></td>
        <td>{contactPerson} <input type='text' onChange={e => setNewContactPerson(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}></input></td>
        <td>
          <button onClick={()=>setEditFlag(false)}>Edit</button>
          <button onClick={()=>handleEdit(itemId)}>Submit changes</button>
        </td>
        <td><button onClick={()=>handleRemove(itemId)}>Remove</button></td>
      </tr>
    </>
    )
  )
}