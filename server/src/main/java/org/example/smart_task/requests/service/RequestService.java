package org.example.smart_task.requests.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.requests.model.Request;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RequestService {
    void addRequest(Request request);

    List<Request> getRequests();
    Request getRequestById(int id);

    void deleteRequest(int id);
    void updateRequestById(int id, Request updatedRequest);
    List<Request> getRequestByEmployeeName(String employeeName);
    void addGoodToRequest(int requestId, int goodId, int requestedQuantity);
    ResponseEntity<?> getLastRequest();
}
