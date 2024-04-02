package org.example.smart_task.user.service;

import org.example.smart_task.requests.model.Request;
import org.example.smart_task.user.model.UserEntity;
import org.example.smart_task.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUserById(int userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public void insertUser(UserEntity user) {
        userRepository.save(user);
    }

    @Override
    public void updateUserById(int userId, String password) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            UserEntity user = optionalUser.get();
            user.setPassword(password);
            userRepository.save(user);
        }
    }

    @Override
    public UserEntity getUserByUsername(String username) {
        Optional<UserEntity> optionalRequest = userRepository.findByUsername(username);
        return optionalRequest.orElse(null);
    }
}
