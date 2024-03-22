package org.example.smart_task.requests.service;

import org.example.smart_task.requests.model.Request;
import org.example.smart_task.requests.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public void deleteRequest(int id) {
        requestRepository.deleteById(id);
    }
}
