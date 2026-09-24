package com.ecommerce.Electonika.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import com.ecommerce.Electonika.entity.Product;

import com.ecommerce.Electonika.service.ProductService;

@RestController 
public class ProductController {

    @Autowired 
    ProductService productService;

    @RequestMapping("/products")
    public List<Product> getProductDetails() {
        return productService.getProducts();
    }
}
