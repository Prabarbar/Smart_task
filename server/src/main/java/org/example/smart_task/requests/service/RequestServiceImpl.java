package org.example.smart_task.requests.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.repository.GoodRepository;
import org.example.smart_task.requests.model.Request;
import org.example.smart_task.requests.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Service
public class RequestServiceImpl implements RequestService{
    private final RequestRepository requestRepository;
    private final GoodRepository goodRepository;
    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository, GoodRepository goodRepository){
        this.requestRepository = requestRepository;
        this.goodRepository = goodRepository;
    }
    @Override
    public void addRequest(Request request) {
        requestRepository.save((request));
    }

    @Override
    public List<Request> getRequests() {
        return requestRepository.findAll();
    }

    @Override
    public Request getRequestById(int id) {
        Optional<Request> optionalRequest = requestRepository.findById(id);
        return optionalRequest.orElse(null);
    }

    @Override
    public void updateRequestById(int id, Request updatedRequest) {
        Optional<Request> requestOptional = requestRepository.findById(id);
        if(requestOptional.isPresent()){
            Request existingRequest = requestOptional.get();
            existingRequest.setEmployeeName(updatedRequest.getEmployeeName());
            existingRequest.setComment(updatedRequest.getComment());
            existingRequest.setStatus(updatedRequest.getStatus());
            requestRepository.save(existingRequest);
        }
    }

    @Override
    public void deleteRequest(int id) {
        requestRepository.deleteById(id);
    }

    @Override
    public List<Request> getRequestByEmployeeName(String employeeName) {
        return requestRepository.findRequestByEmployeeName(employeeName);
    }

    @Override
    public void addGoodToRequest(int requestId, int goodId, int requestedQuantity) {
        Optional<Request> optionalRequest = requestRepository.findById(requestId);
        Optional<Good> optionalGood  = goodRepository.findById(goodId);
        if (optionalRequest.isPresent() && optionalGood.isPresent()){
            Request request = optionalRequest.get();
            Good good = optionalGood.get();
            good.setRequestedQuantity(requestedQuantity);
            List<Good> goods = request.getGoods();
            goods.add(good);
            request.setGoods(goods);
            requestRepository.save(request);
        }
    }

    @Override
    public ResponseEntity<Request> getLastRequest() {
        List<Request> requests = getRequests();
        if (requests.isEmpty()|| !requests.getLast().getStatus().equals("New")){
            return new ResponseEntity<Request>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(requests.getLast());
    }
}
