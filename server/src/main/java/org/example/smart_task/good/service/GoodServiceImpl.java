package org.example.smart_task.good.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.repository.GoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodServiceImpl implements GoodService{
    private final GoodRepository goodRepository;
    @Autowired
    public GoodServiceImpl(GoodRepository goodRepository){
        this.goodRepository = goodRepository;
}

    @Override
    public void insertGood(Good good) {
        goodRepository.save(good);
    }
}
