package com.gmail.speedwagon.mapper;

import com.gmail.speedwagon.domain.Review;
import com.gmail.speedwagon.domain.User;
import com.gmail.speedwagon.dto.HeaderResponse;
import com.gmail.speedwagon.dto.product.FullProductResponse;
import com.gmail.speedwagon.dto.review.ReviewRequest;
import com.gmail.speedwagon.dto.review.ReviewResponse;
import com.gmail.speedwagon.dto.user.BaseUserResponse;
import com.gmail.speedwagon.dto.user.UpdateUserRequest;
import com.gmail.speedwagon.dto.user.UserResponse;
import com.gmail.speedwagon.exception.InputFieldException;
import com.gmail.speedwagon.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final CommonMapper commonMapper;
    private final UserService userService;

    public UserResponse getUserById(Long userId) {
        return commonMapper.convertToResponse(userService.getUserById(userId), UserResponse.class);
    }

    public UserResponse getUserInfo(String email) {
        return commonMapper.convertToResponse(userService.getUserInfo(email), UserResponse.class);
    }

    public List<FullProductResponse> getCart(List<Long> productsIds) {
        return commonMapper.convertToResponseList(userService.getCart(productsIds), FullProductResponse.class);
    }

    public HeaderResponse<BaseUserResponse> getAllUsers(Pageable pageable) {
        Page<User> users = userService.getAllUsers(pageable);
        return commonMapper.getHeaderResponse(users.getContent(), users.getTotalPages(), users.getTotalElements(), BaseUserResponse.class);
    }

    public UserResponse updateUserInfo(String email, UpdateUserRequest userRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(userRequest, User.class);
        return commonMapper.convertToResponse(userService.updateUserInfo(email, user), UserResponse.class);
    }

    public ReviewResponse addReviewToProduct(ReviewRequest reviewRequest, Long productId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(userService.addReviewToProduct(review, productId), ReviewResponse.class);
    }
}
