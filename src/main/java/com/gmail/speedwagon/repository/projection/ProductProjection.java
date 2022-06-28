package com.gmail.speedwagon.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface ProductProjection {
    Long getId();
    String getProductTitle();
    String getProducer();
    Integer getPrice();
    String getFilename();
    Double getProductRating();
    
    @Value("#{target.reviews.size()}")
    Integer getReviewsCount();

    void setProducer(String producer);
    void setProductGender(String productGender);
    void setPrice(Integer price);
}
