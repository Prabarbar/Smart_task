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
    private int priceWithoutVat;
    private String status;
    private String storageLocation;
    private String contactPerson;
    private String photo;

    public Good(String itemGroup, String unitOfMeasurement, int priceWithoutVat,
                String status, String storageLocation, String contactPerson, String photo) {
        this.itemGroup = itemGroup;
        this.unitOfMeasurement = unitOfMeasurement;
        this.priceWithoutVat = priceWithoutVat;
        this.status = status;
        this.storageLocation = storageLocation;
        this.contactPerson = contactPerson;
        this.photo = photo;
    }
}
