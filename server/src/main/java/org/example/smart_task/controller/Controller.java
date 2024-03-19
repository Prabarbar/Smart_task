package org.example.smart_task.controller;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.payload.GoodRequest;
import org.example.smart_task.good.service.GoodServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    private final GoodServiceImpl goodServiceImpl;
    @Autowired
    public Controller(GoodServiceImpl goodServiceImpl){
        this.goodServiceImpl = goodServiceImpl;
    }

    @PostMapping("/good/add-good")
    public void addGood(@RequestBody GoodRequest request){
        goodServiceImpl.insertGood(new Good(
                request.itemGroup(),
                request.unitOfMeasurement(),
                request.priceWithoutVat(),
                request.status(),
                request.storageLocation(),
                request.contactPerson(),
                request.photo()));
    }
}
