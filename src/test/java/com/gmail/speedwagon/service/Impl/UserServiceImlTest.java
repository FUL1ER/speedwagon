package com.gmail.speedwagon.service.Impl;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.domain.Review;
import com.gmail.speedwagon.enums.Role;
import com.gmail.speedwagon.domain.User;
import com.gmail.speedwagon.repository.ProductRepository;
import com.gmail.speedwagon.repository.ReviewRepository;
import com.gmail.speedwagon.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static com.gmail.speedwagon.util.TestConstants.FIRST_NAME;
import static com.gmail.speedwagon.util.TestConstants.USER_EMAIL;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserServiceImlTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private ReviewRepository reviewRepository;

    @Test
    public void findUserById() {
        User user = new User();
        user.setId(122L);

        when(userRepository.findById(122L)).thenReturn(java.util.Optional.of(user));
        userService.getUserById(122L);
        assertEquals(122L, user.getId());
        verify(userRepository, times(1)).findById(122L);
    }

    @Test
    public void getUserInfo() {
        User user = new User();
        user.setEmail(USER_EMAIL);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(Optional.of(user));
        userService.getUserInfo(USER_EMAIL);
        assertEquals(USER_EMAIL, user.getEmail());
        verify(userRepository, times(1)).findByEmail(USER_EMAIL);
    }

    @Test
    public void findAllUsers() {
        List<User> usersList = new ArrayList<>();
        usersList.add(new User());
        usersList.add(new User());
        userService.getAllUsers();

        when(userRepository.findAllByOrderByIdAsc()).thenReturn(usersList);
        assertEquals(2, usersList.size());
        verify(userRepository, times(1)).findAllByOrderByIdAsc();
    }

    @Test
    public void getCart() {
        List<Long> perfumeIds = new ArrayList<>(Arrays.asList(2L, 4L));
        Product firstProduct = new Product();
        firstProduct.setId(2L);
        Product secondProduct = new Product();
        secondProduct.setId(4L);
        List<Product> productList = new ArrayList<>(Arrays.asList(firstProduct, secondProduct));
        userService.getCart(perfumeIds);

        when(productRepository.findByIdIn(perfumeIds)).thenReturn(productList);
        assertEquals(2, productList.size());
        assertEquals(2, perfumeIds.size());
        assertNotNull(productList);
        verify(productRepository, times(1)).findByIdIn(perfumeIds);
    }

    @Test
    public void loadUserByUsername() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setActive(true);
        user.setFirstName(FIRST_NAME);
        user.setRoles(Collections.singleton(Role.USER));

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(Optional.of(user));
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        assertTrue(user.isActive());
    }

    @Test
    public void updateUserInfo() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setFirstName(FIRST_NAME);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(Optional.of(user));
        userService.updateUserInfo(USER_EMAIL, user);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
    }

    @Test
    public void addReviewToPerfume() {
        List<Review> reviewList = new ArrayList<>();
        Review review = new Review();
        review.setRating(5);
        reviewList.add(review);
        Product product = new Product();
        product.setId(123L);
        product.setReviews(reviewList);

        when(productRepository.findById(123L)).thenReturn(Optional.of(product));
        when(reviewRepository.save(review)).thenReturn(review);
        userService.addReviewToProduct(review, 123L);
        assertEquals(123L, product.getId());
        assertNotNull(product.getReviews());
        verify(productRepository, times(1)).findById(123L);
        verify(reviewRepository, times(1)).save(review);
    }
}
