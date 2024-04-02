package org.example.smart_task.controller;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.payload.AddGoodForm;
import org.example.smart_task.good.service.GoodServiceImpl;
import org.example.smart_task.requests.model.Request;
import org.example.smart_task.requests.payload.AddRequestForm;
import org.example.smart_task.requests.service.RequestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
                form.contactPerson(),
                form.requestedQuantity()));
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

//    @PreAuthorize("hasRole('coordinator')")
    @GetMapping("request/get-request")
    public Request getRequestById(@RequestParam int id){
        return requestServiceImpl.getRequestById(id);
    }

    @PostMapping("request/add-request")
    public ResponseEntity<Request> addRequest(@RequestBody AddRequestForm form){
        requestServiceImpl.addRequest(new Request(
                form.employeeName(),
                form.comment(),
                form.status()));
        return requestServiceImpl.getLastRequest();
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
    public List<Request> getRequestByParams(@RequestParam String employeeName){
        return requestServiceImpl.getRequestByEmployeeName(employeeName);
    }

    @PutMapping("/request/add-good-to-request")
    public void addGoodToRequest(@RequestParam int requestId, @RequestParam int goodId, @RequestParam int requestedQuantity){
        requestServiceImpl.addGoodToRequest(requestId, goodId, requestedQuantity);
    }

    @GetMapping("/request/get-last-request")
    public ResponseEntity<Request> getLastRequest(){
        return requestServiceImpl.getLastRequest();
    }

    @GetMapping("/request/get-requested-goods")
    public List<Good> getRequestedGoods(@RequestParam int requestId){
        return requestServiceImpl.getRequestById(requestId).getGoods();
    }
}
