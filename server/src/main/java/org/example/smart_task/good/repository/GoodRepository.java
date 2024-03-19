package org.example.smart_task.good.repository;

import org.example.smart_task.good.model.Good;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodRepository extends JpaRepository<Good, Integer> {
}
