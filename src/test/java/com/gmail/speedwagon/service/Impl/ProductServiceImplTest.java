package com.gmail.speedwagon.service.Impl;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.repository.ProductRepository;
import com.gmail.speedwagon.repository.projection.ProductProjection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.gmail.speedwagon.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductServiceImplTest {

    @Autowired
    private ProductServiceImpl perfumeService;

    @Autowired
    private SpelAwareProxyProjectionFactory factory;

    @MockBean
    private ProductRepository productRepository;

    @Test
    public void findPerfumeById() {
        Product product = new Product();
        product.setId(123L);

        when(productRepository.findById(123L)).thenReturn(java.util.Optional.of(product));
        perfumeService.getProductById(123L);
        assertEquals(123L, product.getId());
        assertNotEquals(1L, product.getId());
        verify(productRepository, times(1)).findById(123L);
    }

    @Test
    public void findAllPerfumes() {
        Pageable pageable = PageRequest.of(0, 20);
        List<ProductProjection> productProjectionList = new ArrayList<>();
        productProjectionList.add(factory.createProjection(ProductProjection.class));
        productProjectionList.add(factory.createProjection(ProductProjection.class));
        Page<ProductProjection> perfumeList = new PageImpl<>(productProjectionList);

        when(productRepository.findAllByOrderByIdAsc(pageable)).thenReturn(perfumeList);
        perfumeService.getAllProducts(pageable);
        assertEquals(2, productProjectionList.size());
        verify(productRepository, times(1)).findAllByOrderByIdAsc(pageable);
    }

    @Test
    public void filter() {
        Pageable pageable = PageRequest.of(0, 20);
        
        ProductProjection perfumeChanel = factory.createProjection(ProductProjection.class);
        perfumeChanel.setProducer(PERFUMER_CHANEL);
        perfumeChanel.setProductGender(PERFUME_GENDER);
        perfumeChanel.setPrice(101);
        ProductProjection perfumeCreed = factory.createProjection(ProductProjection.class);
        perfumeCreed.setProducer(PERFUMER_CREED);
        perfumeCreed.setProductGender(PERFUME_GENDER);
        perfumeCreed.setPrice(102);

        List<ProductProjection> productProjectionList = new ArrayList<>();
        productProjectionList.add(perfumeChanel);
        productProjectionList.add(perfumeCreed);
        Page<ProductProjection> perfumeList = new PageImpl<>(productProjectionList);

        List<String> perfumers = new ArrayList<>();
        perfumers.add(PERFUMER_CHANEL);
        perfumers.add(PERFUMER_CREED);

        List<String> genders = new ArrayList<>();
        genders.add(PERFUME_GENDER);

        when(productRepository.findProductsByFilterParams(perfumers, new ArrayList<>(), 1, 1000, false, pageable)).thenReturn(perfumeList);
        perfumeService.findProductsByFilterParams(perfumers, new ArrayList<>(), Arrays.asList(1, 1000), false, pageable);
        assertEquals(2, perfumeList.getTotalElements());
        assertEquals(perfumeList.getContent().get(0).getProducer(), PERFUMER_CHANEL);
        verify(productRepository, times(1)).findProductsByFilterParams(perfumers, new ArrayList<>(), 1, 1000, false, pageable);
    }

    @Test
    public void findByPerfumerOrderByPriceDesc() {
        Product productChanel = new Product();
        productChanel.setProducer(PERFUMER_CHANEL);
        Product productCreed = new Product();
        productCreed.setProducer(PERFUMER_CREED);
        List<Product> productList = new ArrayList<>();
        productList.add(productChanel);
        productList.add(productCreed);

        when(productRepository.findByProducerOrderByPriceDesc(PERFUMER_CHANEL)).thenReturn(productList);
        perfumeService.findByProducer(PERFUMER_CHANEL);
        assertEquals(productList.get(0).getProducer(), PERFUMER_CHANEL);
        assertNotEquals(productList.get(0).getProducer(), PERFUMER_CREED);
        verify(productRepository, times(1)).findByProducerOrderByPriceDesc(PERFUMER_CHANEL);
    }

    @Test
    public void findByPerfumeGenderOrderByPriceDesc() {
        Product productChanel = new Product();
        productChanel.setProductGender(PERFUME_GENDER);
        List<Product> productList = new ArrayList<>();
        productList.add(productChanel);

        when(productRepository.findByProductGenderOrderByPriceDesc(PERFUME_GENDER)).thenReturn(productList);
        perfumeService.findByProductGender(PERFUME_GENDER);
        assertEquals(productList.get(0).getProductGender(), PERFUME_GENDER);
        assertNotEquals(productList.get(0).getProductGender(), "male");
        verify(productRepository, times(1)).findByProductGenderOrderByPriceDesc(PERFUME_GENDER);
    }

    @Test
    public void savePerfume() {
        MultipartFile multipartFile = new MockMultipartFile(FILE_NAME, FILE_NAME, "multipart/form-data", FILE_PATH.getBytes());
        Product product = new Product();
        product.setId(1L);
        product.setProducer(PERFUMER_CHANEL);
        product.setFilename(multipartFile.getOriginalFilename());

        when(productRepository.save(product)).thenReturn(product);
        perfumeService.saveProduct(product, multipartFile);
        verify(productRepository, times(1)).save(product);
    }
}
