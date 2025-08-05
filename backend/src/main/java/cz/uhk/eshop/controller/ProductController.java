package cz.uhk.eshop.controller;

import cz.uhk.eshop.model.Product;
import cz.uhk.eshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public  class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = service.getProductById(id);
        if (product != null)
            return ResponseEntity.ok(product);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestPart Product product,@RequestPart MultipartFile imageFile) {
        try {
            Product prod = service.addProduct(product, imageFile);
            return new ResponseEntity<>(prod, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id,
                                           @RequestPart Product product,
                                           @RequestPart MultipartFile imageFile) {
        Product prod = null;
        try {
            prod = service.updateProduct(id, product, imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (prod == null)
            return new ResponseEntity<>("Product does not exist", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>("Product updated", HttpStatus.OK);

    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable int id) {
        service.deleteProductById(id);
    }
}