package cz.uhk.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cz.uhk.eshop.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
