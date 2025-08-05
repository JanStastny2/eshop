import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/products")
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Chyba při načítání produktů:", err);
      });
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.map((p) => (
            <Link to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
            <img
              src={
                p.imageData
                  ? `data:${p.imageType};base64,${p.imageData}`
                  : "https://via.placeholder.com/200"
              }
              alt={p.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h4>{p.name}</h4>
            <p>{p.brand}</p>
            <strong>${p.price}</strong>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
