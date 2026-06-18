import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // SEARCH
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/products/search?q=${value}`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // outside click search close
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // SAFE NAVIGATION (IMPORTANT FIX)
  const goTo = (path) => {
    setMenuOpen(false);

    // 🔥 CRITICAL: delay ensures state cleanup first
    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar custom-navbar py-3 px-lg-5 px-3">
        <div className="container-fluid">
          {/* ICONS */}
          <div className="d-flex align-items-center nav-icons">
            {/* SEARCH */}
            <div className="search-wrapper" ref={searchRef}>
              <i
                className="fa-solid fa-magnifying-glass"
                onClick={() => setShowSearch(!showSearch)}
              />

              {showSearch && (
                <div className="search-box-wrapper">
                  <input
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search products..."
                  />

                  <div className="search-results">
                    {results.map((p) => (
                      <div
                        key={p._id}
                        className="search-item"
                        onClick={() => {
                          setShowSearch(false);
                          navigate(`/product/${p._id}`);
                        }}
                      >
                        <img src={p.image} width="30" />
                        <span>{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <i
              className="fa-regular fa-user"
              onClick={() => {
                const token = localStorage.getItem("token");

                if (!token) {
                  toast.error("Please login first 🚨");
                  return navigate("/login");
                }

                navigate("/profile");
              }}
            />

            {/* CART */}
            <i
              className="fa-solid fa-bag-shopping"
              onClick={() => navigate("/cart")}
            />
          </div>

          {/* LOGO */}
          <h2 className="logo m-0" onClick={() => navigate("/")}>
            Khushboo-e-<span>Jannat</span>
          </h2>

          {/* HAMBURGER */}
          <button
            className="btn border-0 shadow-none menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* MENU (FIXED LAYER ORDER) */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
          {/* BACKDROP */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          />

          {/* PANEL */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "280px",
              height: "100%",
              background: "#fff",
              zIndex: 100000,
              padding: "20px",
            }}
          >
            <h4>Menu</h4>

            <ul className="list-unstyled">
              <li onClick={() => goTo("/orders")}>My Orders</li>
              <li onClick={() => goTo("/history")}>History</li>
              <li onClick={() => goTo("/about")}>About</li>
              <li onClick={() => goTo("/contact")}>Contact</li>
              <li onClick={() => goTo("/login")}>Login</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
