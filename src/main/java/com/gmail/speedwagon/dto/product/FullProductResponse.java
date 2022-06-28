package com.gmail.speedwagon.dto.product;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FullProductResponse extends ProductResponse {
    private Integer year;
    private String country;
    private String productGender;
    private String description;
    private String filename;
    private String volume;
    private String type;
    private MultipartFile file;
}
