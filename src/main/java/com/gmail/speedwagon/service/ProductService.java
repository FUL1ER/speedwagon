package com.gmail.speedwagon.service;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.domain.Review;
import com.gmail.speedwagon.enums.SearchProduct;
import com.gmail.speedwagon.repository.projection.ProductProjection;

import graphql.schema.DataFetcher;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product getProductById(Long productId);

    Page<ProductProjection> getAllProducts(Pageable pageable);

    List<ProductProjection> getProductsByIds(List<Long> productsId);

    Page<ProductProjection> findProductsByFilterParams(List<String> products, List<String> genders, List<Integer> prices,
                                                       boolean sortByPrice, Pageable pageable);

    List<Product> findByProducer(String producer);

    List<Product> findByProductGender(String productGender);
    
    Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable);

    Product saveProduct(Product product, MultipartFile file);

    String deleteProduct(Long productId);

    List<Review> getReviewsByProductId(Long productId);

    DataFetcher<Product> getProductByQuery();

    DataFetcher<List<ProductProjection>> getAllProductsByQuery();

    DataFetcher<List<Product>> getAllProductsByIdsQuery();
}
