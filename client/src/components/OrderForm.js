import {useState} from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function OrderForm(){

const location = useLocation()

const [itemName, setItemName] = useState('')
const [quantity, setQuantity] = useState(location.state.quantity)
const [comment, setComment] = useState('')
const [info, setInfo] = useState(null)
   

const navigate = useNavigate()


async function handleSubmit(e){
    e.preventDefault()
    try{
      const postRes = await fetch('http://localhost:8080/request/add-request',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeName:'Bartek', itemId:location.state.itemId, unitOfMeasurement:location.state.unitOfMeasurement, quantity:quantity,
                            priceWithoutVat:location.state.priceWithoutVat, comment:comment})
      })
      const good = await postRes.json()
      console.log(good)
    }
    catch(err){
      console.error(err)
    }
    setInfo("Request created")
    setTimeout(() => {
        navigate("/goods-table-employee")
      }, "1000");
  }


    return(
        <>
            <h2>Order Form</h2>
            <div style={{textAlign:'left'}}>
                <form onSubmit ={handleSubmit}>
                    <label>Item Name: 
                        <input type='text' onChange={e => setItemName(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Unit of Measurement: 
                        <input type='text' value= {location.state.unitOfMeasurement}></input>
                    </label>
                    <br></br>
                    <label>Quantity: 
                        <input type='text' defaultValue= {location.state.quantity} onChange={e => setQuantity(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Price without VAT: 
                        <input type='text' value= {location.state.priceWithoutVat}></input>
                    </label>
                    <br></br>
                    <label>Comment: 
                        <input type='text' onChange={e => setComment(e.target.value)}></input>
                    </label>
                    <br></br>
                    <button type='submit'>Submit</button>
                    <button onClick={()=>navigate('/goods-table-employee')}>Cancel</button>
                    {info && <h2 style={{color: 'green'}}>{info}</h2>}
                </form>
            </div>
        </>
    )
}