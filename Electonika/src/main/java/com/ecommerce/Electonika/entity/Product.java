package com.ecommerce.Electonika.entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Component 
@Entity
@Table(name = "product")
public class Product {

    @Id 
    @Column(name = "prod_id")
    private int prodId;

    @Column(name = "prod_name")
    private String prodName;
    
    @Column(name = "prod_price")
    private double prodPrice;

    @Column (name = "description")
    private String description;

    @Column (name = "brand")
    private String brand;

    @Column (name = "category")
    private String category;

    @Column (name = "release_date")
    private Date releaseDate;

    @Column (name = "quantity")
    private int quantity;

    public Product(int prodId, String prodName, double prodPrice, String description, String brand, String category, Date releaseDate, int quantity) {
        this.prodId = prodId;
        this.prodName = prodName;
        this.prodPrice = prodPrice;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.releaseDate = releaseDate;
        this.quantity = quantity;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}