import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddGood(){
    const [itemGroup, setItemGroup] = useState('food')
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('pieces')
    const [quantity, setQuantity] = useState('')
    const [priceWithoutVat, setPriceWithoutVat] = useState('')
    const [status, setStatus] = useState('')
    const [storageLocation, setStorageLocation] = useState('')
    const [contactPerson, setContactPerson] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        try{
          const postRes = await fetch('http://localhost:8080/good/add-good',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({itemGroup:itemGroup, unitOfMeasurement:unitOfMeasurement, quantity:quantity, priceWithoutVat:priceWithoutVat,
                                 status:status, storageLocation:storageLocation, contactPerson:contactPerson})
          })
          const good = await postRes.json()
          console.log(good)
        }
        catch(err){
          console.error(err)
        }
        navigate("/coordinator-page/goods-table-coordinator")
      }


    return(
        <>
            <button onClick={()=>navigate("/coordinator-page/goods-table-coordinator")}>Back</button>
            <button onClick={()=>navigate("/")}>Home</button>
            <div style={{textAlign:'left'}}>
                <form onSubmit ={handleSubmit}>
                    <label>Item Group: 
                        <select onChange={e=>setItemGroup(e.target.value)}>
                            <option value='food'>food</option>
                            <option value='tools'>tools</option>
                            <option value='furniture'>furniture</option>
                        </select>
                    </label>
                    <br></br>
                    <label>Unit of Measurement: 
                        <select onChange={e=>setUnitOfMeasurement(e.target.value)}>
                            <option value='pieces'>pieces</option>
                            <option value='grams'>grams</option>
                            <option value='kilograms'>kilograms</option>
                        </select>
                    </label>
                    <br></br>
                    <label>Quantity: 
                        <input required type='number' onChange={e => setQuantity(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Price without Vat: 
                        <input required type='number' onChange={e => setPriceWithoutVat(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Status: 
                        <input required type='text' onChange={e => setStatus(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Storage location: 
                        <input type='text' onChange={e => setStorageLocation(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Contact person: 
                        <textarea maxLength={50} placeholder='Maximum 50 characters' onChange={e => setContactPerson(e.target.value)}></textarea>
                    </label>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}