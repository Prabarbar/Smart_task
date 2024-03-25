package org.example.smart_task.requests.service;

import org.example.smart_task.requests.model.Request;
import org.example.smart_task.requests.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestServiceImpl implements RequestService{
    private final RequestRepository requestRepository;
    @Autowired
    public RequestServiceImpl(RequestRepository requestRepository){
        this.requestRepository = requestRepository;
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
            existingRequest.setItemId(updatedRequest.getItemId());
            existingRequest.setUnitOfMeasurement(updatedRequest.getUnitOfMeasurement());
            existingRequest.setQuantity(updatedRequest.getQuantity());
            existingRequest.setPriceWithoutVat(updatedRequest.getPriceWithoutVat());
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
    public List<Request> getRequestByEmployeeNameAndUnitOfMeasure(String employeeName, String unitOfMeasurement) {
        return requestRepository.findRequestByEmployeeNameAndUnitOfMeasurement(employeeName, unitOfMeasurement);
    }
}
