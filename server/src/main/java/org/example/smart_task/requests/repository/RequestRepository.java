package org.example.smart_task.requests.repository;

import org.example.smart_task.requests.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer>{
    @Query("SELECT u FROM Request u WHERE (:employeeName = '' OR u.employeeName = :employeeName)" +
            "AND (:unitOfMeasurement = '' OR u.unitOfMeasurement = :unitOfMeasurement)")
    List<Request> findRequestByEmployeeNameAndUnitOfMeasurement(String employeeName, String unitOfMeasurement);

    /**
     Dear Hiring Manager,
     Here I use default Java Persistence API methods. I would like to list them and give you an SQL equivalent:

     findAll()
     SQL Equivalent: SELECT * FROM table_name;

     findById(int id):
     SQL Equivalent: SELECT * FROM table_name WHERE primary_key_column = id;

     existsById(int id):
     SQL Equivalent: SELECT COUNT(*) FROM table_name WHERE primary_key_column = id;

     count()
     SQL Equivalent: SELECT COUNT(*) FROM table_name;

     save(S entity)
     SQL Equivalent:
     If the entity is new:
     INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
     If the entity already exists:
     UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE primary_key_column = entity_id;

     saveAll(Iterable<S> entities)
     If the entity is new:
     INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
     If the entity already exists:
     UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE primary_key_column = entity1_id;

     deleteById(int id)
     SQL Equivalent: DELETE FROM table_name WHERE primary_key_column = id;

     delete(T entity)
     SQL Equivalent: DELETE FROM table_name WHERE primary_key_column = entity_id;

     deleteAll()
     SQL Equivalent:
     DELETE FROM table_name;
     */
}
