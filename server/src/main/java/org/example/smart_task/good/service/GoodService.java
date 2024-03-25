package org.example.smart_task.good.service;

import org.example.smart_task.good.model.Good;

import java.util.List;
import java.util.Map;

public interface GoodService {
    void addGood(Good good);

    List<Good> getGoods();

    void deleteGood(int id);

    void updateGoodById(int id, Good updatedGood);

    Good getGoodById(int id);
    List<Good> getGoodsByItemGroupAndUnitOfMeasure(String itemGroup, String unitOfMeasurement);

}
