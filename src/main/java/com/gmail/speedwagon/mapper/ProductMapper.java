package com.gmail.speedwagon.mapper;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.dto.HeaderResponse;
import com.gmail.speedwagon.dto.product.FullProductResponse;
import com.gmail.speedwagon.dto.product.ProductRequest;
import com.gmail.speedwagon.dto.product.ProductResponse;
import com.gmail.speedwagon.dto.product.ProductSearchRequest;
import com.gmail.speedwagon.dto.review.ReviewResponse;
import com.gmail.speedwagon.enums.SearchProduct;
import com.gmail.speedwagon.exception.InputFieldException;
import com.gmail.speedwagon.repository.projection.ProductProjection;
import com.gmail.speedwagon.service.ProductService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CommonMapper commonMapper;
    private final ProductService productService;

    public FullProductResponse getProductById(Long productId) {
        return commonMapper.convertToResponse(productService.getProductById(productId), FullProductResponse.class);
    }

    public List<ReviewResponse> getReviewsByProductId(Long productId) {
        return commonMapper.convertToResponseList(productService.getReviewsByProductId(productId), ReviewResponse.class);
    }

    public List<ProductResponse> getProductsByIds(List<Long> productsId) {
        return commonMapper.convertToResponseList(productService.getProductsByIds(productsId), ProductResponse.class);
    }

    public HeaderResponse<ProductResponse> getAllProducts(Pageable pageable) {
        Page<ProductProjection> products = productService.getAllProducts(pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public HeaderResponse<ProductResponse> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable) {
        Page<ProductProjection> products = productService.findProductsByFilterParams(filter.getProducts(), filter.getGenders(),
                filter.getPrices(), filter.getSortByPrice(), pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public List<ProductResponse> findByProducer(String producer) {
        return commonMapper.convertToResponseList(productService.findByProducer(producer), ProductResponse.class);
    }

    public List<ProductResponse> findByProductGender(String productGender) {
        return commonMapper.convertToResponseList(productService.findByProductGender(productGender), ProductResponse.class);
    }
    
    public HeaderResponse<ProductResponse> findByInputText(SearchProduct searchType, String text, Pageable pageable) {
        Page<ProductProjection> products = productService.findByInputText(searchType, text, pageable);
        return commonMapper.getHeaderResponse(products.getContent(), products.getTotalPages(), products.getTotalElements(), ProductResponse.class);
    }

    public FullProductResponse saveProduct(ProductRequest productRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Product product = commonMapper.convertToEntity(productRequest, Product.class);
        return commonMapper.convertToResponse(productService.saveProduct(product, file), FullProductResponse.class);
    }

    public String deleteProduct(Long productId) {
        return productService.deleteProduct(productId);
    }
}
