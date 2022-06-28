package com.gmail.speedwagon.dto.order;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
public class OrderRequest {

    private Double totalPrice;
    private Map<Long, Long> productsId;

    @NotBlank(message = "Заповніть дане поле")
    private String firstName;

    @NotBlank(message = "Заповніть дане поле")
    private String lastName;

    @NotBlank(message = "Заповніть дане поле")
    private String city;

    @NotBlank(message = "Заповніть дане поле")
    private String address;

    @Email(message = "Недійсний email")
    @NotBlank(message = "Email не може бути пустим")
    private String email;

    @NotBlank(message = "Заповніть дане поле")
    private String phoneNumber;

    @NotNull(message = "Заповніть дане поле")
    @Min(value = 5, message = "Поштовий індекс не може бути меншим 5 символів")
    private Integer postIndex;
}
