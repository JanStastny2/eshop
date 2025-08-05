import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    axios.delete(`http://localhost:8081/api/products/${product.id}`)
        .then(() => {
        alert("Produkt byl odstraněn");
        navigate("/"); // přesměrování na homepage
        })
        .catch((err) => {
        console.error("Chyba při mazání:", err);
        alert("Chyba při mazání produktu");
        });
    };

    useEffect(() => {
    axios.get(`http://localhost:8081/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Chyba při načítání produktu:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

    return (
    <div style={{ display: "flex", padding: "2rem", gap: "2rem" }}>
        {/* Obrázek vlevo */}
        <div style={{ flex: "1" }}>
        <img
            src={`data:${product.imageType};base64,${product.imageData}`}
            alt={product.name}
            style={{
            width: "100%",
            maxWidth: "500px",
            height: "100%",
            maxHeight: "600px", 
            objectFit: "contain", 
            borderRadius: "8px"
            }}
        />

        </div>

        <div style={{ flex: "1", color: "black" }}>
        <p style={{ color: "#aaa", textTransform: "uppercase" }}>{product.category}</p>
        <h1>{product.name}</h1>
        <h3 style={{ fontWeight: "normal" }}>{product.brand}</h3>
        <p>{product.description}</p>
        <h2>${product.price}</h2>

        <button style={{ padding: "0.5rem 1rem", margin: "1rem 0", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
            Add to cart
        </button>

        <p><strong>Stock Available:</strong> {product.stockQuantity}</p>
        <p><strong>Product listed on:</strong> {new Date(product.releaseDate).toLocaleDateString()}</p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Link to={`/product/${product.id}/update`}>
            <button
                style={{
                backgroundColor: "#007bff",
                color: "black",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px"
                }}
            >
                Update
            </button>
            </Link>

                <button
        onClick={handleDelete}
        style={{
            backgroundColor: "red",
            color: "black",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px"
        }}
        >
            Delete
        </button>
        </div>
        </div>
    </div>
    );

}

export default Product;