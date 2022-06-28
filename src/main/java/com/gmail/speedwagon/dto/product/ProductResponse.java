package com.gmail.speedwagon.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private Long id;
    private String productTitle;
    private String producer;
    private Integer price;
    private Double productRating;
    private String filename;
    private Integer reviewsCount;
}
