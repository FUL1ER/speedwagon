package com.gmail.speedwagon.dto.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductSearchRequest {
    private List<String> products;
    private List<String> genders;
    private List<Integer> prices;
    private Boolean sortByPrice;
    private String producer;
    private String productGender;
}
