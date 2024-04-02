import { useNavigate } from 'react-router-dom';

export default function GoodsListEmployee({itemId, itemGroup, unitOfMeasurement, quantity, priceWithoutVat, status, storageLocation, contactPerson, request, user, isButtonDisabled}){

  const navigate = useNavigate()

  return(
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
        <td><button disabled={isButtonDisabled} onClick={()=>{navigate('/order-form', {state:{itemId:itemId, itemGroup:itemGroup, unitOfMeasurement:unitOfMeasurement, quantity:quantity, 
        priceWithoutVat:priceWithoutVat, status:status, storageLocation:storageLocation, contactPerson:contactPerson, request:request, user:user.userName}})}}>Order</button></td>
      </tr>
    </>
  )
}