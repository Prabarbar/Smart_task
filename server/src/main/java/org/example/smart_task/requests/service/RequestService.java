package org.example.smart_task.requests.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.requests.model.Request;

import java.util.List;

public interface RequestService {
    void addRequest(Request request);

    List<Request> getRequests();
    Request getRequestById(int id);

    void deleteRequest(int id);
    void updateRequestById(int id, Request updatedRequest);
    List<Request> getRequestByEmployeeNameAndUnitOfMeasure(String employeeName, String unitOfMeasurement);
}
