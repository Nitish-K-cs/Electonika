package com.ecommerce.Electonika.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import com.ecommerce.Electonika.entity.Product;

import com.ecommerce.Electonika.service.ProductService;
import org.springframework.web.bind.annotation.PostMapping;


@RestController 
public class ProductController {

    @Autowired 
    ProductService productService;

    @GetMapping("/products")
    public List<Product> getProductDetails() {
        return productService.getProducts();
    }

    //Default for request mapping is GET, so we can use @RequestMapping or @GetMapping
    @RequestMapping("/products/{id}")
    public Product getProductById(@PathVariable int id) {
        return productService.getProductById(id);
    }

    //@PostMapping("path")
    
    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @PutMapping("/products")
    public void updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
    }
}
