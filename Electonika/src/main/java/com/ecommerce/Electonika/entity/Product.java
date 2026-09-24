package com.ecommerce.Electonika.entity;

import org.springframework.stereotype.Component;

@Component 
public class Product {
    private int prodId;
    private String prodName;
    private double prodPrice;

    public Product(int prodId, String prodName, double prodPrice) {
        this.prodId = prodId;
        this.prodName = prodName;
        this.prodPrice = prodPrice;
    }

    public Product() {
    }

    // Getters and setters
    public int getProdId() {
        return prodId;
    }

    public void setProdId(int prodId) {
        this.prodId = prodId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public double getProdPrice() {
        return prodPrice;
    }

    public void setProdPrice(double prodPrice) {
        this.prodPrice = prodPrice;
    }


}