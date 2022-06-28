package com.gmail.speedwagon.mapper;

import com.gmail.speedwagon.domain.Product;
import com.gmail.speedwagon.dto.product.ProductRequest;
import com.gmail.speedwagon.dto.product.FullProductResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.speedwagon.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertToEntity() {
        ProductRequest productRequest = new ProductRequest();
        productRequest.setProducer(PERFUMER_CHANEL);
        productRequest.setProductTitle(PERFUME_TITLE);
        productRequest.setYear(YEAR);
        productRequest.setCountry(COUNTRY);
        productRequest.setProductGender(PERFUME_GENDER);
        productRequest.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        productRequest.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        productRequest.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        productRequest.setPrice(PRICE);
        productRequest.setVolume(VOLUME);
        productRequest.setType(TYPE);

        Product product = modelMapper.map(productRequest, Product.class);
        assertEquals(productRequest.getProducer(), product.getProducer());
        assertEquals(productRequest.getProductTitle(), product.getProductTitle());
        assertEquals(productRequest.getYear(), product.getYear());
        assertEquals(productRequest.getCountry(), product.getCountry());
        assertEquals(productRequest.getProductGender(), product.getProductGender());
        assertEquals(productRequest.getFragranceTopNotes(), product.getFragranceTopNotes());
        assertEquals(productRequest.getFragranceMiddleNotes(), product.getFragranceMiddleNotes());
        assertEquals(productRequest.getFragranceBaseNotes(), product.getFragranceBaseNotes());
        assertEquals(productRequest.getPrice(), product.getPrice());
        assertEquals(productRequest.getVolume(), product.getVolume());
        assertEquals(productRequest.getType(), product.getType());
    }

    @Test
    public void convertToResponseDto() {
        Product product = new Product();
        product.setId(1L);
        product.setProducer(PERFUMER_CHANEL);
        product.setProductTitle(PERFUME_TITLE);
        product.setYear(YEAR);
        product.setCountry(COUNTRY);
        product.setProductGender(PERFUME_GENDER);
        product.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        product.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        product.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        product.setPrice(PRICE);
        product.setVolume(VOLUME);
        product.setType(TYPE);

        FullProductResponse fullPerfumeResponse = modelMapper.map(product, FullProductResponse.class);
        assertEquals(product.getId(), fullPerfumeResponse.getId());
        assertEquals(product.getProducer(), fullPerfumeResponse.getProducer());
        assertEquals(product.getProductTitle(), fullPerfumeResponse.getProductTitle());
        assertEquals(product.getYear(), fullPerfumeResponse.getYear());
        assertEquals(product.getCountry(), fullPerfumeResponse.getCountry());
        assertEquals(product.getProductGender(), fullPerfumeResponse.getProductGender());
        assertEquals(product.getFragranceTopNotes(), fullPerfumeResponse.getFragranceTopNotes());
        assertEquals(product.getFragranceMiddleNotes(), fullPerfumeResponse.getFragranceMiddleNotes());
        assertEquals(product.getFragranceBaseNotes(), fullPerfumeResponse.getFragranceBaseNotes());
        assertEquals(product.getPrice(), fullPerfumeResponse.getPrice());
        assertEquals(product.getVolume(), fullPerfumeResponse.getVolume());
        assertEquals(product.getType(), fullPerfumeResponse.getType());
    }
}
