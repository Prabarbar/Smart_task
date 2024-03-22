package org.example.smart_task.requests.payload;

public record AddRequestForm(
        String employeeName,
        int itemId,
        String unitOfMeasurement,
        int quantity,
        int priceWithoutVat,
        String comment
) {
}
