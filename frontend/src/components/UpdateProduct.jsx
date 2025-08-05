import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  // Načtení produktu při načtení komponenty
  useEffect(() => {
    axios.get(`http://localhost:8081/api/products/${id}`)
      .then((res) => {
        const loadedProduct = res.data;
        
    const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // výsledek bude např. "2025-07-29"
    };

    setProduct({
    ...loadedProduct,
    price: loadedProduct.price.toString(),
    stockQuantity: loadedProduct.stockQuantity.toString(),
    releaseDate: formatDate(loadedProduct.releaseDate)
    });

      })
      .catch((err) => {
        console.error("Chyba při načítání produktu:", err);
        alert("Produkt nebyl nalezen");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob(
        [JSON.stringify({
          ...product,
          price: parseFloat(product.price),
          stockQuantity: parseInt(product.stockQuantity),
        })],
        { type: "application/json" }
      )
    );

    axios.put(`http://localhost:8081/api/products/${id}`, formData)
      .then((res) => {
        alert("Produkt byl úspěšně aktualizován");
        navigate("/"); // Přesměrování zpět na homepage
      })
      .catch((err) => {
        console.error("Chyba při aktualizaci produktu:", err);
        alert("Chyba při aktualizaci produktu");
      });
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form className="row g-3 pt-3" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            className="form-control"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="productAvailable"
              checked={product.productAvailable}
              onChange={(e) =>
                setProduct({ ...product, productAvailable: e.target.checked })
              }
            />
            <label className="form-check-label">Product Available</label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
