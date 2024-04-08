package org.example.smart_task.requestedGood.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.requestedGood.model.RequestedGood;

import java.util.List;

public interface RequestedGoodService {

    void addRequestedGood(RequestedGood requestedGood);

    List<RequestedGood> getRequestedGoods();
}
