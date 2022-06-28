package com.gmail.speedwagon.dto.product;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProductRequest {

    private Long id;
    private String filename;

    @NotBlank(message = "Заповніть дане поле")
    @Length(max = 255)
    private String productTitle;

    @NotBlank(message = "Заповніть дане поле")
    @Length(max = 255)
    private String producer;

    @NotNull(message = "Заповніть дане поле")
    private Integer year;

    @NotBlank(message = "Заповніть дане поле")
    @Length(max = 255)
    private String country;

    @NotBlank(message = "Заповніть дане поле")
    @Length(max = 255)
    private String productGender;

    @NotNull(message = "Fill in the input field")
    private Integer price;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String volume;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;
}
