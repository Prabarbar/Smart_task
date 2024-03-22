package org.example.smart_task.good.service;

import org.example.smart_task.good.model.Good;
import org.example.smart_task.good.repository.GoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GoodServiceImpl implements GoodService{
    private final GoodRepository goodRepository;
    @Autowired
    public GoodServiceImpl(GoodRepository goodRepository){
        this.goodRepository = goodRepository;
}

    @Override
    public void addGood(Good good) {
        goodRepository.save(good);
    }

    @Override
    public List<Good> getGoods() {
        return goodRepository.findAll();
    }

    @Override
    public void deleteGood(int id) {
        goodRepository.deleteById(id);
    }

    @Override
    public void updateGoodById(int id, Good updatedGood) {
        Optional<Good> goodOptional = goodRepository.findById(id);
        if(goodOptional.isPresent()){
            Good existingGood = goodOptional.get();
            if (updatedGood.getItemGroup() != null && !updatedGood.getItemGroup().isEmpty()) {
                existingGood.setItemGroup(updatedGood.getItemGroup());
            }
            if (updatedGood.getUnitOfMeasurement() != null && !updatedGood.getUnitOfMeasurement().isEmpty()) {
                existingGood.setUnitOfMeasurement(updatedGood.getUnitOfMeasurement());
            }


            existingGood.setQuantity(updatedGood.getQuantity());


            if (updatedGood.getPriceWithoutVat() != 0) {
                existingGood.setPriceWithoutVat(updatedGood.getPriceWithoutVat());
            }
            if (updatedGood.getStatus() != null && !updatedGood.getStatus().isEmpty()) {
                existingGood.setStatus(updatedGood.getStatus());
            }
            if (updatedGood.getStorageLocation() != null && !updatedGood.getStorageLocation().isEmpty()) {
                existingGood.setStorageLocation(updatedGood.getStorageLocation());
            }
            if (updatedGood.getContactPerson() != null && !updatedGood.getContactPerson().isEmpty()) {
                existingGood.setContactPerson(updatedGood.getContactPerson());
            }

            goodRepository.save(existingGood);
        }
    }

    @Override
    public Good getGoodById(int id) {
        Optional<Good> goodOptional = goodRepository.findById(id);
        return goodOptional.orElse(null);
    }
}
