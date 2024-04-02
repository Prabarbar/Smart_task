package org.example.smart_task.user.service;

import org.example.smart_task.user.model.UserEntity;

import java.util.List;

public interface UserService {
    List<UserEntity> getAllUsers();

    void deleteUserById(int userId);

    void insertUser(UserEntity user);

    void updateUserById(int userId, String password);

    UserEntity getUserByUsername(String username);
}
