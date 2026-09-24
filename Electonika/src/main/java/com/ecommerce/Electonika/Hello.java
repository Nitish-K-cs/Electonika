package com.ecommerce.Electonika;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class Hello {

    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello, welcome to Electonika!";
    }
}
