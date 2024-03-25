package org.example.smart_task.controller;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.payload.AddGoodForm;
import org.example.smart_task.good.service.GoodServiceImpl;
import org.example.smart_task.requests.model.Request;
import org.example.smart_task.requests.payload.AddRequestForm;
import org.example.smart_task.requests.service.RequestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Controller {
    private final GoodServiceImpl goodServiceImpl;
    private final RequestServiceImpl requestServiceImpl;
    @Autowired
    public Controller(GoodServiceImpl goodServiceImpl, RequestServiceImpl requestServiceImpl){
        this.goodServiceImpl = goodServiceImpl;
        this.requestServiceImpl = requestServiceImpl;
    }

    @GetMapping("/good/get-goods")
    public List<Good> getGoods(){
        return goodServiceImpl.getGoods();
    }

    @PostMapping("/good/add-good")
    public void addGood(@RequestBody AddGoodForm form){
        goodServiceImpl.addGood(new Good(
                form.itemGroup(),
                form.unitOfMeasurement(),
                form.quantity(),
                form.priceWithoutVat(),
                form.status(),
                form.storageLocation(),
                form.contactPerson()));
    }

    @DeleteMapping("good/delete-good")
    public void deleteGood(@RequestParam int id){
        goodServiceImpl.deleteGood(id);
    }
    @PatchMapping("good/update-good")
    public void updateGood(@RequestParam int id, @RequestBody Good updatedGood ){
        goodServiceImpl.updateGoodById(id, updatedGood);
    }

    @GetMapping("good/get-good")
    public Good getGoodById(@RequestParam int id){
        return goodServiceImpl.getGoodById(id);
    }

    @GetMapping("request/get-requests")
    public List<Request> getRequests(){
        return requestServiceImpl.getRequests();
    }

    @GetMapping("request/get-request")
    public Request getRequestById(@RequestParam int id){
        return requestServiceImpl.getRequestById(id);
    }

    @PostMapping("request/add-request")
    public void addRequest(@RequestBody AddRequestForm form){
        requestServiceImpl.addRequest(new Request(
                form.employeeName(),
                form.itemId(),
                form.unitOfMeasurement(),
                form.quantity(),
                form.priceWithoutVat(),
                form.comment(),
                form.status()));
    }

    @DeleteMapping("request/delete-request")
    public void deleteRequest(@RequestParam int id){
        requestServiceImpl.deleteRequest(id);
    }

    @PatchMapping("request/update-request")
    public void updateRequest(@RequestParam int id, @RequestBody Request updatedRequest){
        requestServiceImpl.updateRequestById(id, updatedRequest);
    }

    @GetMapping("good/get-good-by")
    public List<Good> getGoodByParams(@RequestParam String itemGroup, String unitOfMeasurement){
        return goodServiceImpl.getGoodsByItemGroupAndUnitOfMeasure(itemGroup, unitOfMeasurement);
    }

    @GetMapping("request/get-request-by")
    public List<Request> getRequestByParams(@RequestParam String employeeName, String unitOfMeasurement){
        return requestServiceImpl.getRequestByEmployeeNameAndUnitOfMeasure(employeeName, unitOfMeasurement);
    }
}
