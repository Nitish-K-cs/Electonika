package com.ecommerce.Electonika.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.ecommerce.Electonika.entity.Product;
import com.ecommerce.Electonika.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;


@Service 
public class ProductService {

    @Autowired
    ProductRepo repo;
    
    // List<Product> products = new ArrayList<>(Arrays.asList(
    //         new Product(1, "Laptop", 1200.00),
    //         new Product(2, "Smartphone", 800.00),
    //         new Product(3, "Headphones", 150.00),
    //         new Product(4, "Smartwatch", 250.00),
    //         new Product(5, "Tablet", 400.00)));

    public List<Product> getProducts() {
        //return products;
        return repo.findAll();
    }

    public Product getProductById(int id) {
        // return products.stream()
        //         .filter(product -> product.getProdId() == id)
        //         .findFirst()
        //         .orElse(null);

        return repo.findById(id).orElse(null);
    }

    public void addProduct(Product product) {
        //products.add(product);
        repo.save(product);
    }

    public void updateProduct(Product updatedProduct) {
        // for (int i = 0; i < products.size(); i++) {
        //     if (products.get(i).getProdId() == updatedProduct.getProdId()) {
        //         products.set(i, updatedProduct);
        //         return;
        //     }
        // }

        repo.save(updatedProduct);
    }
}