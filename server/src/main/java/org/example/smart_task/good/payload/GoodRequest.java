package org.example.smart_task.good.payload;

public record GoodRequest(
        String itemGroup,
        String unitOfMeasurement,
        int priceWithoutVat,
        String status,
        String storageLocation,
        String contactPerson,
        String photo
) {
}
