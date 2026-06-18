import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
if (!import.meta.env.VITE_API_URL) {
  console.warn("VITE_API_URL is missing");
}
const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  const [previewImage, setPreviewImage] = useState("");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
    status: "Available",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });

      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  // ADD OR UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Admin login required");
        return;
      }

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product Updated Successfully ✅");
      } else {
        await axios.post(`${API__URL}/api/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product Added Successfully ✅");
      }

      setForm({
        name: "",
        price: "",
        image: null,
        description: "",
        status: "Available",
      });

      setPreviewImage("");
      setEditingId(null);
      setShowForm(false);

      fetchProducts();
    } catch (error) {
      console.log("PRODUCT ERROR:", error.response?.data || error);
      alert(error.response?.data?.message || "Operation Failed ❌");
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      price: product.price,
      image: null,
      description: product.description,
      status: product.status,
    });

    setPreviewImage(product.image);
    setShowForm(true);
  };
  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted Successfully ✅");

      fetchProducts();
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error);
      alert(error.response?.data?.message || "Delete Failed ❌");
    }
  };

  return (
    <div>
      <h2 className="page-title">Products</h2>

      <button
        className="btn btn-gold mb-3"
        onClick={() => {
          setShowForm(!showForm);

          if (showForm) {
            setEditingId(null);

            setForm({
              name: "",
              price: "",
              image: "",
              description: "",
              status: "Available",
            });
          }
        }}
      >
        {showForm ? "Close Form" : "+ Add Product"}
      </button>

      {/* FORM */}
      {showForm && (
        <div className="card-box p-4 mb-4">
          <h4 className="mb-4">{editingId ? "Edit Product" : "Add Product"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>

              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Current Image</label>

              {previewImage && (
                <div>
                  <img
                    src={previewImage}
                    alt="Preview"
                    width="120"
                    height="120"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>

              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>

              <select
                name="status"
                className="form-control"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* PRODUCTS TABLE */}
      <div className="card-box">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      width="60"
                      height="60"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td>{p.name}</td>

                  <td>₹{p.price}</td>

                  <td>
                    <span
                      className={`badge ${
                        p.status === "Available" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td>{p.description}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(p)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
