package org.example.smart_task.requestedGood.service;

import org.example.smart_task.requestedGood.model.RequestedGood;
import org.example.smart_task.requestedGood.repository.RequestedGoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestedGoodServiceImpl implements RequestedGoodService{
    private final RequestedGoodRepository requestedGoodRepository;
    @Autowired
    public RequestedGoodServiceImpl (RequestedGoodRepository requestedGoodRepository){
        this.requestedGoodRepository = requestedGoodRepository;
    }

    @Override
    public void addRequestedGood(RequestedGood requestedGood) {
        requestedGoodRepository.save(requestedGood);
    }

    @Override
    public List<RequestedGood> getRequestedGoods() {
        return requestedGoodRepository.findAll();
    }
}
