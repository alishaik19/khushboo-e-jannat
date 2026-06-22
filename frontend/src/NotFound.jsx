import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <motion.div
        className="notfound-card"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="glow" />

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>The page you are looking for doesn’t exist or has been moved.</p>

        <div className="btns">
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
