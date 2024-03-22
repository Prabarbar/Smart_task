package org.example.smart_task.good.payload;

public record AddGoodForm(
        String itemGroup,
        String unitOfMeasurement,
        int quantity,
        int priceWithoutVat,
        String status,
        String storageLocation,
        String contactPerson
) {
}
