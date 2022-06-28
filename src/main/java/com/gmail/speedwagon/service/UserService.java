package com.gmail.speedwagon.service;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.domain.Review;
import com.gmail.speedwagon.domain.User;
import graphql.schema.DataFetcher;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    User getUserById(Long userId);

    User getUserInfo(String email);
    
    Page<User> getAllUsers(Pageable pageable);

    List<Product> getCart(List<Long> productIds);

    User updateUserInfo(String email, User user);

    Review addReviewToProduct(Review review, Long productId);

    DataFetcher<List<User>> getAllUsersByQuery();

    DataFetcher<User> getUserByQuery();
}
