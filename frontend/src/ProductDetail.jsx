import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { toast } from "react-toastify";
import "./ProductDetail.css";
const API_URL = import.meta.env.VITE_API_URL;

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-card-detail">
        {/* IMAGE */}
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        {/* DETAILS */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <p className="product-price">₹{product.price}</p>

          <p className="product-desc">
            {product.description || "No description available"}
          </p>

          <div className="product-status">
            Status:{" "}
            <span
              className={
                product.status === "Available"
                  ? "status available"
                  : "status out"
              }
            >
              {product.status}
            </span>
          </div>

          <button
            className="add-cart-btn"
            disabled={product.status === "Out of Stock"}
            onClick={() => {
              addToCart({
                id: product._id,
                name: product.name,
                price: Number(product.price),
                img: product.image,
              });

              toast.success("Added to Cart 🛒");
            }}
          >
            {product.status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
