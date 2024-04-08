import {useState} from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function OrderForm(){

    const location = useLocation()

    const [requestedQuantity, setRequestedQuantity] = useState(location.state.quantity)
    const [comment, setComment] = useState('')
    const [info, setInfo] = useState(null)
    
    const navigate = useNavigate()


    async function handleSubmit(e){
        e.preventDefault()
        try{
            await fetch(`http://localhost:8080/request/add-requested-good-to-request?requestId=${location.state.request}&goodId=${location.state.itemId}&requestedQuantity=${requestedQuantity}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
            })
        }
        catch(err){
            console.error(err)
        }
        setInfo("Request updated")
        setTimeout(() => {
            navigate("/goods-table-employee")
        }, "1000");
    }


    return(
        <>
            <h2>Order Form</h2>
            <div style={{textAlign:'left'}}>
                <form onSubmit ={handleSubmit}>
                    <label>Employee Name: 
                        <input required type='text' readOnly value={location.state.user}></input>
                    </label>
                    <br></br>
                    <label>Unit of Measurement: 
                        <input required type='text' readOnly value= {location.state.unitOfMeasurement}></input>
                    </label>
                    <br></br>
                    <label>Quantity: 
                        <input required type='number' defaultValue= {location.state.quantity} onChange={e => setRequestedQuantity(e.target.value)}></input>
                    </label>
                    <br></br>
                    <label>Price without VAT: 
                        <input required type='number' readOnly value= {location.state.priceWithoutVat}></input>
                    </label>
                    <br></br>
                    <label>Comment: 
                        <textarea maxLength='100' placeholder='Maximum 100 characters' onChange={e => setComment(e.target.value)}></textarea>
                    </label>
                    <br></br>
                    <button type='submit'>Add to Request</button>
                    <button onClick={()=>navigate('/goods-table-employee')}>Cancel</button>
                    {info && <h2 style={{color: 'green'}}>{info}</h2>}
                </form>
            </div>
        </>
    )
}