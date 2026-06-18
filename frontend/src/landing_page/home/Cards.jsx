import { useEffect, useState } from "react";
import axios from "axios";
import "./Cards.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Cards() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="cards-section" id="products">
      <div className="container mt-5">
        <h2 className="section-title">Our Best Sellers</h2>

        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading Products...</h3>
        ) : (
          <div className="cards-grid">
            {products.map((item) => (
              <div
                className="product-card"
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                {/* IMAGE */}
                <img src={item.image} alt={item.name} />

                <div className="card-body">
                  <h3 className="mt-4">{item.name}</h3>

                  <p className="price">₹{item.price}</p>

                  <p className="description">
                    {item.description || "No description available"}
                  </p>

                  <button
                    disabled={item.status === "Out of Stock"}
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 IMPORTANT

                      addToCart({
                        id: item._id,
                        name: item.name,
                        price: Number(item.price),
                        img: item.image,
                      });

                      toast.success("Added to Cart 🛒");
                    }}
                  >
                    {item.status === "Out of Stock"
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Cards;
