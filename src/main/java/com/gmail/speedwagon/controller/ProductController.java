package com.gmail.speedwagon.controller;

import java.util.List;

import com.gmail.speedwagon.dto.product.FullProductResponse;
import com.gmail.speedwagon.dto.product.ProductResponse;
import com.gmail.speedwagon.dto.product.ProductSearchRequest;
import com.gmail.speedwagon.dto.product.SearchTypeRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gmail.speedwagon.dto.GraphQLRequest;
import com.gmail.speedwagon.dto.HeaderResponse;
import com.gmail.speedwagon.dto.review.ReviewResponse;
import com.gmail.speedwagon.mapper.ProductMapper;
import com.gmail.speedwagon.service.graphql.GraphQLProvider;

import graphql.ExecutionResult;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductMapper productMapper;
    private final GraphQLProvider graphQLProvider;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.getAllProducts(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<FullProductResponse> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.getProductById(productId));
    }

    @GetMapping("/reviews/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.getReviewsByProductId(productId));
    }

    @PostMapping("/ids")
    public ResponseEntity<List<ProductResponse>> getProductsByIds(@RequestBody List<Long> productsIds) {
        return ResponseEntity.ok(productMapper.getProductsByIds(productsIds));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductResponse>> findProductsByFilterParams(@RequestBody ProductSearchRequest filter,
                                                                            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findProductsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping("/search/gender")
    public ResponseEntity<List<ProductResponse>> findByProductGender(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProductGender(filter.getProductGender()));
    }

    @PostMapping("/search/producer")
    public ResponseEntity<List<ProductResponse>> findByProducer(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProducer(filter.getProducer()));
    }

    @PostMapping("/search/text")
    public ResponseEntity<List<ProductResponse>> findByInputText(@RequestBody SearchTypeRequest searchType,
                                                                 @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findByInputText(searchType.getSearchType(), searchType.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping("/graphql/ids")
    public ResponseEntity<ExecutionResult> getProductsByIdsQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping("/graphql/products")
    public ResponseEntity<ExecutionResult> getAllProductsByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping("/graphql/product")
    public ResponseEntity<ExecutionResult> getProductByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }
}
