package org.example.smart_task.requests.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.requests.model.Request;

import java.util.List;

public interface RequestService {
    void addRequest(Request request);

    List<Request> getRequests();

    void deleteRequest(int id);
}
