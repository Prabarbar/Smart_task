package org.example.smart_task.requestedGood.repository;

import org.example.smart_task.requestedGood.model.RequestedGood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestedGoodRepository extends JpaRepository <RequestedGood, Integer> {
}
