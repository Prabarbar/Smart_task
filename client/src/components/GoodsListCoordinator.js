import {useState} from 'react'

export default function GoodsListCoordinator({itemId, itemGroup, unitOfMeasurement, quantity, priceWithoutVat, status, storageLocation, contactPerson, showGoods }){

  const [editFlag, setEditFlag] = useState(false)

  const [newItemGroup, setNewItemGroup] = useState(itemGroup)
  const [newUnitOfMeasurement, setNewUnitOfMeasurement] = useState(unitOfMeasurement)
  const [newQuantity, setNewQuantity] = useState(quantity)
  const [newPriceWithoutVat, setNewPriceWithoutVat] = useState(priceWithoutVat)
  const [newStatus, setNewStatus] = useState(status)
  const [newStorageLocation, setNewStorageLocation] = useState(storageLocation)
  const [newContactPerson, setNewContactPerson] = useState(contactPerson)

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
        <td>
          {itemGroup} 
          <select onChange={(e)=>setNewItemGroup(e.target.value)}>
            <option value={''}>Select option</option>
            <option value={'food'}>Food</option>
            <option value={'tools'}>Tools</option>
            <option value={'furniture'}>Furniture</option>
          </select>
        </td>
        <td>
          {unitOfMeasurement}
          <select onChange={(e)=>setNewUnitOfMeasurement(e.target.value)}>
            <option value={''}>Select option</option>
            <option value={'grams'}>Grams</option>
            <option value={'kilograms'}>Kilograms</option>
            <option value={'pieces'}>Pieces</option>
          </select>
        </td>
        <td>{quantity} <input type='number' onChange={e => setNewQuantity(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}
        ></input></td>
        <td>{priceWithoutVat} <input type='number' onChange={e => setNewPriceWithoutVat(e.target.value)} onKeyDown={e => {
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
        <td>{contactPerson} <textarea maxLength={50} placeholder='Maximum 50 characters' onChange={e => setNewContactPerson(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleEdit(itemId)
                }
              }}></textarea></td>
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