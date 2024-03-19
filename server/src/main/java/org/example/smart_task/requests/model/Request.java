package org.example.smart_task.requests.model;

import jakarta.persistence.*;
import lombok.Data;
import org.example.smart_task.good.model.Good;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;
    private String employeeName;
    private String comment;
    private String status;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name= "requests_goods", joinColumns = @JoinColumn(name = "requests_request_id"), inverseJoinColumns = @JoinColumn(name = "goods_good_id"))
    private List<Good> goods = new ArrayList<>();

}