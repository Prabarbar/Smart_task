package org.example.smart_task.requestedGood.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "requestedGoods")
public class RequestedGood {
    @Id
    private String itemId;
    private String itemGroup;
    private String unitOfMeasurement;
    private int requestedQuantity;
    private int priceWithoutVat;
    private String status;
    private String storageLocation;
    private String contactPerson;

    public RequestedGood(String itemId, String itemGroup, String unitOfMeasurement, int requestedQuantity, int priceWithoutVat,
                String status, String storageLocation, String contactPerson) {
        this.itemId = itemId;
        this.itemGroup = itemGroup;
        this.unitOfMeasurement = unitOfMeasurement;
        this.requestedQuantity = requestedQuantity;
        this.priceWithoutVat = priceWithoutVat;
        this.status = status;
        this.storageLocation = storageLocation;
        this.contactPerson = contactPerson;
    }
}
