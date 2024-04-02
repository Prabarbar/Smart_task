export default function OpenedRequestList({itemId, itemGroup, unitOfMeasurement, quantity, requestedQuantity, priceWithoutVat, status, storageLocation, contactPerson}){

    return(
      <tr>
        <td>{itemId}</td>
        <td>{itemGroup}</td>
        <td>{unitOfMeasurement}</td>
        <td>{requestedQuantity}</td>
        <td>{priceWithoutVat}</td>
        <td>{status}</td>
        <td>{storageLocation}</td>
        <td>{contactPerson}</td>
      </tr>
    )
}