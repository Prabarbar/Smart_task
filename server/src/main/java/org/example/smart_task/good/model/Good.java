package org.example.smart_task.good.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "goods")
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
    private String itemGroup;
    private String unitOfMeasurement;
    private int quantity;
    private int priceWithoutVat;
    private String status;
    private String storageLocation;
    private String contactPerson;

    public Good(String itemGroup, String unitOfMeasurement, int quantity, int priceWithoutVat,
                String status, String storageLocation, String contactPerson) {
        this.itemGroup = itemGroup;
        this.unitOfMeasurement = unitOfMeasurement;
        this.quantity = quantity;
        this.priceWithoutVat = priceWithoutVat;
        this.status = status;
        this.storageLocation = storageLocation;
        this.contactPerson = contactPerson;
    }
}
