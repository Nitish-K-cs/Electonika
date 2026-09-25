package com.ecommerce.Electonika.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecommerce.Electonika.entity.Product;


@Repository 
public interface ProductRepo extends JpaRepository<Product, Integer> {

}
