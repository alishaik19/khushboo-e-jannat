import "./Checkout.css";
import { useCart } from "./context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  // ======================
  // FORM STATE
  // ======================
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [useSaved, setUseSaved] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  // ======================
  // LOAD SAVED ADDRESS (FIXED)
  // ======================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("address"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (saved) {
      setSavedAddress(saved);

      setFormData({
        fullName: saved.fullName || user?.name || "",
        phone: saved.phone || "",
        address: saved.fullAddress || "",
        city: saved.city || "",
        pincode: saved.pincode || "",
      });

      setUseSaved(true);
    }
  }, []);

  // ======================
  // HANDLE CHANGE
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // ======================
  // TOGGLE SAVED ADDRESS
  // ======================
  const handleUseSavedToggle = (checked) => {
    setUseSaved(checked);

    if (checked && savedAddress) {
      setFormData({
        fullName: savedAddress.fullName || "",
        phone: savedAddress.phone || "",
        address: savedAddress.fullAddress || "",
        city: savedAddress.city || "",
        pincode: savedAddress.pincode || "",
      });
    } else {
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
      });
    }
  };

  // ======================
  // VALIDATION
  // ======================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid phone number";
    }

    if (!formData.address || formData.address.trim().length < 10) {
      newErrors.address = "Enter full address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }

    if (cart.length === 0) {
      newErrors.cart = "Cart is empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================
  // TOTAL PRICE
  // ======================
  const totalPrice = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    return acc + price * (item.qty || 1);
  }, 0);

  // ======================
  // PAYMENT
  // ======================
  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      const { data: order } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { amount: totalPrice },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        order_id: order.id,

        handler: async (response) => {
          try {
            await axios.post(
              `${API_URL}/api/orders/save`,
              {
                items: cart,
                totalAmount: totalPrice,
                paymentId: response.razorpay_payment_id,
                shippingDetails: formData,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );

            // SAVE ADDRESS AUTO UPDATE
            localStorage.setItem(
              "address",
              JSON.stringify({
                fullName: formData.fullName,
                phone: formData.phone,
                city: formData.city,
                pincode: formData.pincode,
                fullAddress: formData.address,
              }),
            );

            clearCart();
            navigate("/orders");
          } catch (err) {
            console.error(err);
          }
        },

        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },

        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id}>
              {item.name} - {item.qty} × ₹{item.price}
            </div>
          ))}

          <h4>Total: ₹{totalPrice}</h4>
          {errors.cart && <p className="text-danger">{errors.cart}</p>}
        </div>

        {/* FORM */}
        <div className="checkout-form">
          {/* TOGGLE */}
          <label style={{ marginBottom: "10px", display: "block" }}>
            <input
              type="checkbox"
              checked={useSaved}
              onChange={(e) => handleUseSavedToggle(e.target.checked)}
            />{" "}
            Use saved address
          </label>

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          {errors.fullName && <p className="text-danger">{errors.fullName}</p>}

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          {errors.address && <p className="text-danger">{errors.address}</p>}

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
          {errors.city && <p className="text-danger">{errors.city}</p>}

          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
          />
          {errors.pincode && <p className="text-danger">{errors.pincode}</p>}

          <button onClick={handlePayment}>Pay & Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
