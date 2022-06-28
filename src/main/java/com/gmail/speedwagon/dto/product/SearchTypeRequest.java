package com.gmail.speedwagon.dto.product;

import com.gmail.speedwagon.enums.SearchProduct;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchProduct searchType;
    private String text;
}
